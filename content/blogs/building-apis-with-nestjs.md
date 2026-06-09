---
title: "Building RESTful APIs with NestJS"
description: "A practical guide to building scalable and maintainable REST APIs using NestJS — covering modules, controllers, services, and TypeORM integration."
date: "2026-06-01"
tags: ["nestjs", "backend", "typescript", "api"]
readTime: "5 min read"
---

# Building RESTful APIs with NestJS

NestJS is a progressive Node.js framework that brings structure and scalability to your backend projects. After using it across several projects, here is how I approach building REST APIs with it.

## Why NestJS?

NestJS combines the flexibility of Node.js with Angular-inspired architecture:

- **TypeScript first** — strong typing throughout the codebase
- **Decorators** — clean, declarative code
- **Dependency Injection** — testable and maintainable services
- **Modules** — organized, scalable structure

## Project Structure

A typical NestJS project looks like this:

```
src/
├── app.module.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── user.entity.ts
└── main.ts
```

## Creating a Controller

Controllers handle incoming requests and return responses. Each route is defined with a decorator:

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

## Service Layer

The service handles all business logic and interacts with the database:

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }
}
```

## DTOs and Validation

Use Data Transfer Objects with `class-validator` to validate incoming request bodies:

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;
}
```

## Conclusion

NestJS gives you the structure needed for large-scale applications while remaining flexible enough for smaller projects. The module system makes code organization straightforward, and the TypeScript support is excellent.

If you are starting a new backend project and want something structured, give NestJS a try.
