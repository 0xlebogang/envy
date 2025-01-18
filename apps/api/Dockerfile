FROM node:18-alpine AS base

RUN apk update && \
    apk add --no-cache libc6-compat && \
    corepack enable pnpm && \
    corepack prepare pnpm@9.15.2

FROM base AS prune

WORKDIR /app

RUN npm install -g turbo@2.3.3

COPY . .
RUN turbo prune @envyper/api --docker


FROM base AS build
WORKDIR /app

COPY --from=prune /app/out/json/ .
RUN pnpm install

COPY --from=prune /app/out/full/ .
RUN pnpx turbo migrate build


FROM oven/bun:1.1.40-alpine AS runner

ARG CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG DATABASE_URL

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist/ .

ENV CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY \
    CLERK_SECRET_KEY=$CLERK_SECRET_KEY \
    DATABASE_URL=$DATABASE_URL

EXPOSE 3000

CMD [ "bun", "index.js" ]
