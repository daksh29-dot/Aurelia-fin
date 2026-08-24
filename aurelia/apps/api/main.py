"""
AURELIA API — FastAPI application entrypoint.

Run locally: uvicorn main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import get_settings
from routes import health, markets

settings = get_settings()

app = FastAPI(
    title="AURELIA API",
    description="AI-native financial research terminal — backend service.",
    version="0.1.0",
    # Docs disabled outside development — internal API shape shouldn't be
    # publicly enumerable in production without an explicit decision to expose it.
    docs_url="/docs" if settings.environment == "development" else None,
    redoc_url="/redoc" if settings.environment == "development" else None,
)

# Explicit allowlist only — never allow_origins=["*"] combined with
# allow_credentials=True (that combination is a real CSRF-adjacent risk).
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(markets.router, prefix="/api", tags=["markets"])