"""
Centralized, typed application configuration.

All settings are read from environment variables only — nothing is
hardcoded, and no secret ever has a default value that would work in
production (defaults below are for local dev only, matching infra/docker's
docker-compose.yml).
"""
from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # App
    environment: str = Field(default="development")
    debug: bool = Field(default=True)

    # Database
    database_url: str = Field(
        default="postgresql+asyncpg://aurelia:aurelia_dev_password@localhost:5432/aurelia",
        description="Async SQLAlchemy connection string for Postgres.",
    )

    # Redis
    redis_url: str = Field(default="redis://localhost:6379/0")

    # CORS — explicit allowlist only, never "*" with credentials
    cors_allow_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])

    # LLM provider keys — Phase 4 reads these; declared now so config is centralized
    # from the start. Never logged, never returned in any API response.
    openai_api_key: str | None = Field(default=None)
    anthropic_api_key: str | None = Field(default=None)


@lru_cache
def get_settings() -> Settings:
    """Cached singleton — settings are read from env once per process."""
    return Settings()