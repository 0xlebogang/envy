<div align='center'>

# Envy

</div>

<div align='center'>

[![codecov](https://codecov.io/github/0xlebogang/envy/graph/badge.svg?token=G8W1KIRQMD)](https://codecov.io/github/0xlebogang/envy)

</div>

A modern monorepo web application built with Next.js, TypeScript, and Turborepo.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- [mise](https://mise.jdx.dev/) - A development tool version manager
- [Git](https://git-scm.com/) - Version control system

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/0xlebogang/envy.git
cd envy
```

### 2. Install Tool Dependencies

This project uses `mise` to manage tool versions. Install the required tools:

```bash
mise install
```

This will install:
- Node.js 22.21.1
- pnpm 10.15.1

> You may already have the prerequisite tool installed on you system without the Mise tool. We recommend running `mise install` and using the version defined in this project's mise configuration anyway, to avoid tool setup complexities as mise simplifies most of this.

### 3. Install Project Dependencies

Install all project dependencies using pnpm:

> Have a look at [this](https://mise.jdx.dev/installing-mise.html#shells) to see how to configure mise to automatically add the tools it installed for the project to your PATH variable while within the project's directory.
>
> This will really make your life easier.

```bash
pnpm install

# or

mise x -- pnpm install
```

### 4. Start Development

Run the development server:

```bash
pnpm dev

# or

mise x -- pnpm dev
```

The application will be available at `http://localhost:3000`.

## 📦 Project Structure

This is a monorepo containing:

- **`apps/web`** - Main Next.js web application
- **`packages/ui`** - Shared UI components with shadcn/ui
- **`packages/typescript-config`** - Shared TypeScript configurations
- **`packages/biome-config`** - Shared Biome linting configurations
- **`packages/vitest-config`** - Shared Vitest testing configurations

## 🛠️ Available Scripts

### Root Level Scripts

Run these commands from the project root:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development servers for all apps |
| `pnpm build` | Build all apps and packages for production |
| `pnpm build:docker` | Build Docker images for all apps |
| `pnpm test` | Run tests across all packages |
| `pnpm lint` | Lint all code using Biome |
| `pnpm lint:fix` | Lint and automatically fix issues |

### Web App Scripts

Navigate to `apps/web` and run:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start Next.js development server with Turbopack |
| `pnpm build` | Build the Next.js app for production |
| `pnpm start` | Start the production server |
| `pnpm test` | Run tests once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm lint` | Lint the web app code |
| `pnpm lint:fix` | Lint and fix issues in the web app |

## 🧪 Testing

Run tests across the entire monorepo by running command from the root:

```bash
pnpm test

# or

mise x -- pnpm test
```

Run tests in watch mode for the web app:

```bash
cd apps/web
pnpm test:watch
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ by [Lebogang Phoshoko](https://github.com/0xlebogang)
