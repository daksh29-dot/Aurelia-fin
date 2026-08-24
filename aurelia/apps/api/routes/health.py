from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health() -> dict[str, str]:
    """Liveness/readiness probe — no DB/auth dependency, must always be fast."""
    return {"status": "ok"}