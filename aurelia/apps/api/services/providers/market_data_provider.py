"""
Provider abstraction for market data — same pattern as docs/ai-agent.md's
LLMProvider: services never import a vendor SDK directly, only this
interface. Phase 2 ships a MockMarketDataProvider (deterministic fixture
data, no network calls, no API key required) so the whole stack is
runnable and testable with zero external dependencies. A real provider
(e.g. a licensed market-data API) is swapped in later behind this same
interface — no service-layer code changes when that happens.
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class Quote:
    ticker: str
    price: float
    change_pct: float
    volume: int
    as_of: datetime


class MarketDataProvider(ABC):
    @abstractmethod
    async def get_quote(self, ticker: str) -> Quote | None: ...

    @abstractmethod
    async def get_quotes(self, tickers: list[str]) -> list[Quote]: ...