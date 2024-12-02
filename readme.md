## Project Structure

```
/project-root
├── backend/
│   ....
├── frontend/
|   .....
│
└── docker-compose.yml
```

## Getting **Started**

### Prerequisites

1. Install Docker
2. Install Docker Compose

### Running with Docker

1. Build and start all services:
   ```bash
   docker-compose up --build
   ```

2. Access your applications:
   - Backend API: http://localhost:3000
   - Frontend: http://localhost:5173


# Backend Service

- Source code is in `src/`
- Database schema in `prisma/schema.prisma`
- Tests in `src/modules/*/**.test.ts`

## Architecture

```
src/
├── core/                 # Core interfaces
    .....
│
├── modules/              # Feature modules
    ....
│
└── plugins/              # Plugins and middlewares
    ....
```

### Scalability
- **Modular Architecture**: Each feature (author, book) is a self-contained module
- **Clean Architecture**: Clear separation of concerns between routes, controllers, and services
- **Concern Segregation**: Services are injected into controllers, making the system loosely coupled
- **Base Classes**: Common functionality is abstracted into base classes, reducing code duplication

### Maintainability
- **Consistent Structure**: Each module follows the same pattern:
  - `*.routes.ts`: Route definitions
  - `*.controller.ts`: Request handling
  - `*.service.ts`: Business logic
  - `*.types.ts`: Type definitions
  - `*.controller.test.ts`: Tests
- **Single Responsibility**: Each file has a clear, single purpose

### DRY (Don't Repeat Yourself) Principles
- **Base Classes**: Common CRUD operations in base controller and service
- **Shared Types**: Common types and interfaces are reused across modules
- **Utility Functions**: Shared functionality is abstracted into utility functions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start development server:
```bash
npm run dev
```

## Testing

Run all tests:
```bash
npm run test
```

## Development Guidelines

1. **Adding a New Feature**
   - Create a new module directory under `src/modules`
   - Implement controller, service, routes, and types
   - Add tests
   - Register routes in main application

2. **Error Handling**
   - Use the base controller's error handling methods
   - Create specific error types when needed
   - Always return consistent error responses

3. **Database Operations**
   - Keep database queries in service layer
   - Use Prisma transactions when needed
   - Validate data before database operations
****
4. **Testing**
   - Write tests for all new endpoints
   - Mock external dependencies
   - Test error cases
   - Maintain test coverage

## Performance Considerations

- Connection pooling with Prisma
- Request validation using Fastify schemas
- Proper error handling and logging
- Database query optimization
- Rate limiting on sensitive endpoints