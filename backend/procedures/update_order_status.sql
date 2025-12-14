CREATE OR REPLACE PROCEDURE update_order_status(
    IN p_order_id INTEGER,
    IN p_new_status VARCHAR(30),
    IN p_notes TEXT,
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_order_item RECORD;
    v_valid_transitions JSONB := '{
        "PENDING": ["CONFIRMED", "CANCELLED"],
        "CONFIRMED": ["PROCESSING", "CANCELLED"],
        "PROCESSING": ["SHIPPED", "CANCELLED"],
        "SHIPPED": ["OUT_FOR_DELIVERY", "DELIVERED"],
        "OUT_FOR_DELIVERY": ["DELIVERED"],
        "DELIVERED": ["RETURNED"],
        "RETURNED": ["REFUNDED"],
        "CANCELLED": [],
        "REFUNDED": []
    }'::JSONB;
    v_allowed_next TEXT[];
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT id, status, payment_status
    INTO v_order
    FROM orders
    WHERE id = p_order_id
    FOR UPDATE;
    
    IF v_order IS NULL THEN
        p_error_message := 'Order not found';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT array_agg(value::TEXT) INTO v_allowed_next
    FROM jsonb_array_elements_text(v_valid_transitions -> v_order.status::TEXT);
    
    IF NOT (p_new_status = ANY(v_allowed_next)) THEN
        p_error_message := 'Invalid status transition from ' || v_order.status::TEXT || ' to ' || p_new_status;
        COMMIT;
        RETURN;
    END IF;
    
    UPDATE orders
    SET status = p_new_status::orders_status,
        updated_at = NOW(),
        notes = COALESCE(notes || E'\n', '') || COALESCE(p_notes, '')
    WHERE id = p_order_id;
    
    IF p_new_status = 'SHIPPED' THEN
        UPDATE orders SET shipped_at = NOW() WHERE id = p_order_id;
    ELSIF p_new_status = 'DELIVERED' THEN
        UPDATE orders SET delivered_at = NOW() WHERE id = p_order_id;
        
        FOR v_order_item IN
            SELECT product_id, quantity FROM order_items WHERE order_id = p_order_id
        LOOP
            UPDATE inventory
            SET quantity_available = quantity_available - v_order_item.quantity,
                quantity_reserved = GREATEST(0, quantity_reserved - v_order_item.quantity),
                updated_at = NOW()
            WHERE product_id = v_order_item.product_id;
        END LOOP;
    ELSIF p_new_status = 'CONFIRMED' THEN
        UPDATE orders SET estimated_delivery = NOW() + INTERVAL '5 days' WHERE id = p_order_id;
    END IF;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to update order status: %', SQLERRM;
END;
$$;
