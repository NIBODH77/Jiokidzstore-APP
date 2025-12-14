CREATE OR REPLACE PROCEDURE rollback_coupon(
    IN p_order_id INTEGER,
    OUT p_success BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_usage RECORD;
BEGIN
    p_success := FALSE;
    p_error_message := NULL;
    
    SELECT cu.id, cu.coupon_id, cu.discount_applied, cu.is_reversed
    INTO v_usage
    FROM coupon_usage cu
    WHERE cu.order_id = p_order_id
    FOR UPDATE;
    
    IF v_usage IS NULL THEN
        p_success := TRUE;
        COMMIT;
        RETURN;
    END IF;
    
    IF v_usage.is_reversed THEN
        p_error_message := 'Coupon usage already reversed';
        COMMIT;
        RETURN;
    END IF;
    
    UPDATE coupon_usage
    SET is_reversed = TRUE,
        reversed_at = NOW()
    WHERE id = v_usage.id;
    
    UPDATE coupons
    SET times_used = GREATEST(0, times_used - 1)
    WHERE id = v_usage.coupon_id;
    
    p_success := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to rollback coupon: %', SQLERRM;
END;
$$;
