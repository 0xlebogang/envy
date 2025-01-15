FROM node:18-alpine AS base

RUN apk update && apk add --no-cache libc6-compat && \
  corepack enable pnpm && \
  corepack prepare pnpm@9.15.2 && \
  npm i -g bun@1.1.40


FROM base AS prune
WORKDIR /app

RUN npm i -g turbo@2.3.3
COPY . .

RUN turbo prune @envyper/web --docker


FROM base AS build
WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN pnpm install

COPY --from=prune /app/out/full/ .
RUN pnpx turbo build

FROM nginx:alpine AS runner
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]