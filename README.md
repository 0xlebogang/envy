# Envyper

A secure environment variable management solution that integrates directly into your development workflow.

## What is Envyper?

Envyper is a modern solution for managing environment variables and secrets across development projects. It provides:

- 🔐 Secure storage and management of environment variables
- 🌐 Web interface for easy variable management
- 📦 Project-based organization of variables
- 🔄 API for seamless integration

## Project Structure

This monorepo contains the following packages:

```text
apps/
  ├── api/        # REST API built with Hono
  └── web/        # Next.js frontend application
packages/
  ├── orm/        # Database operations & Prisma schema
  ├── zod/        # Type definitions & validation schemas
  ├── eslint-config/    # Shared ESLint configurations
  ├── typescript-config/ # Shared TypeScript configurations
  └── tailwind-config/  # Shared Tailwind CSS configurations
```

## Technology Stack

- Frontend: Next.js 15, React 19, NextUI
- Backend: Hono, Bun runtime
- Database: PostgreSQL with Prisma ORM
- Authentication: Clerk
- Build Tool: Turbo

## Getting Started

### Prerequisites

- Bun 1.1.40 or higher
- PostgreSQL database
- Node.js 18+ (for development tools)

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/PhantomLeii/envyper.git
cd envyper
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

- Configure your database connection and Clerk authentication keys

> You will need to configure your own instance of clerk to get your `CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`

4. Set up the database:

```bash
cd packages/orm
bun run migrate
```

> Envyper uses webhooks to sync user data from Clerk with the local database. You need to expose the API to the internet using tools like [ngrok](https://ngrok.com/) to proxy requests sent by the webhook to your locally running API. Have a look at their [docs](https://ngrok.com/docs) to get help on configuring ngrok for your instance.

5. Start the development servers:

```bash
bun run dev --filter "*"
```

The web interface will be available at `http://localhost:4000` The API will be available at `http://localhost:3000`

## Project Highlights

1. Architecture: Modern monorepo structure using Turborepo for efficient workspace management

2. Security:

- Clerk-based authentication
- Secure storage of sensitive data
- Type-safe API endpoints

3. Developer Experience:

- Hot module replacement
- Type safety across the stack
- Shared configurations
- Automated testing

4. Performance:

- Built with Bun runtime for faster execution
- Next.js App Router for optimal client-side performance
- Turbopack for faster builds

## Testing

Run tests across all packages:

```bash
turbo run test
```

## Contributing

1. Fork the repository
2. Create your feature branch:

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes:

```bash
git commit -m 'Add amazing feature
```

4. Push to the branch:

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request
