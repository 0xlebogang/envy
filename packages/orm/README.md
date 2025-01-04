# `@envyper/orm`

A powerful and flexible Object-Relational Mapping (ORM) package for the Envyper framework.

## Features

- Type-safe database operations
- Schema definition and validation
- Support for multiple database engines
- Intuitive query building
- Transaction management
- Connection pooling

## Installation

```bash
bun install
```

## Basic Usage

```typescript
import { createUserSchema } from "@envyper/orm";

// Define your schema
const UserSchema = createUserSchema({
  id: "string",
  name: "string",
  email: "string",
});

// Use the ORM
const users = await db.query(UserSchema).findMany();
```

## Documentation

All functions are documented.

## License

MIT
