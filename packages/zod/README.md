# `@envyper/zod`

Schema validation for environment variables using [Zod](https://github.com/colinhacks/zod).

## Installation

```bash
bun install
```

## Usage

```typescript
import { z } from "@envyper/zod";

// Define your environment schema
const envSchema = z.object({
  PORT: z.number().min(1000).max(65535),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

// Validate environment variables
const env = envSchema.parse(process.env);
```

## Features

- Type-safe environment variable validation
- Built on top of Zod's powerful schema validation
- Runtime type checking
- TypeScript support out of the box

## API Documentation

For detailed API documentation, please visit our [documentation site](http://localhost:5000).

## License

MIT
