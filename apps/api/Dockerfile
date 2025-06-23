FROM python:3.13-slim AS base

ARG SECRET_KEY
ARG DATABASE_URL

# Variables used in all stages
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV SECRET_KEY=${SECRET_KEY}
ENV DATABASE_URL=${DATABASE_URL}

FROM base AS builder

RUN mkdir /app
WORKDIR /app
COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python3 manage.py collectstatic && \
    python3 manage.py migrate

FROM base

ARG ALLOWED_HOSTS

RUN useradd -m -r appuser && \
    mkdir -p /app && \
    chown -R appuser /app

# Pypi deps
COPY --from=builder /usr/local/lib/python3.13/site-packages/ /usr/local/lib/python3.13/site-packages/
# Django's static files
COPY --from=builder /app/staticfiles/ /app/staticfiles/
# Downloaded binaries
COPY --from=builder /usr/local/bin/ /usr/local/bin/

WORKDIR /app
COPY --chown=appuser:appuser . .

USER appuser

# Force debug to be off.
ENV DEBUG=0
ENV ALLOWED_HOSTS=${ALLOWED_HOSTS}

EXPOSE 8000

ENTRYPOINT ["gunicorn"]
CMD ["--workers", "3", "core.wsgi:application"]