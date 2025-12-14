CREATE OR REPLACE PROCEDURE initiate_refund(
    IN p_order_id INTEGER,
    IN p_user_id INTEGER,
    IN p_refund_type VARCHAR(20),
    IN p_amount NUMERIC(10, 2),
    IN p_reason TEXT,
    OUT p_refund_id INTEGER,
    OUT p_refund_number VARCHAR(50),
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_payment RECORD;
    v_refund_amount NUMERIC(10, 2);
    v_existing_refund INTEGER;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT id, user_id, total_amount, status, payment_status
    INTO v_order
    FROM orders
    WHERE id = p_order_id
    FOR UPDATE;
    
    IF v_order IS NULL THEN
        p_error_message := 'Order not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_order.user_id != p_user_id THEN
        p_error_message := 'Unauthorized to request refund for this order';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_order.payment_status != 'SUCCESS' THEN
        p_error_message := 'Order payment was not successful. Cannot process refund.';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_order.status NOT IN ('DELIVERED', 'CANCELLED', 'RETURNED') THEN
        p_error_message := 'Refund can only be initiated for delivered, cancelled, or returned orders';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT id INTO v_existing_refund
    FROM refunds
    WHERE order_id = p_order_id AND status NOT IN ('REJECTED', 'FAILED');
    
    IF v_existing_refund IS NOT NULL THEN
        p_error_message := 'A refund request already exists for this order';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT id INTO v_payment
    FROM payments
    WHERE order_id = p_order_id AND status = 'SUCCESS'
    FOR UPDATE;
    
    IF v_payment IS NULL THEN
        p_error_message := 'No successful payment found for this order';
        COMMIT;
        RETURN;
    END IF;
    
    IF p_refund_type = 'FULL' THEN
        v_refund_amount := v_order.total_amount;
    ELSE
        IF p_amount IS NULL OR p_amount <= 0 THEN
            p_error_message := 'Please specify a valid refund amount';
            COMMIT;
            RETURN;
        END IF;
        IF p_amount > v_order.total_amount THEN
            p_error_message := 'Refund amount cannot exceed order total';
            COMMIT;
            RETURN;
        END IF;
        v_refund_amount := p_amount;
    END IF;
    
    p_refund_number := 'RF' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('refund_number_seq')::TEXT, 6, '0');
    
    INSERT INTO refunds (
        refund_number, order_id, payment_id, refund_type, amount,
        status, reason, created_at
    ) VALUES (
        p_refund_number, p_order_id, v_payment.id, p_refund_type::refund_type, v_refund_amount,
        'REQUESTED', p_reason, NOW()
    ) RETURNING id INTO p_refund_id;
    
    UPDATE orders
    SET status = 'REFUNDED',
        payment_status = 'REFUND_PENDING',
        updated_at = NOW()
    WHERE id = p_order_id;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to initiate refund: %', SQLERRM;
END;
$$;
