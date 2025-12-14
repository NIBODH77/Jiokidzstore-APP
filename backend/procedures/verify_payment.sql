CREATE OR REPLACE PROCEDURE verify_payment(
    IN p_order_id INTEGER,
    IN p_transaction_id VARCHAR(100),
    IN p_gateway_payment_id VARCHAR(100),
    IN p_gateway_signature VARCHAR(255),
    OUT p_success BOOLEAN,
    OUT p_payment_status VARCHAR(20),
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_payment RECORD;
    v_order RECORD;
BEGIN
    p_success := FALSE;
    p_payment_status := 'PENDING';
    p_error_message := NULL;
    
    SELECT p.id, p.order_id, p.status, p.transaction_id, p.attempts
    INTO v_payment
    FROM payments p
    WHERE p.order_id = p_order_id
    FOR UPDATE;
    
    IF v_payment IS NULL THEN
        p_error_message := 'Payment not found for this order';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_payment.transaction_id != p_transaction_id THEN
        p_error_message := 'Transaction ID mismatch';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_payment.status = 'SUCCESS' THEN
        p_payment_status := 'SUCCESS';
        p_success := TRUE;
        COMMIT;
        RETURN;
    END IF;
    
    UPDATE payments
    SET gateway_payment_id = p_gateway_payment_id,
        gateway_signature = p_gateway_signature,
        status = 'SUCCESS',
        completed_at = NOW(),
        updated_at = NOW()
    WHERE id = v_payment.id;
    
    UPDATE payment_attempts
    SET status = 'SUCCESS'
    WHERE payment_id = v_payment.id
      AND attempt_number = v_payment.attempts;
    
    UPDATE orders
    SET payment_status = 'SUCCESS',
        status = 'CONFIRMED',
        updated_at = NOW()
    WHERE id = p_order_id;
    
    p_payment_status := 'SUCCESS';
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to verify payment: %', SQLERRM;
END;
$$;
