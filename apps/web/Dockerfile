FROM node:22-slim AS base


FROM base AS pruner
WORKDIR /src

COPY . .
RUN npm install --global turbo@2.5.8 \
    && turbo prune --docker web


FROM base AS builder
WORKDIR /src

COPY --from=pruner /src/out/json/ .
RUN npm ci

COPY --from=pruner /src/out/full/ .
RUN npm run build


FROM base AS runner
WORKDIR /app

RUN addgroup --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /src/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /src/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /src/apps/web/public ./apps/web/public

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["apps/web/server.js"]
