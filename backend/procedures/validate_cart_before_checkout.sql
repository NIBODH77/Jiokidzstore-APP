CREATE OR REPLACE PROCEDURE validate_cart_before_checkout(
    IN p_user_id INTEGER,
    OUT p_is_valid BOOLEAN,
    OUT p_errors TEXT[],
    OUT p_warnings TEXT[],
    OUT p_unavailable_items INTEGER[]
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_cart_id INTEGER;
    v_item RECORD;
    v_available_stock INTEGER;
    v_current_price NUMERIC(10, 2);
    v_item_count INTEGER := 0;
BEGIN
    p_is_valid := TRUE;
    p_errors := ARRAY[]::TEXT[];
    p_warnings := ARRAY[]::TEXT[];
    p_unavailable_items := ARRAY[]::INTEGER[];
    
    SELECT id INTO v_cart_id
    FROM carts
    WHERE user_id = p_user_id;
    
    IF v_cart_id IS NULL THEN
        p_is_valid := FALSE;
        p_errors := array_append(p_errors, 'Cart not found');
        COMMIT;
        RETURN;
    END IF;
    
    FOR v_item IN
        SELECT ci.id AS cart_item_id,
               ci.product_id,
               ci.quantity,
               ci.price_at_add,
               p.name AS product_name,
               p.selling_price,
               p.is_active,
               i.quantity_available,
               i.quantity_reserved
        FROM cart_items ci
        JOIN products p ON p.id = ci.product_id
        LEFT JOIN inventory i ON i.product_id = ci.product_id
        WHERE ci.cart_id = v_cart_id
        FOR UPDATE OF ci
    LOOP
        v_item_count := v_item_count + 1;
        
        IF NOT v_item.is_active THEN
            p_is_valid := FALSE;
            p_errors := array_append(p_errors, v_item.product_name || ' is no longer available');
            p_unavailable_items := array_append(p_unavailable_items, v_item.cart_item_id);
            CONTINUE;
        END IF;
        
        v_available_stock := COALESCE(v_item.quantity_available, 0) - COALESCE(v_item.quantity_reserved, 0);
        
        IF v_available_stock < v_item.quantity THEN
            IF v_available_stock <= 0 THEN
                p_is_valid := FALSE;
                p_errors := array_append(p_errors, v_item.product_name || ' is out of stock');
                p_unavailable_items := array_append(p_unavailable_items, v_item.cart_item_id);
            ELSE
                p_is_valid := FALSE;
                p_errors := array_append(p_errors, 
                    v_item.product_name || ' has only ' || v_available_stock || ' items available');
            END IF;
        END IF;
        
        IF v_item.selling_price != v_item.price_at_add THEN
            IF v_item.selling_price > v_item.price_at_add THEN
                p_warnings := array_append(p_warnings, 
                    'Price of ' || v_item.product_name || ' has increased to ₹' || v_item.selling_price);
            ELSE
                p_warnings := array_append(p_warnings, 
                    'Price of ' || v_item.product_name || ' has decreased to ₹' || v_item.selling_price);
            END IF;
            
            UPDATE cart_items
            SET price_at_add = v_item.selling_price,
                updated_at = NOW()
            WHERE id = v_item.cart_item_id;
        END IF;
    END LOOP;
    
    IF v_item_count = 0 THEN
        p_is_valid := FALSE;
        p_errors := array_append(p_errors, 'Cart is empty');
    END IF;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Cart validation failed: %', SQLERRM;
END;
$$;
