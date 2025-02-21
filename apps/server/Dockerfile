FROM node:18-alpine AS base

RUN apk update && apk add --no-cache libc6-compat

FROM base AS prune
WORKDIR /app

RUN npm i -g turbo@2.3.3

COPY . .
RUN npm i \
  && turbo prune @envyper/server --docker


FROM python:3.10.16-alpine3.20

ARG DEBUG
ARG DATABASE_URL
ARG SECRET_KEY
ARG ALLOWED_HOSTS
ARG CORS_ALLOWED_ORIGINS
ARG ENCRYPTION_KEY
ARG JWT_SIGNING_KEY

WORKDIR /app

COPY --from=prune /app/out/full/apps/server/ .

ENV DATABASE_URL=${DATABASE_URL}

RUN set -ex \
    && apk add --no-cache --virtual .build-deps postgresql-dev build-base \
    && python -m venv /env \
    && /env/bin/pip install --upgrade pip \
    && /env/bin/pip install --no-cache-dir -r requirements.txt \
    && runDeps="$(scanelf --needed --nobanner --recursive /env \
        | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
        | sort -u \
        | xargs -r apk info --installed \
        | sort -u)" \
    && apk add --virtual rundeps $runDeps \
    && apk del .build-deps \
    && /env/bin/python manage.py migrate


ENV VIRTUAL_ENV=/env
ENV PATH=/env/bin:$PATH

ENV DEBUG=${DEBUG}
ENV SECRET_KEY=${SECRET_KEY}
ENV ALLOWED_HOSTS=${ALLOWED_HOSTS}
ENV CORS_ALLOWED_ORIGINS=${CORS_ALLOWED_ORIGINS}
ENV ENCRYPTION_KEY=${ENCRYPTION_KEY}
ENV JWT_SIGNING_KEY=${JWT_SIGNING_KEY}

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "core.wsgi:application"]