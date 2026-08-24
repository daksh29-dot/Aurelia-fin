"""
Deterministic mock provider — mirrors apps/web/lib/mock-data.ts so Phase 2's
backend and Phase 1's frontend agree on the same sample universe until a
real provider is wired in.
"""
from dataclasses import dataclass
from datetime import UTC, datetime

from services.providers.market_data_provider import MarketDataProvider, Quote


@dataclass(frozen=True)
class _FixtureRow:
    price: float
    change_pct: float
    volume: int


_FIXTURE: dict[str, _FixtureRow] = {
    "NVDA": _FixtureRow(187.62, 4.31, 312_400_000),
    "AMD": _FixtureRow(172.09, -1.18, 58_100_000),
    "MSFT": _FixtureRow(512.44, 0.62, 21_300_000),
    "AAPL": _FixtureRow(231.18, -0.24, 44_800_000),
    "GOOGL": _FixtureRow(198.77, 1.05, 27_600_000),
    "TSLA": _FixtureRow(268.30, -3.42, 91_200_000),
}


class MockMarketDataProvider(MarketDataProvider):
    async def get_quote(self, ticker: str) -> Quote | None:
        row = _FIXTURE.get(ticker.upper())
        if row is None:
            return None
        return Quote(
            ticker=ticker.upper(),
            price=row.price,
            change_pct=row.change_pct,
            volume=row.volume,
            as_of=datetime.now(UTC),
        )

    async def get_quotes(self, tickers: list[str]) -> list[Quote]:
        quotes = [await self.get_quote(t) for t in tickers]
        return [q for q in quotes if q is not None]