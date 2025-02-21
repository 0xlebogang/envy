# Envyper

A secure environment variable management system built with Django and React.

## Overview

Envyper is a platform that allows teams to securely store, manage and share environment variables across projects.

### Features:

- 🔐 Secure encryption of sensitive values
- 👥 User authentication and access control
- 📂 Project-based organization
- 🔄 REST API for programmatic access
- ✨ Simple web interface

## Project Structure

```text
├── apps/
│   ├── server/       # Django backend
│   └── client/       # React frontend (coming soon)
├── packages/         # Shared packages
└── scripts/          # Development scripts
```

## Prerequisites

- Node.js 18+
- Python 3.9+
- PNPM & pip (Package Management)

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/PhantomLeii/envyper.git

cd envyper
```

2. Create and activate a virtual environment

```bash
python -m venv .venv

# Windows
.\venv\Scripts\activate

# Linux & MacOS
source .venv/bin/activate
```

3. Install dependencies

> This will install also dependencies for the django app in [`apps/server`](./apps/server/) as well.

```bash
pnpm install
```

4. Configure environment variables

> Be sure to have a readily running PostgreSQL. If you don't have one, you can use [Neon Serverless Postgres](https://neon.tech).

```bash
# Windows
copy apps\server\core\.env.example apps\server\core\.env

# Linux & MacOS
cp apps/server/core/.env.example apps/server/.env
```

5. Start the development servers

```bash
pnpm dev
```

Access the api at: [http://localhost:8000]
Access the frontend at [http://localhost:3000]

## API Documentation

See the [API Documentation](./apps/server/README.md#api-reference) for detailed endpoint information.

## Contributing

1. Fork the repository
2. Create a feature branch (`git switch -c feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Built with [Django](https://www.djangoproject.com/) & [React.js](https://react.dev)
- Uses [Django REST Framework](https://www.django-rest-framework.org/) & [Next.js](https://nextjs.org)
- Powered by [Turbo](https://turbo.build/)

---

<p align="center">Made with ❤️ by Lebogang Phoshoko</p>
