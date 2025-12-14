CREATE OR REPLACE PROCEDURE cancel_order(
    IN p_order_id INTEGER,
    IN p_user_id INTEGER,
    IN p_reason TEXT,
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_order_item RECORD;
    v_cancellable_statuses TEXT[] := ARRAY['PENDING', 'CONFIRMED', 'PROCESSING'];
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT id, user_id, status, coupon_id, payment_status
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
        p_error_message := 'Unauthorized to cancel this order';
        COMMIT;
        RETURN;
    END IF;
    
    IF NOT (v_order.status::TEXT = ANY(v_cancellable_statuses)) THEN
        p_error_message := 'Order cannot be cancelled in current status: ' || v_order.status::TEXT;
        COMMIT;
        RETURN;
    END IF;
    
    FOR v_order_item IN
        SELECT product_id, quantity
        FROM order_items
        WHERE order_id = p_order_id
    LOOP
        UPDATE inventory
        SET quantity_reserved = GREATEST(0, quantity_reserved - v_order_item.quantity),
            updated_at = NOW()
        WHERE product_id = v_order_item.product_id;
    END LOOP;
    
    IF v_order.coupon_id IS NOT NULL THEN
        UPDATE coupon_usage
        SET is_reversed = TRUE, reversed_at = NOW()
        WHERE order_id = p_order_id AND is_reversed = FALSE;
        
        UPDATE coupons
        SET times_used = GREATEST(0, times_used - 1)
        WHERE id = v_order.coupon_id;
    END IF;
    
    UPDATE orders
    SET status = 'CANCELLED',
        cancelled_at = NOW(),
        cancellation_reason = p_reason,
        updated_at = NOW()
    WHERE id = p_order_id;
    
    IF v_order.payment_status = 'SUCCESS' THEN
        UPDATE orders SET payment_status = 'REFUND_PENDING' WHERE id = p_order_id;
    END IF;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to cancel order: %', SQLERRM;
END;
$$;
