---
title: "NestJS REST API Service"
description: "Production-ready REST API service built with NestJS, TypeORM, and PostgreSQL — includes JWT auth, role-based access, and Swagger docs."
tech: ["NestJS", "TypeScript", "PostgreSQL", "Spring Boot"]
github: "https://github.com/ZeroWillHero/nestjs-api-service"
live: ""
cover: ""
images: []
date: "2026-03-15"
featured: true
status: "completed"
---

# NestJS REST API Service

A production-ready backend API template built with NestJS, designed to be the foundation for new backend projects. Ships with authentication, authorization, validation, and API documentation out of the box.

## Features

- **JWT authentication** — access + refresh token flow with automatic rotation
- **Role-based access control** — guard-based permissions system
- **Request validation** — class-validator DTOs with detailed error messages
- **Swagger UI** — auto-generated OpenAPI docs from decorators
- **Database migrations** — TypeORM migration workflow for schema changes
- **Rate limiting** — per-route and global rate limits
- **Logging** — structured JSON logs with request tracing

## Project Structure

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── strategies/          # JWT & local passport strategies
│   └── guards/              # JWT & roles guards
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── entities/
├── common/
│   ├── decorators/
│   ├── filters/             # Global exception filter
│   ├── interceptors/        # Logging & transform interceptors
│   └── pipes/
└── config/                  # Environment config with validation
```

## Authentication Flow

```typescript
@Post('refresh')
@UseGuards(RefreshTokenGuard)
async refreshTokens(@CurrentUser() user: JwtPayload) {
  return this.authService.refreshTokens(user.sub, user.refreshToken);
}
```

The refresh token is stored hashed in the database. On rotation, the old token is invalidated — preventing reuse even if intercepted.
