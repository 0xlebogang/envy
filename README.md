<div align="center">

# Envy

A secrets management tool that works right in your favourite IDE.

</div>

> :warning: This project still under active development and will experience breaking changes and have bugs quite often. Apologies in advance. You can help with development by also submitting an [issue](https://github.com/0xlebogang/envy/issues).

## Development Setup

### Prerequisites

- Golang (v1.25.8)
- Golangci-Lint (latest stable version)
- Node.js (v20.9+)
- Bun (v1.3.11)
- Git (latest stable version)
- Docker & Docker compose (latest stable versions)

### Running the project

1. Clone the repository

	```bash
	git clone https://github.com/0xlebogang/envy.git
	```

	```bash
	cd envy
	```

2. Create your Go workspace. You can create and copy of the `go.work.example` file and name it `go.work`

	 ```bash
	cp go.work.example go.work
	```

3. Install dependencies

	```bash
	bun install
	```

	> This will also run `go mod tidy` in the backend app's root to install all dependencies

4. Create all environment variable files and populate the necessary values

	>    You can use the [helper script](./scripts/setup-env-files.ts) which will create copies of all `.env.example` files and name the copies `.env`

	```bash
	chmod +x ./scripts/setup-env-files.ts
	```

	```bash
	./scripts/setup-env-files.ts
	```

5. Populate the necessary values of all generated `.env` files

6. Run external services

	```bash
	docker compose -f docker-compose.dev.yml up -d
	```

7. Run database migrations

	```bash
	bunx turbo db:migrate
	```

8. Run all development servers

	```bash
	bun run dev
	```

9. Access the running applications:

	| Name     | Location                                         |
	|----------|--------------------------------------------------|
	| Frontend | [https://localhost:3000](https://localhost:3000) |
	| Backend  | [https://localhost:8080](https://localhost:8080) |


## License

This project uses the [AGPL-3.0-only](./LICENSE) license.

---

<div align="center">
	<small>Built by <a href="https://lebophoshoko.dedyn.io">Lebogang Phoshoko</a></small>
</div>
