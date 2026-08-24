# Local infra

```bash
docker compose up -d          # start Postgres + Redis
cd ../../apps/api
alembic -c ../../infra/alembic.ini upgrade head   # apply migrations
python -m tests.seed_fixtures                      # optional: load sample companies
```

Credentials here are **local-dev only**, checked into this repo intentionally
— they only work against the container on your machine. Production secrets
are never stored in this repo (see docs/security.md).