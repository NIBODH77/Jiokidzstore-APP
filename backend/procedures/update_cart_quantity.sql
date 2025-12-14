CREATE OR REPLACE PROCEDURE update_cart_quantity(
    IN p_user_id INTEGER,
    IN p_cart_item_id INTEGER,
    IN p_quantity INTEGER,
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_cart_id INTEGER;
    v_product_id INTEGER;
    v_available_stock INTEGER;
    v_max_qty_per_product INTEGER := 10;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT c.id, ci.product_id
    INTO v_cart_id, v_product_id
    FROM carts c
    JOIN cart_items ci ON ci.cart_id = c.id
    WHERE c.user_id = p_user_id AND ci.id = p_cart_item_id
    FOR UPDATE OF ci;
    
    IF v_cart_id IS NULL THEN
        p_error_message := 'Cart item not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF p_quantity = 0 THEN
        DELETE FROM cart_items WHERE id = p_cart_item_id;
        UPDATE carts SET updated_at = NOW() WHERE id = v_cart_id;
        p_success := TRUE;
        COMMIT;
        RETURN;
    END IF;
    
    IF p_quantity > v_max_qty_per_product THEN
        p_error_message := 'Maximum quantity limit is ' || v_max_qty_per_product;
        COMMIT;
        RETURN;
    END IF;
    
    SELECT quantity_available - quantity_reserved
    INTO v_available_stock
    FROM inventory
    WHERE product_id = v_product_id
    FOR UPDATE;
    
    IF v_available_stock IS NULL OR v_available_stock < p_quantity THEN
        p_error_message := 'Insufficient stock. Available: ' || COALESCE(v_available_stock, 0);
        COMMIT;
        RETURN;
    END IF;
    
    UPDATE cart_items
    SET quantity = p_quantity,
        updated_at = NOW()
    WHERE id = p_cart_item_id;
    
    UPDATE carts SET updated_at = NOW() WHERE id = v_cart_id;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to update cart: %', SQLERRM;
END;
$$;
