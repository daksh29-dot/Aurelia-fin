"""
Pytest fixtures — uses an in-memory SQLite DB for fast, isolated tests.
Postgres-specific behavior (UUID type, etc.) is exercised separately via
integration tests against the real docker-compose Postgres, per
docs/testing.md's unit vs integration split.
"""
import pytest_asyncio
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from core.database import Base


@pytest_asyncio.fixture
async def db_session():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    async with session_factory() as session:
        yield session

    await engine.dispose()