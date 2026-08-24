"""
FastAPI dependency wiring — keeps routes thin per docs/architecture.md:
routes validate + delegate, they never construct services by hand inline.
"""
from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from services.market_data_service import MarketDataService
from services.providers.market_data_provider import MarketDataProvider
from services.providers.mock_market_data_provider import MockMarketDataProvider

# Phase 2 wires the mock provider. Swapping to a real provider later is a
# one-line change here — nothing in routes/services/repositories changes.
_provider: MarketDataProvider = MockMarketDataProvider()


def get_market_data_service(
    session: Annotated[AsyncSession, Depends(get_db)],
) -> MarketDataService:
    return MarketDataService(session, _provider)