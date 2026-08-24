import pytest

from repositories.company_repository import CompanyRepository

pytestmark = pytest.mark.asyncio


async def test_create_and_get_by_ticker(db_session):
    repo = CompanyRepository(db_session)
    await repo.create("NVDA", "NVIDIA Corporation", "Semiconductors", "Semiconductors")
    await db_session.commit()

    found = await repo.get_by_ticker("nvda")  # lowercase input should still match
    assert found is not None
    assert found.ticker == "NVDA"
    assert found.name == "NVIDIA Corporation"


async def test_get_by_ticker_not_found(db_session):
    repo = CompanyRepository(db_session)
    found = await repo.get_by_ticker("DOESNOTEXIST")
    assert found is None


async def test_search_matches_ticker_or_name(db_session):
    repo = CompanyRepository(db_session)
    await repo.create("NVDA", "NVIDIA Corporation", "Semiconductors", "Semiconductors")
    await repo.create("AMD", "Advanced Micro Devices", "Semiconductors", "Semiconductors")
    await db_session.commit()

    results = await repo.search("nvidia")
    assert len(results) == 1
    assert results[0].ticker == "NVDA"

    results = await repo.search("AM")
    tickers = {c.ticker for c in results}
    assert "AMD" in tickers