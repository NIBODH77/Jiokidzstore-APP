CREATE OR REPLACE PROCEDURE restore_inventory(
    IN p_order_id INTEGER,
    OUT p_success BOOLEAN,
    OUT p_items_restored INTEGER,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_order_item RECORD;
BEGIN
    p_success := FALSE;
    p_items_restored := 0;
    p_error_message := NULL;
    
    SELECT id, status
    INTO v_order
    FROM orders
    WHERE id = p_order_id
    FOR UPDATE;
    
    IF v_order IS NULL THEN
        p_error_message := 'Order not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_order.status NOT IN ('CANCELLED', 'RETURNED', 'REFUNDED') THEN
        p_error_message := 'Inventory can only be restored for cancelled, returned, or refunded orders';
        COMMIT;
        RETURN;
    END IF;
    
    FOR v_order_item IN
        SELECT oi.product_id, oi.quantity
        FROM order_items oi
        WHERE oi.order_id = p_order_id
    LOOP
        UPDATE inventory
        SET quantity_available = quantity_available + v_order_item.quantity,
            updated_at = NOW()
        WHERE product_id = v_order_item.product_id;
        
        IF FOUND THEN
            p_items_restored := p_items_restored + 1;
        ELSE
            INSERT INTO inventory (product_id, quantity_available, quantity_reserved, updated_at)
            VALUES (v_order_item.product_id, v_order_item.quantity, 0, NOW());
            p_items_restored := p_items_restored + 1;
        END IF;
    END LOOP;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to restore inventory: %', SQLERRM;
END;
$$;
