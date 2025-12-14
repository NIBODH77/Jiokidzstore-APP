CREATE OR REPLACE PROCEDURE payment_webhook(
    IN p_event VARCHAR(50),
    IN p_order_id INTEGER,
    IN p_transaction_id VARCHAR(100),
    IN p_status VARCHAR(20),
    IN p_amount NUMERIC(10, 2),
    IN p_gateway_response TEXT,
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_payment RECORD;
    v_order RECORD;
    v_order_item RECORD;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT p.id, p.order_id, p.status AS payment_status, p.amount, p.attempts
    INTO v_payment
    FROM payments p
    WHERE p.order_id = p_order_id AND p.transaction_id = p_transaction_id
    FOR UPDATE;
    
    IF v_payment IS NULL THEN
        p_error_message := 'Payment record not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_payment.payment_status IN ('SUCCESS', 'REFUNDED') THEN
        p_success := TRUE;
        COMMIT;
        RETURN;
    END IF;
    
    SELECT id, status, coupon_id INTO v_order
    FROM orders WHERE id = p_order_id FOR UPDATE;
    
    IF p_status = 'SUCCESS' OR p_event = 'payment.captured' THEN
        UPDATE payments
        SET status = 'SUCCESS',
            completed_at = NOW(),
            updated_at = NOW()
        WHERE id = v_payment.id;
        
        UPDATE payment_attempts
        SET status = 'SUCCESS', gateway_response = p_gateway_response
        WHERE payment_id = v_payment.id AND attempt_number = v_payment.attempts;
        
        UPDATE orders
        SET payment_status = 'SUCCESS',
            status = 'CONFIRMED',
            updated_at = NOW()
        WHERE id = p_order_id;
        
    ELSIF p_status = 'FAILED' OR p_event = 'payment.failed' THEN
        UPDATE payments
        SET status = 'FAILED',
            failure_reason = p_gateway_response,
            updated_at = NOW()
        WHERE id = v_payment.id;
        
        UPDATE payment_attempts
        SET status = 'FAILED',
            failure_reason = p_gateway_response,
            gateway_response = p_gateway_response
        WHERE payment_id = v_payment.id AND attempt_number = v_payment.attempts;
        
        UPDATE orders
        SET payment_status = 'FAILED',
            updated_at = NOW()
        WHERE id = p_order_id;
        
        FOR v_order_item IN SELECT product_id, quantity FROM order_items WHERE order_id = p_order_id
        LOOP
            UPDATE inventory
            SET quantity_reserved = GREATEST(0, quantity_reserved - v_order_item.quantity),
                updated_at = NOW()
            WHERE product_id = v_order_item.product_id;
        END LOOP;
        
        IF v_order.coupon_id IS NOT NULL THEN
            UPDATE coupon_usage SET is_reversed = TRUE, reversed_at = NOW()
            WHERE order_id = p_order_id AND is_reversed = FALSE;
            
            UPDATE coupons SET times_used = GREATEST(0, times_used - 1)
            WHERE id = v_order.coupon_id;
        END IF;
    END IF;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Webhook processing failed: %', SQLERRM;
END;
$$;
