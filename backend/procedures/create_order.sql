CREATE OR REPLACE PROCEDURE create_order(
    IN p_user_id INTEGER,
    IN p_address_id INTEGER,
    IN p_coupon_id INTEGER,
    IN p_notes TEXT,
    OUT p_order_id INTEGER,
    OUT p_order_number VARCHAR(50),
    OUT p_total_amount NUMERIC(10, 2),
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_cart_id INTEGER;
    v_cart_item RECORD;
    v_subtotal NUMERIC(10, 2) := 0;
    v_discount_amount NUMERIC(10, 2) := 0;
    v_delivery_fee NUMERIC(10, 2) := 40;
    v_platform_fee NUMERIC(10, 2) := 5;
    v_free_delivery_threshold NUMERIC(10, 2) := 499;
    v_available_stock INTEGER;
    v_coupon RECORD;
    v_address_snapshot TEXT;
    v_item_count INTEGER := 0;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT id INTO v_cart_id
    FROM carts
    WHERE user_id = p_user_id
    FOR UPDATE;
    
    IF v_cart_id IS NULL THEN
        p_error_message := 'Cart not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM addresses WHERE id = p_address_id AND user_id = p_user_id AND is_active = TRUE) THEN
        p_error_message := 'Invalid delivery address';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT json_build_object(
        'recipient_name', recipient_name,
        'phone', phone,
        'address_line1', address_line1,
        'address_line2', address_line2,
        'landmark', landmark,
        'city', city,
        'state', state,
        'pincode', pincode
    )::TEXT INTO v_address_snapshot
    FROM addresses WHERE id = p_address_id;
    
    FOR v_cart_item IN
        SELECT ci.id, ci.product_id, ci.quantity, 
               p.name, p.sku, p.selling_price, p.discount_percent, p.is_active,
               (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as image_url
        FROM cart_items ci
        JOIN products p ON p.id = ci.product_id
        WHERE ci.cart_id = v_cart_id
        FOR UPDATE OF ci
    LOOP
        v_item_count := v_item_count + 1;
        
        IF NOT v_cart_item.is_active THEN
            p_error_message := v_cart_item.name || ' is no longer available';
            COMMIT;
            RETURN;
        END IF;
        
        SELECT quantity_available - quantity_reserved INTO v_available_stock
        FROM inventory WHERE product_id = v_cart_item.product_id FOR UPDATE;
        
        IF v_available_stock IS NULL OR v_available_stock < v_cart_item.quantity THEN
            p_error_message := 'Insufficient stock for ' || v_cart_item.name;
            COMMIT;
            RETURN;
        END IF;
        
        v_subtotal := v_subtotal + (v_cart_item.selling_price * v_cart_item.quantity);
    END LOOP;
    
    IF v_item_count = 0 THEN
        p_error_message := 'Cart is empty';
        COMMIT;
        RETURN;
    END IF;
    
    IF p_coupon_id IS NOT NULL THEN
        SELECT id, discount_type, discount_value, max_discount_amount INTO v_coupon
        FROM coupons WHERE id = p_coupon_id AND is_active = TRUE FOR UPDATE;
        
        IF v_coupon IS NOT NULL THEN
            IF v_coupon.discount_type = 'PERCENTAGE' THEN
                v_discount_amount := (v_subtotal * v_coupon.discount_value / 100);
            ELSE
                v_discount_amount := v_coupon.discount_value;
            END IF;
            
            IF v_coupon.max_discount_amount IS NOT NULL AND v_discount_amount > v_coupon.max_discount_amount THEN
                v_discount_amount := v_coupon.max_discount_amount;
            END IF;
        END IF;
    END IF;
    
    IF v_subtotal >= v_free_delivery_threshold THEN
        v_delivery_fee := 0;
    END IF;
    
    p_total_amount := v_subtotal - v_discount_amount + v_delivery_fee + v_platform_fee;
    
    p_order_number := 'JK' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
    
    INSERT INTO orders (
        order_number, user_id, address_id, subtotal, discount_amount, coupon_id,
        delivery_fee, platform_fee, total_amount, status, payment_status,
        shipping_address_snapshot, notes, created_at
    ) VALUES (
        p_order_number, p_user_id, p_address_id, v_subtotal, v_discount_amount, p_coupon_id,
        v_delivery_fee, v_platform_fee, p_total_amount, 'PENDING', 'PENDING',
        v_address_snapshot, p_notes, NOW()
    ) RETURNING id INTO p_order_id;
    
    FOR v_cart_item IN
        SELECT ci.product_id, ci.quantity, 
               p.name, p.sku, p.selling_price, p.discount_percent,
               (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as image_url
        FROM cart_items ci
        JOIN products p ON p.id = ci.product_id
        WHERE ci.cart_id = v_cart_id
    LOOP
        INSERT INTO order_items (
            order_id, product_id, product_name, product_sku, product_image_url,
            quantity, unit_price, discount_percent, total_price, created_at
        ) VALUES (
            p_order_id, v_cart_item.product_id, v_cart_item.name, v_cart_item.sku, v_cart_item.image_url,
            v_cart_item.quantity, v_cart_item.selling_price, v_cart_item.discount_percent,
            v_cart_item.selling_price * v_cart_item.quantity, NOW()
        );
        
        UPDATE inventory
        SET quantity_reserved = quantity_reserved + v_cart_item.quantity,
            updated_at = NOW()
        WHERE product_id = v_cart_item.product_id;
    END LOOP;
    
    IF p_coupon_id IS NOT NULL AND v_coupon IS NOT NULL THEN
        INSERT INTO coupon_usage (coupon_id, user_id, order_id, discount_applied, used_at)
        VALUES (p_coupon_id, p_user_id, p_order_id, v_discount_amount, NOW());
        
        UPDATE coupons SET times_used = times_used + 1 WHERE id = p_coupon_id;
    END IF;
    
    DELETE FROM cart_items WHERE cart_id = v_cart_id;
    UPDATE carts SET updated_at = NOW() WHERE id = v_cart_id;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to create order: %', SQLERRM;
END;
$$;
