CREATE OR REPLACE PROCEDURE freeze_order_pricing(
    IN p_order_id INTEGER,
    OUT p_success BOOLEAN,
    OUT p_frozen_subtotal NUMERIC(10, 2),
    OUT p_frozen_total NUMERIC(10, 2),
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_order_item RECORD;
    v_calculated_subtotal NUMERIC(10, 2) := 0;
    v_item_total NUMERIC(10, 2);
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT id, subtotal, discount_amount, delivery_fee, platform_fee, total_amount, status
    INTO v_order
    FROM orders
    WHERE id = p_order_id
    FOR UPDATE;
    
    IF v_order IS NULL THEN
        p_error_message := 'Order not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_order.status != 'PENDING' THEN
        p_frozen_subtotal := v_order.subtotal;
        p_frozen_total := v_order.total_amount;
        p_success := TRUE;
        COMMIT;
        RETURN;
    END IF;
    
    FOR v_order_item IN
        SELECT id, product_id, quantity, unit_price
        FROM order_items
        WHERE order_id = p_order_id
        FOR UPDATE
    LOOP
        v_item_total := v_order_item.unit_price * v_order_item.quantity;
        
        UPDATE order_items
        SET total_price = v_item_total
        WHERE id = v_order_item.id;
        
        v_calculated_subtotal := v_calculated_subtotal + v_item_total;
    END LOOP;
    
    p_frozen_subtotal := v_calculated_subtotal;
    p_frozen_total := v_calculated_subtotal - v_order.discount_amount + v_order.delivery_fee + v_order.platform_fee;
    
    UPDATE orders
    SET subtotal = p_frozen_subtotal,
        total_amount = p_frozen_total,
        updated_at = NOW()
    WHERE id = p_order_id;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to freeze order pricing: %', SQLERRM;
END;
$$;
