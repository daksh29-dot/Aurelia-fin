import pytest

from repositories.company_repository import CompanyRepository
from services.market_data_service import CompanyNotFoundError, MarketDataService
from services.providers.mock_market_data_provider import MockMarketDataProvider

pytestmark = pytest.mark.asyncio


async def test_get_company_snapshot_includes_quote(db_session):
    await CompanyRepository(db_session).create(
        "NVDA", "NVIDIA Corporation", "Semiconductors", "Semiconductors"
    )
    await db_session.commit()

    service = MarketDataService(db_session, MockMarketDataProvider())
    snapshot = await service.get_company_snapshot("NVDA")

    assert snapshot.ticker == "NVDA"
    assert snapshot.quote is not None
    assert snapshot.quote.price == 187.62


async def test_get_company_snapshot_unknown_ticker_raises(db_session):
    service = MarketDataService(db_session, MockMarketDataProvider())
    with pytest.raises(CompanyNotFoundError):
        await service.get_company_snapshot("NOTREAL")


async def test_list_movers_sorted_by_absolute_change(db_session):
    service = MarketDataService(db_session, MockMarketDataProvider())
    movers = await service.list_movers(["AMD", "NVDA", "AAPL"])

    changes: list[float] = [abs(m.change_pct) for m in movers]
    assert changes == sorted(changes, reverse=True)
    assert movers[0].ticker == "NVDA"  # largest |change_pct| in fixture data