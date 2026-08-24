"""
Seeds the local dev database with the same company universe used by
apps/web/lib/mock-data.ts, so frontend and backend agree during Phase 2-3
development. Run with: python -m tests.seed_fixtures
"""
import asyncio

from core.database import session_scope
from models.company import Company
from models.security import Security

_COMPANIES = [
    ("NVDA", "NVIDIA Corporation", "Semiconductors", "Semiconductors"),
    ("AMD", "Advanced Micro Devices", "Semiconductors", "Semiconductors"),
    ("MSFT", "Microsoft Corporation", "Software", "Software—Infrastructure"),
    ("AAPL", "Apple Inc.", "Hardware", "Consumer Electronics"),
    ("GOOGL", "Alphabet Inc.", "Internet", "Internet Content & Information"),
    ("TSLA", "Tesla, Inc.", "Automotive", "Auto Manufacturers"),
]


async def seed() -> None:
    async with session_scope() as session:
        for ticker, name, sector, industry in _COMPANIES:
            company = Company(ticker=ticker, name=name, sector=sector, industry=industry)
            session.add(company)
            await session.flush()
            session.add(Security(company_id=company.id, exchange="NASDAQ", currency="USD"))
    print(f"Seeded {len(_COMPANIES)} companies.")


if __name__ == "__main__":
    asyncio.run(seed())