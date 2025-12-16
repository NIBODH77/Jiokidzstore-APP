from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, and_
from datetime import datetime, timezone
from typing import Optional
from app.models.refresh_token import RefreshToken

class RefreshTokenRepository:
    """Repository for JWT Refresh Token operations"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_refresh_token(
        self,
        user_id: int,
        token: str,
        expires_at: datetime
    ) -> RefreshToken:
        """Store a new refresh token"""
        refresh_token = RefreshToken(
            user_id=user_id,
            token=token,
            expires_at=expires_at,
            is_revoked=False
        )
        self.db.add(refresh_token)
        await self.db.commit()
        await self.db.refresh(refresh_token)
        return refresh_token

    async def get_by_token(self, token: str) -> Optional[RefreshToken]:
        """Get refresh token by token string"""
        stmt = select(RefreshToken).where(RefreshToken.token == token)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_active_token(self, token: str) -> Optional[RefreshToken]:
        """Get active (non-revoked, non-expired) refresh token"""
        stmt = select(RefreshToken).where(
            and_(
                RefreshToken.token == token,
                RefreshToken.is_revoked == False,
                RefreshToken.expires_at > datetime.now(timezone.utc)
            )
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def revoke_token(self, token: str) -> bool:
        """Revoke a refresh token (for logout)"""
        refresh_token = await self.get_by_token(token)
        if refresh_token and not refresh_token.is_revoked:
            refresh_token.is_revoked = True
            refresh_token.revoked_at = datetime.now(timezone.utc)
            await self.db.commit()
            return True
        return False

    async def revoke_all_user_tokens(self, user_id: int):
        """Revoke all refresh tokens for a user (logout from all devices)"""
        stmt = select(RefreshToken).where(
            and_(
                RefreshToken.user_id == user_id,
                RefreshToken.is_revoked == False
            )
        )
        result = await self.db.execute(stmt)
        tokens = result.scalars().all()

        for token in tokens:
            token.is_revoked = True
            token.revoked_at = datetime.now(timezone.utc)

        if tokens:
            await self.db.commit()

    async def cleanup_expired_tokens(self):
        """Delete expired refresh tokens (maintenance operation)"""
        stmt = delete(RefreshToken).where(
            RefreshToken.expires_at < datetime.now(timezone.utc)
        )
        await self.db.execute(stmt)
        await self.db.commit()

    async def is_token_valid(self, token: str) -> bool:
        """Check if a refresh token is valid"""
        refresh_token = await self.get_active_token(token)
        return refresh_token is not None
