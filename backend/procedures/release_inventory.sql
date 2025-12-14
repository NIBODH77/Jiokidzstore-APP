CREATE OR REPLACE PROCEDURE release_inventory(
    IN p_lock_id INTEGER,
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_lock RECORD;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT id, product_id, quantity_locked
    INTO v_lock
    FROM inventory_locks
    WHERE id = p_lock_id
    FOR UPDATE;
    
    IF v_lock IS NULL THEN
        p_error_message := 'Inventory lock not found';
        COMMIT;
        RETURN;
    END IF;
    
    UPDATE inventory
    SET quantity_reserved = GREATEST(0, quantity_reserved - v_lock.quantity_locked),
        updated_at = NOW()
    WHERE product_id = v_lock.product_id;
    
    DELETE FROM inventory_locks WHERE id = p_lock_id;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to release inventory: %', SQLERRM;
END;
$$;
