CREATE OR REPLACE PROCEDURE apply_coupon(
    IN p_user_id INTEGER,
    IN p_coupon_code VARCHAR(50),
    IN p_cart_value NUMERIC(10, 2),
    OUT p_coupon_id INTEGER,
    OUT p_discount_amount NUMERIC(10, 2),
    OUT p_final_amount NUMERIC(10, 2),
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_coupon RECORD;
    v_user_usage_count INTEGER;
BEGIN
    p_success := FALSE;
    p_discount_amount := 0;
    p_final_amount := p_cart_value;
    p_error_message := NULL;
    
    SELECT id, code, discount_type, discount_value, min_order_value, max_discount_amount,
           usage_limit_total, usage_limit_per_user, times_used, valid_from, valid_until, is_active
    INTO v_coupon
    FROM coupons
    WHERE UPPER(code) = UPPER(p_coupon_code)
    FOR UPDATE;
    
    IF v_coupon IS NULL THEN
        p_error_message := 'Invalid coupon code';
        COMMIT;
        RETURN;
    END IF;
    
    IF NOT v_coupon.is_active THEN
        p_error_message := 'This coupon is no longer active';
        COMMIT;
        RETURN;
    END IF;
    
    IF NOW() < v_coupon.valid_from THEN
        p_error_message := 'This coupon is not yet valid';
        COMMIT;
        RETURN;
    END IF;
    
    IF NOW() > v_coupon.valid_until THEN
        p_error_message := 'This coupon has expired';
        COMMIT;
        RETURN;
    END IF;
    
    IF p_cart_value < v_coupon.min_order_value THEN
        p_error_message := 'Minimum order value of ₹' || v_coupon.min_order_value || ' required';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_coupon.usage_limit_total IS NOT NULL AND v_coupon.times_used >= v_coupon.usage_limit_total THEN
        p_error_message := 'This coupon has reached its usage limit';
        COMMIT;
        RETURN;
    END IF;
    
    SELECT COUNT(*) INTO v_user_usage_count
    FROM coupon_usage
    WHERE coupon_id = v_coupon.id
      AND user_id = p_user_id
      AND is_reversed = FALSE;
    
    IF v_user_usage_count >= v_coupon.usage_limit_per_user THEN
        p_error_message := 'You have already used this coupon the maximum number of times';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_coupon.discount_type = 'PERCENTAGE' THEN
        p_discount_amount := (p_cart_value * v_coupon.discount_value / 100);
    ELSE
        p_discount_amount := v_coupon.discount_value;
    END IF;
    
    IF v_coupon.max_discount_amount IS NOT NULL AND p_discount_amount > v_coupon.max_discount_amount THEN
        p_discount_amount := v_coupon.max_discount_amount;
    END IF;
    
    IF p_discount_amount > p_cart_value THEN
        p_discount_amount := p_cart_value;
    END IF;
    
    p_final_amount := p_cart_value - p_discount_amount;
    p_coupon_id := v_coupon.id;
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to apply coupon: %', SQLERRM;
END;
$$;
