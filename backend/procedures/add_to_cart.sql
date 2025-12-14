CREATE OR REPLACE PROCEDURE add_to_cart(
    IN p_user_id INTEGER,
    IN p_product_id INTEGER,
    IN p_quantity INTEGER,
    OUT p_cart_item_id INTEGER,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_cart_id INTEGER;
    v_existing_item_id INTEGER;
    v_existing_quantity INTEGER;
    v_available_stock INTEGER;
    v_selling_price NUMERIC(10, 2);
    v_product_active BOOLEAN;
    v_max_qty_per_product INTEGER := 10;
BEGIN
    p_error_message := NULL;
    
    SELECT id, selling_price, is_active
    INTO v_cart_id, v_selling_price, v_product_active
    FROM products
    WHERE id = p_product_id
    FOR UPDATE;
    
    IF v_cart_id IS NULL THEN
        p_error_message := 'Product not found';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT selling_price, is_active
    INTO v_selling_price, v_product_active
    FROM products
    WHERE id = p_product_id;
    
    IF NOT v_product_active THEN
        p_error_message := 'Product is not available';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT quantity_available - quantity_reserved
    INTO v_available_stock
    FROM inventory
    WHERE product_id = p_product_id
    FOR UPDATE;
    
    IF v_available_stock IS NULL OR v_available_stock < p_quantity THEN
        p_error_message := 'Insufficient stock available';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT id INTO v_cart_id
    FROM carts
    WHERE user_id = p_user_id
    FOR UPDATE;
    
    IF v_cart_id IS NULL THEN
        INSERT INTO carts (user_id, created_at)
        VALUES (p_user_id, NOW())
        RETURNING id INTO v_cart_id;
    END IF;
    
    SELECT id, quantity
    INTO v_existing_item_id, v_existing_quantity
    FROM cart_items
    WHERE cart_id = v_cart_id AND product_id = p_product_id
    FOR UPDATE;
    
    IF v_existing_item_id IS NOT NULL THEN
        IF v_existing_quantity + p_quantity > v_max_qty_per_product THEN
            p_error_message := 'Maximum quantity limit reached for this product';
            COMMIT;
            RETURN;
        END IF;
        
        IF v_existing_quantity + p_quantity > v_available_stock THEN
            p_error_message := 'Insufficient stock for requested quantity';
            COMMIT;
            RETURN;
        END IF;
        
        UPDATE cart_items
        SET quantity = quantity + p_quantity,
            updated_at = NOW()
        WHERE id = v_existing_item_id;
        
        p_cart_item_id := v_existing_item_id;
    ELSE
        INSERT INTO cart_items (cart_id, product_id, quantity, price_at_add, created_at)
        VALUES (v_cart_id, p_product_id, p_quantity, v_selling_price, NOW())
        RETURNING id INTO p_cart_item_id;
    END IF;
    
    UPDATE carts SET updated_at = NOW() WHERE id = v_cart_id;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to add to cart: %', SQLERRM;
END;
$$;
