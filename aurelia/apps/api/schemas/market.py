"""
Pydantic response models for market/company data. These are the FastAPI
response_model types — using real typed models here (rather than raw dicts)
means FastAPI validates every response automatically and generates accurate
OpenAPI docs, and it's the Python-side equivalent of the workspace-schema
validation principle in docs/workspace-schema.md: nothing leaves the API
without a checked shape.
"""
from pydantic import BaseModel


class QuoteResponse(BaseModel):
    price: float
    change_pct: float
    volume: int
    as_of: str


class CompanySnapshotResponse(BaseModel):
    ticker: str
    name: str
    sector: str | None
    industry: str | None
    quote: QuoteResponse | None


class MoverResponse(BaseModel):
    ticker: str
    price: float
    change_pct: float
    volume: int


class MoversListResponse(BaseModel):
    movers: list[MoverResponse]


class CompanySearchResult(BaseModel):
    ticker: str
    name: str
    sector: str | None


class SearchResponse(BaseModel):
    results: list[CompanySearchResult]