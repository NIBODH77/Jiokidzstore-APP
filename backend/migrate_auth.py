"""
Quick migration script to update authentication tables
Run this script to upgrade your database for new auth system
"""
import asyncio
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import text
from app.core.database import engine

async def run_migration():
    """Run database migrations for authentication system"""

    print("🔄 Starting authentication database migration...")

    async with engine.begin() as conn:
        # Update userrole enum
        print("🔧 Updating userrole enum...")
        try:
            # Rename old enum
            await conn.execute(text("ALTER TYPE userrole RENAME TO userrole_old"))

            # Create new enum with updated values
            await conn.execute(text("CREATE TYPE userrole AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN')"))

            # Update users table - convert old roles to new
            await conn.execute(text("""
                ALTER TABLE users
                ALTER COLUMN role TYPE userrole
                USING (CASE
                    WHEN role::text IN ('admin', 'ADMIN') THEN 'ADMIN'::userrole
                    WHEN role::text IN ('seller', 'SELLER') THEN 'SELLER'::userrole
                    ELSE 'CUSTOMER'::userrole
                END)
            """))

            # Drop old enum
            await conn.execute(text("DROP TYPE userrole_old"))
            print("✅ User roles updated to CUSTOMER, SELLER, ADMIN")
        except Exception as e:
            print(f"⚠️  Enum update skipped (may already be updated): {e}")

        # Drop and recreate otp_verifications table
        print("📋 Dropping old otp_verifications table...")
        await conn.execute(text("DROP TABLE IF EXISTS otp_verifications CASCADE"))

        print("✨ Creating new otp_verifications table...")
        await conn.execute(text("""
            CREATE TABLE otp_verifications (
                id SERIAL PRIMARY KEY,
                phone VARCHAR(15) NOT NULL,
                otp VARCHAR(6) NOT NULL,
                expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
                retry_count INTEGER NOT NULL DEFAULT 0,
                is_used BOOLEAN NOT NULL DEFAULT false,
                is_verified BOOLEAN NOT NULL DEFAULT false,
                last_attempt_at TIMESTAMP WITH TIME ZONE,
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE
            )
        """))

        print("🔍 Creating indexes on otp_verifications...")
        await conn.execute(text("CREATE INDEX ix_otp_verifications_id ON otp_verifications(id)"))
        await conn.execute(text("CREATE INDEX ix_otp_verifications_phone ON otp_verifications(phone)"))

        # Create refresh_tokens table
        print("✨ Creating refresh_tokens table...")
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS refresh_tokens (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                token VARCHAR(500) NOT NULL UNIQUE,
                expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
                is_revoked BOOLEAN NOT NULL DEFAULT false,
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                revoked_at TIMESTAMP WITH TIME ZONE
            )
        """))

        print("🔍 Creating indexes on refresh_tokens...")
        await conn.execute(text("CREATE INDEX IF NOT EXISTS ix_refresh_tokens_id ON refresh_tokens(id)"))
        await conn.execute(text("CREATE INDEX IF NOT EXISTS ix_refresh_tokens_user_id ON refresh_tokens(user_id)"))
        await conn.execute(text("CREATE INDEX IF NOT EXISTS ix_refresh_tokens_token ON refresh_tokens(token)"))

        print("✅ Migration completed successfully!")
        print("\n📊 Tables created/updated:")
        print("   - users (roles updated to CUSTOMER/SELLER/ADMIN)")
        print("   - otp_verifications (with retry_count, is_used, last_attempt_at)")
        print("   - refresh_tokens (for JWT token management)")
        print("\n🚀 You can now start the server!")

if __name__ == "__main__":
    try:
        asyncio.run(run_migration())
    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        sys.exit(1)
