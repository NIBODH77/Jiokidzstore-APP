CREATE OR REPLACE PROCEDURE decrease_inventory(
    IN p_product_id INTEGER,
    IN p_quantity INTEGER,
    IN p_order_id INTEGER,
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_available INTEGER;
    v_reserved INTEGER;
    v_lock_id INTEGER;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT quantity_available, quantity_reserved
    INTO v_available, v_reserved
    FROM inventory
    WHERE product_id = p_product_id
    FOR UPDATE;
    
    IF v_available IS NULL THEN
        p_error_message := 'Product inventory not found';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT id INTO v_lock_id
    FROM inventory_locks
    WHERE product_id = p_product_id
      AND order_id = p_order_id
      AND quantity_locked = p_quantity
    LIMIT 1
    FOR UPDATE;
    
    IF v_lock_id IS NOT NULL THEN
        UPDATE inventory
        SET quantity_available = quantity_available - p_quantity,
            quantity_reserved = GREATEST(0, quantity_reserved - p_quantity),
            updated_at = NOW()
        WHERE product_id = p_product_id;
        
        DELETE FROM inventory_locks WHERE id = v_lock_id;
    ELSE
        IF v_available < p_quantity THEN
            p_error_message := 'Insufficient stock to decrease. Available: ' || v_available;
            COMMIT;
            RETURN;
        END IF;
        
        UPDATE inventory
        SET quantity_available = quantity_available - p_quantity,
            updated_at = NOW()
        WHERE product_id = p_product_id;
    END IF;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to decrease inventory: %', SQLERRM;
END;
$$;
