import uuid
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.market_snapshot import MarketSnapshot
from models.security import Security


class MarketRepository:
    """All DB access for securities and market snapshots."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_security_for_company(self, company_id: uuid.UUID) -> Security | None:
        stmt = select(Security).where(Security.company_id == company_id)
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_latest_snapshot(self, security_id: uuid.UUID) -> MarketSnapshot | None:
        stmt = (
            select(MarketSnapshot)
            .where(MarketSnapshot.security_id == security_id)
            .order_by(MarketSnapshot.as_of.desc())
            .limit(1)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def record_snapshot(
        self, security_id: uuid.UUID, price: float, change_pct: float, volume: int, as_of: datetime
    ) -> MarketSnapshot:
        snapshot = MarketSnapshot(
            security_id=security_id, price=price, change_pct=change_pct, volume=volume, as_of=as_of
        )
        self.session.add(snapshot)
        await self.session.flush()
        return snapshot