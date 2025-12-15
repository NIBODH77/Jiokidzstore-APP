from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import Tuple, Optional
from decimal import Decimal
from app.repositories.payment_repository import RefundRepository
from app.schemas.refund import RefundResponse

class RefundService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.refund_repo = RefundRepository(db)

    async def initiate_refund(
        self,
        order_id: int,
        user_id: int,
        refund_type: str,
        amount: Optional[Decimal],
        reason: str
    ) -> Tuple[bool, str, Optional[dict]]:
        result = await self.db.execute(
            text("""
                SELECT * FROM initiate_refund(
                    :order_id, :user_id, :refund_type, :amount, :reason,
                    NULL::INTEGER, NULL::VARCHAR, NULL::BOOLEAN, NULL::TEXT
                )
            """),
            {
                "order_id": order_id,
                "user_id": user_id,
                "refund_type": refund_type,
                "amount": amount,
                "reason": reason
            }
        )
        row = result.fetchone()

        if row and row[2]:
            await self.db.commit()
            return True, "Refund initiated successfully", {
                "refund_id": row[0],
                "refund_number": row[1]
            }

        error_msg = row[3] if row else "Failed to initiate refund"
        return False, error_msg, None

    async def get_refund(self, order_id: int) -> Optional[RefundResponse]:
        refund = await self.refund_repo.get_by_order_id(order_id)
        if not refund:
            return None

        return RefundResponse(
            id=refund.id,
            refund_number=refund.refund_number,
            order_id=refund.order_id,
            refund_type=refund.refund_type,
            amount=refund.amount,
            status=refund.status,
            reason=refund.reason,
            gateway_refund_id=refund.gateway_refund_id,
            processed_at=refund.processed_at,
            completed_at=refund.completed_at,
            created_at=refund.created_at
        )
