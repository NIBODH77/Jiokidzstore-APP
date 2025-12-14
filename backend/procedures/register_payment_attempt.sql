CREATE OR REPLACE PROCEDURE register_payment_attempt(
    IN p_order_id INTEGER,
    IN p_payment_method VARCHAR(20),
    IN p_amount NUMERIC(10, 2),
    OUT p_payment_id INTEGER,
    OUT p_transaction_id VARCHAR(100),
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_existing_payment RECORD;
    v_attempt_number INTEGER;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT id, total_amount, status, payment_status
    INTO v_order
    FROM orders
    WHERE id = p_order_id
    FOR UPDATE;
    
    IF v_order IS NULL THEN
        p_error_message := 'Order not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_order.status = 'CANCELLED' THEN
        p_error_message := 'Cannot process payment for cancelled order';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_order.payment_status = 'SUCCESS' THEN
        p_error_message := 'Order is already paid';
        COMMIT;
        RETURN;
    END IF;
    
    IF ABS(v_order.total_amount - p_amount) > 0.01 THEN
        p_error_message := 'Payment amount mismatch. Expected: ' || v_order.total_amount;
        COMMIT;
        RETURN;
    END IF;
    
    SELECT id, attempts INTO v_existing_payment
    FROM payments
    WHERE order_id = p_order_id
    FOR UPDATE;
    
    p_transaction_id := 'TXN' || TO_CHAR(NOW(), 'YYYYMMDDHH24MISS') || LPAD(p_order_id::TEXT, 6, '0');
    
    IF v_existing_payment IS NOT NULL THEN
        v_attempt_number := v_existing_payment.attempts + 1;
        
        UPDATE payments
        SET payment_method = p_payment_method::payment_method,
            status = 'INITIATED',
            transaction_id = p_transaction_id,
            attempts = v_attempt_number,
            last_attempt_at = NOW(),
            updated_at = NOW()
        WHERE id = v_existing_payment.id
        RETURNING id INTO p_payment_id;
    ELSE
        v_attempt_number := 1;
        
        INSERT INTO payments (
            order_id, payment_method, amount, currency, status,
            transaction_id, attempts, last_attempt_at, created_at
        ) VALUES (
            p_order_id, p_payment_method::payment_method, p_amount, 'INR', 'INITIATED',
            p_transaction_id, v_attempt_number, NOW(), NOW()
        ) RETURNING id INTO p_payment_id;
    END IF;
    
    INSERT INTO payment_attempts (
        payment_id, attempt_number, payment_method, status, created_at
    ) VALUES (
        p_payment_id, v_attempt_number, p_payment_method::payment_method, 'INITIATED', NOW()
    );
    
    UPDATE orders SET payment_status = 'PROCESSING', updated_at = NOW() WHERE id = p_order_id;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to register payment attempt: %', SQLERRM;
END;
$$;
