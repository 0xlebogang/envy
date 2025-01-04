# `@envyper/api`

A TypeScript package for managing environment variables in Node.js applications with type safety and validation.

## Features

- Type-safe environment variable access
- Runtime validation of environment variables
- Support for nested configuration
- Default value handling
- Environment-specific configurations

## Installation

```bash
bun install
```

## Usage

```typescript
import { EnvConfig } from "@envyper/api";

const config = new EnvConfig({
  PORT: { type: "number", default: 3000 },
  DATABASE_URL: { type: "string", required: true },
});
```

## Documentation

For detailed documentation, please visit our [documentation site]().

## License

This project is licensed under the MIT License
