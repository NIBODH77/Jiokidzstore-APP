CREATE OR REPLACE PROCEDURE lock_inventory(
    IN p_product_id INTEGER,
    IN p_quantity INTEGER,
    IN p_order_id INTEGER,
    IN p_lock_type VARCHAR(20),
    IN p_lock_duration_minutes INTEGER,
    OUT p_lock_id INTEGER,
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_available_stock INTEGER;
    v_expires_at TIMESTAMP WITH TIME ZONE;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    v_expires_at := NOW() + (p_lock_duration_minutes || ' minutes')::INTERVAL;
    
    SELECT quantity_available - quantity_reserved
    INTO v_available_stock
    FROM inventory
    WHERE product_id = p_product_id
    FOR UPDATE;
    
    IF v_available_stock IS NULL THEN
        p_error_message := 'Product inventory not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_available_stock < p_quantity THEN
        p_error_message := 'Insufficient stock. Available: ' || v_available_stock;
        COMMIT;
        RETURN;
    END IF;
    
    UPDATE inventory
    SET quantity_reserved = quantity_reserved + p_quantity,
        updated_at = NOW()
    WHERE product_id = p_product_id;
    
    INSERT INTO inventory_locks (product_id, order_id, quantity_locked, lock_type, expires_at, created_at)
    VALUES (p_product_id, p_order_id, p_quantity, p_lock_type, v_expires_at, NOW())
    RETURNING id INTO p_lock_id;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to lock inventory: %', SQLERRM;
END;
$$;
