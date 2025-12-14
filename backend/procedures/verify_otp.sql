CREATE OR REPLACE PROCEDURE verify_otp(
    IN p_phone VARCHAR(15),
    IN p_otp_code VARCHAR(6),
    OUT p_is_valid BOOLEAN,
    OUT p_user_id INTEGER,
    OUT p_is_new_user BOOLEAN,
    OUT p_error_message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_otp_record RECORD;
    v_max_attempts INTEGER := 5;
BEGIN
    p_is_valid := FALSE;
    p_is_new_user := FALSE;
    p_error_message := NULL;
    
    SELECT id, otp_code, attempts, expires_at
    INTO v_otp_record
    FROM otp_verifications
    WHERE phone = p_phone
      AND is_verified = FALSE
    ORDER BY created_at DESC
    LIMIT 1
    FOR UPDATE;
    
    IF v_otp_record IS NULL THEN
        p_error_message := 'No OTP found. Please request a new OTP.';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_otp_record.attempts >= v_max_attempts THEN
        p_error_message := 'Maximum attempts exceeded. Please request a new OTP.';
        COMMIT;
        RETURN;
    END IF;
    
    IF v_otp_record.expires_at < NOW() THEN
        p_error_message := 'OTP has expired. Please request a new OTP.';
        COMMIT;
        RETURN;
    END IF;
    
    UPDATE otp_verifications
    SET attempts = attempts + 1
    WHERE id = v_otp_record.id;
    
    IF v_otp_record.otp_code != p_otp_code THEN
        p_error_message := 'Invalid OTP. Please try again.';
        COMMIT;
        RETURN;
    END IF;
    
    UPDATE otp_verifications
    SET is_verified = TRUE
    WHERE id = v_otp_record.id;
    
    SELECT id INTO p_user_id
    FROM users
    WHERE phone = p_phone
    FOR UPDATE;
    
    IF p_user_id IS NULL THEN
        INSERT INTO users (phone, is_active, is_verified, created_at)
        VALUES (p_phone, TRUE, TRUE, NOW())
        RETURNING id INTO p_user_id;
        
        INSERT INTO carts (user_id, created_at)
        VALUES (p_user_id, NOW());
        
        p_is_new_user := TRUE;
    ELSE
        UPDATE users
        SET is_verified = TRUE,
            updated_at = NOW()
        WHERE id = p_user_id;
    END IF;
    
    p_is_valid := TRUE;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'OTP verification failed: %', SQLERRM;
END;
$$;
