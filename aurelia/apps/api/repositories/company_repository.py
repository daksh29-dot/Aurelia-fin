import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.company import Company


class CompanyRepository:
    """All DB access for companies goes through here — services never
    issue raw queries directly."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_ticker(self, ticker: str) -> Company | None:
        stmt = select(Company).where(Company.ticker == ticker.upper())
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_id(self, company_id: uuid.UUID) -> Company | None:
        return await self.session.get(Company, company_id)

    async def search(self, query: str, limit: int = 10) -> list[Company]:
        stmt = (
            select(Company)
            .where(Company.ticker.ilike(f"%{query}%") | Company.name.ilike(f"%{query}%"))
            .limit(limit)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def list_all(self, limit: int = 100) -> list[Company]:
        stmt = select(Company).limit(limit)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def create(self, ticker: str, name: str, sector: str | None, industry: str | None) -> Company:
        company = Company(ticker=ticker.upper(), name=name, sector=sector, industry=industry)
        self.session.add(company)
        await self.session.flush()
        return company