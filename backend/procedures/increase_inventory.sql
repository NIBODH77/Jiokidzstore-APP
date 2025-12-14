CREATE OR REPLACE PROCEDURE increase_inventory(
    IN p_product_id INTEGER,
    IN p_quantity INTEGER,
    IN p_reason VARCHAR(100),
    OUT p_success BOOLEAN,
    OUT p_new_quantity INTEGER,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_inventory_id INTEGER;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT id INTO v_inventory_id
    FROM inventory
    WHERE product_id = p_product_id
    FOR UPDATE;
    
    IF v_inventory_id IS NULL THEN
        INSERT INTO inventory (product_id, quantity_available, quantity_reserved, updated_at)
        VALUES (p_product_id, p_quantity, 0, NOW())
        RETURNING quantity_available INTO p_new_quantity;
    ELSE
        UPDATE inventory
        SET quantity_available = quantity_available + p_quantity,
            updated_at = NOW()
        WHERE product_id = p_product_id
        RETURNING quantity_available INTO p_new_quantity;
    END IF;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to increase inventory: %', SQLERRM;
END;
$$;
