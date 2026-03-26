## Project Overview

Envy is a secrets management tool that works inside your IDE. It's a monorepo with two main applications:

- **Frontend:** Next.js (TypeScript) in `apps/frontend`
- **Backend:** Go (Gin + GORM) in `apps/backend`

Both apps share a Turborepo pipeline and are managed via Bun as the package manager.

## Build/Lint/Test Commands

### Monorepo (Turbo)
All commands are run from the repository root.

- `bun run dev` – Start all apps in dev mode (parallel)
- `bun run build` – Build all apps (respects dependencies)
- `bun run test` – Run all tests (respects dependencies)
- `bun run lint` – Lint all apps (biome for frontend, golangci-lint for backend)
- `bun run lint:fix` – Auto‑fix lint issues across all apps
- `bun run start` – Start all apps in production mode (requires prior build)

**Turbo filtering:** To run a command for a single app, use `--filter`:
- `turbo test --filter=frontend`
- `turbo lint --filter=backend`

### Frontend (Next.js / TypeScript)
- **Dev:** `cd apps/frontend && bun run dev`
- **Build:** `cd apps/frontend && bun run build`
- **Test:** `cd apps/frontend && bun test`
  - Single test file: `bun test path/to/file.test.ts`
  - Single test case: `bun test --test-name-pattern="regex" path/to/file.test.ts`
- **Lint:** `cd apps/frontend && biome check`
  - Single file: `biome check src/path/to/file.ts`
- **Lint fix:** `cd apps/frontend && biome check --fix --unsafe`
- **Format:** biome formats on save; manual: `biome format --write src/`

### Backend (Go)
- **Dev:** `cd apps/backend && air` (hot reload via `.air.toml`)
- **Build:** `cd apps/backend && go build -o build/main ./cmd/main`
- **Test:** `cd apps/backend && go test -v ./...`
  - Single test: `go test -v ./path/to/package -run TestName`
  - Single test file: `go test -v ./path/to/package -run . -count=1`
- **Lint:** `cd apps/backend && golangci-lint run && go vet ./...`
- **Lint fix:** `cd apps/backend && golangci-lint run --fix`
- **Format:** `gofmt -w .` (standard Go formatting)
- **DB migrations:** `cd apps/backend && go run ./cmd/migrations`

### Environment Setup
1. Copy `go.work.example` → `go.work`
2. Run `bun install` (installs Node deps and runs `go mod tidy` in backend)
3. Create `.env` files: `./scripts/setup-env-files.ts`
4. Populate the generated `.env` files with required values (see `.env.example`)
5. Start Docker services: `docker compose -f docker-compose.dev.yml up -d`
6. Run migrations: `bunx turbo db:migrate`

## Code Style Guidelines

### TypeScript / React (Frontend)
- **Formatter:** biome with tabs (`indentStyle: "tab"`), double quotes.
- **Linter:** biome recommended rules; organize imports automatically.
- **Types:** Strict TypeScript (`strict: true` in tsconfig). Prefer explicit types for exports.
- **Naming:**
  - Components: `PascalCase` (e.g., `Button.tsx`)
  - Variables/functions: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - CSS classes: kebab‑case (Tailwind convention)
- **Imports:** Grouped and sorted by biome: external packages, then internal modules.
- **Error Handling:** Use try/catch for async operations; surface errors to UI where appropriate.
- **React Patterns:** Functional components, hooks, Tailwind CSS, shadcn/ui components.
- **Testing:** Use `bun test`; test files `*.test.ts` / `*.test.tsx`. Use descriptive test names.

### Go (Backend)
- **Formatter:** `gofmt` (tabs, standard Go style).
- **Linter:** golangci‑lint with default config; also `go vet`.
- **Naming:**
  - Exported: `PascalCase`
  - Unexported: `camelCase`
  - Packages: short, lowercase, single‑word.
- **Imports:** Grouped: stdlib, third‑party, internal; sorted alphabetically.
- **Error Handling:** Return errors; wrap with context (`fmt.Errorf("...: %w", err)`). Avoid panic.
- **Testing:** Standard `testing` package with `testify/assert`. Table‑driven tests encouraged.
- **Project Structure:** Follow `cmd/`, `internal/`, `pkg/` conventions.

### Pre‑commit Hooks
The repository uses pre-commit hooks (`.pre-commit-config.yaml`) that run automatically:
- `check-added-large-files`, `end-of-file-fixer`, `trailing-whitespace`
- `biome-check` for frontend files
- `golangci-lint` and `golangci-lint-fmt` for Go files

### General
- Use `.editorconfig` (tab indent, LF line endings, UTF‑8).
- Keep commits small and focused; run `bun run lint` before committing.
- Use conventional commit messages (optional but encouraged).
- Never commit `.env` files or other secrets.

## Project Structure
```
envy/
├── apps/
│   ├── backend/          # Go backend
│   │   ├── cmd/          # Entry points (main, migrations)
│   │   ├── internal/     # Private application code
│   │   ├── test/         # Integration tests
│   │   └── go.mod
│   └── frontend/         # Next.js frontend
│       ├── src/
│       │   ├── app/      # Next.js App Router
│       │   ├── components/
│       │   └── lib/
│       └── package.json
├── scripts/              # Utility scripts
├── turbo.json            # Monorepo pipeline config
└── go.work               # Go workspace
```

## Common Pitfalls
- **Go workspace:** Ensure `go.work` exists and includes both backend and any other Go modules.
- **Environment variables:** Missing `.env` files will cause runtime errors. Run the setup script.
- **Docker services:** Backend depends on PostgreSQL; start via `docker compose` before running migrations.
- **Biome vs. golangci-lint:** Frontend uses biome, backend uses golangci-lint. Do not mix configs.
- **TypeScript strict mode:** Avoid `any`; prefer explicit types.

## Development Workflow
1. Start services: `docker compose -f docker-compose.dev.yml up -d`
2. Run migrations: `bunx turbo db:migrate`
3. Start dev servers: `bun run dev`
4. Make changes; lint with `bun run lint` before committing.
5. Run tests: `bun run test` (or per‑app as needed).

### Debugging
- **Frontend:** Use browser dev tools; Next.js error overlay in development.
- **Backend:** Use `log.Printf` or a structured logger; `air` reloads on save.

## When to Ask for Help
If a coding task is ambiguous or you're unsure about project conventions, refer to this document first. For further questions, ask the user directly.
