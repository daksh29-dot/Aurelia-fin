"""
Deterministic market-data business logic. Per docs/architecture.md's AI
pipeline, this is the layer that produces FACTs and CALCULATIONs — no LLM
calls happen here. apps/api/agents (Phase 4) will call into this service,
never the provider directly.
"""

from sqlalchemy.ext.asyncio import AsyncSession

from repositories.company_repository import CompanyRepository
from repositories.market_repository import MarketRepository
from schemas.market import (
    CompanySearchResult,
    CompanySnapshotResponse,
    MoverResponse,
    QuoteResponse,
)
from services.providers.market_data_provider import MarketDataProvider


class CompanyNotFoundError(Exception):
    pass


class MarketDataService:
    def __init__(self, session: AsyncSession, provider: MarketDataProvider):
        self.companies = CompanyRepository(session)
        self.market = MarketRepository(session)
        self.provider = provider

    async def get_company_snapshot(self, ticker: str) -> CompanySnapshotResponse:
        """FACT-only company + latest quote lookup. Raises CompanyNotFoundError
        if the ticker isn't in our company universe (a distinct case from the
        provider having no quote — kept separate so callers can tell "unknown
        company" from "no live price data yet")."""
        company = await self.companies.get_by_ticker(ticker)
        if company is None:
            raise CompanyNotFoundError(f"No company found for ticker '{ticker}'")

        quote = await self.provider.get_quote(ticker)

        return CompanySnapshotResponse(
            ticker=company.ticker,
            name=company.name,
            sector=company.sector,
            industry=company.industry,
            quote=(
                QuoteResponse(
                    price=quote.price,
                    change_pct=quote.change_pct,
                    volume=quote.volume,
                    as_of=quote.as_of.isoformat(),
                )
                if quote
                else None
            ),
        )

    async def list_movers(self, tickers: list[str]) -> list[MoverResponse]:
        quotes = await self.provider.get_quotes(tickers)
        return [
            MoverResponse(ticker=q.ticker, price=q.price, change_pct=q.change_pct, volume=q.volume)
            for q in sorted(quotes, key=lambda q: abs(q.change_pct), reverse=True)
        ]

    async def search_companies(self, query: str) -> list[CompanySearchResult]:
        companies = await self.companies.search(query)
        return [
            CompanySearchResult(ticker=c.ticker, name=c.name, sector=c.sector) for c in companies
        ]