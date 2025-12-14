CREATE OR REPLACE PROCEDURE send_otp(
    IN p_phone VARCHAR(15),
    IN p_otp_code VARCHAR(6),
    IN p_expires_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_existing_id INTEGER;
BEGIN
    SELECT id INTO v_existing_id
    FROM otp_verifications
    WHERE phone = p_phone
      AND is_verified = FALSE
      AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
    FOR UPDATE;
    
    IF v_existing_id IS NOT NULL THEN
        UPDATE otp_verifications
        SET otp_code = p_otp_code,
            expires_at = p_expires_at,
            attempts = 0,
            created_at = NOW()
        WHERE id = v_existing_id;
    ELSE
        INSERT INTO otp_verifications (phone, otp_code, expires_at, is_verified, attempts, created_at)
        VALUES (p_phone, p_otp_code, p_expires_at, FALSE, 0, NOW());
    END IF;
    
    COMMIT;
    
EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE EXCEPTION 'Failed to send OTP: %', SQLERRM;
END;
$$;
