"""add enhanced auth models

Revision ID: add_enhanced_auth
Revises: ecda26d4773c
Create Date: 2025-12-15 21:20:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'add_enhanced_auth'
down_revision: Union[str, None] = 'ecda26d4773c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Update users table - modify role enum
    op.execute("ALTER TYPE userrole RENAME TO userrole_old")
    op.execute("CREATE TYPE userrole AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN')")
    op.execute("""
        ALTER TABLE users
        ALTER COLUMN role TYPE userrole
        USING (CASE
            WHEN role::text IN ('admin', 'ADMIN') THEN 'ADMIN'::userrole
            WHEN role::text IN ('seller', 'SELLER') THEN 'SELLER'::userrole
            ELSE 'CUSTOMER'::userrole
        END)
    """)
    op.execute("DROP TYPE userrole_old")

    # Drop old otp_verifications table if exists (from old schema)
    op.execute("DROP TABLE IF EXISTS otp_verifications CASCADE")

    # Create new otp_verifications table with all security fields
    op.create_table(
        'otp_verifications',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('phone', sa.String(length=15), nullable=False),
        sa.Column('otp', sa.String(length=6), nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('retry_count', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('is_used', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('is_verified', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('last_attempt_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_otp_verifications_id', 'otp_verifications', ['id'], unique=False)
    op.create_index('ix_otp_verifications_phone', 'otp_verifications', ['phone'], unique=False)

    # Create refresh_tokens table
    op.create_table(
        'refresh_tokens',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('token', sa.String(length=500), nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('is_revoked', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('revoked_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_refresh_tokens_id', 'refresh_tokens', ['id'], unique=False)
    op.create_index('ix_refresh_tokens_user_id', 'refresh_tokens', ['user_id'], unique=False)
    op.create_index('ix_refresh_tokens_token', 'refresh_tokens', ['token'], unique=True)


def downgrade() -> None:
    # Drop new tables
    op.drop_index('ix_refresh_tokens_token', table_name='refresh_tokens')
    op.drop_index('ix_refresh_tokens_user_id', table_name='refresh_tokens')
    op.drop_index('ix_refresh_tokens_id', table_name='refresh_tokens')
    op.drop_table('refresh_tokens')

    op.drop_index('ix_otp_verifications_phone', table_name='otp_verifications')
    op.drop_index('ix_otp_verifications_id', table_name='otp_verifications')
    op.drop_table('otp_verifications')

    # Revert user role enum (optional - requires data migration)
    op.execute("ALTER TYPE userrole RENAME TO userrole_new")
    op.execute("CREATE TYPE userrole AS ENUM ('MOM', 'DAD', 'GUARDIAN', 'EXPECTING', 'TRYING_TO_CONCEIVE', 'admin', 'seller', 'customer')")
    op.execute("""
        ALTER TABLE users
        ALTER COLUMN role TYPE userrole
        USING 'customer'::userrole
    """)
    op.execute("DROP TYPE userrole_new")
