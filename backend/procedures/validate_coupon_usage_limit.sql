CREATE OR REPLACE PROCEDURE validate_coupon_usage_limit(
    IN p_coupon_id INTEGER,
    IN p_user_id INTEGER,
    OUT p_is_valid BOOLEAN,
    OUT p_remaining_global INTEGER,
    OUT p_remaining_user INTEGER,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_coupon RECORD;
    v_user_usage_count INTEGER;
BEGIN
    p_is_valid := FALSE;
    p_error_message := NULL;
    
    SELECT usage_limit_total, usage_limit_per_user, times_used, is_active, valid_until
    INTO v_coupon
    FROM coupons
    WHERE id = p_coupon_id
    FOR UPDATE;
    
    IF v_coupon IS NULL THEN
        p_error_message := 'Coupon not found';
        COMMIT;
        RETURN;
    END IF;
    
    IF NOT v_coupon.is_active THEN
        p_error_message := 'Coupon is not active';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_coupon.valid_until < NOW() THEN
        p_error_message := 'Coupon has expired';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_coupon.usage_limit_total IS NOT NULL THEN
        p_remaining_global := v_coupon.usage_limit_total - v_coupon.times_used;
        IF p_remaining_global <= 0 THEN
            p_error_message := 'Coupon has reached total usage limit';
            COMMIT;
            RETURN;
        END IF;
    ELSE
        p_remaining_global := -1;
    END IF;
    
    SELECT COUNT(*) INTO v_user_usage_count
    FROM coupon_usage
    WHERE coupon_id = p_coupon_id
      AND user_id = p_user_id
      AND is_reversed = FALSE;
    
    p_remaining_user := v_coupon.usage_limit_per_user - v_user_usage_count;
    
    IF p_remaining_user <= 0 THEN
        p_error_message := 'You have reached the usage limit for this coupon';
        COMMIT;
        RETURN;
    END IF;
    
    p_is_valid := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to validate coupon usage: %', SQLERRM;
END;
$$;
