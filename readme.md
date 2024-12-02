## 🏗 Project Structure

```
/project-root
├── backend/
│   ├── src/
│   │   ├── core/           # Core interfaces, types, and base classes
│   │   ├── modules/        # Feature modules (domain-driven)
│   │   ├── plugins/        # Middleware and external integrations
│   │   └── config/         # Configuration management
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── tests/              # Integration & E2E tests
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── features/       # Feature-specific logic
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API clients and external services
│   │   └── utils/         # Utility functions
│   └── tests/             # Frontend tests
│
└── docker/                # Docker configuration files
    ├── development/
    └── production/
```

## Getting Started

### Prerequisites

1. Docker (version 20.10.0 or higher)
2. Docker Compose (version 2.0.0 or higher)
3. Node.js (version 20 or higher) for local development

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. Start Development Environment:
   ```bash
   docker-compose up --build
   ```

### Access Points
- Backend API: http://localhost:3000
- Frontend App: http://localhost:5173

#### Running Tests
```bash
docker-compose exec backend npm run test
```

## Architecture Principles

### Code Organization
- Feature-based structure
- Clear separation of concerns
- Consistent file naming conventions
- Comprehensive documentation

### Colocate Related Code
- Each feature (author, book) is a self-contained module
- This makes it easier to understand and modify functionality.
- Each feature folder contains everything needed to understand and modify that feature.
- Clear separation of concerns between routes, controllers, and services
-
### DRY (Don't Repeat Yourself) Principles
- Common functionality is abstracted into base classes, reducing code duplication
- Reduces code duplication
- Makes adding new features faster through inheritance
-
### Testing
- Clear boundaries make unit testing easier
- Can mock dependencies cleanly
- Service layer can be tested independently of HTTP concerns

### State Management
- Components are organized by feature in the components directory
- Shared UI components go in the components/ui directory
- Each feature should have its own directory with related components
- Custom hooks in the hooks directory manage feature-specific state

## Possible improvements

### Testing

- E2E Testing Infrastructure - (Playwright or Cypress)
- Integration Testing - API integration tests using Supertest
- Unit Testing - Add property-based testing using fast-check


### API Response Caching
- Implement ETags for resource versioning
- Add cache-control headers
- Implement stale-while-revalidate strategy

### Backend Optimization
- Implement rate limiting
- Implement connection pooling
