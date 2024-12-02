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

## Getting Started

### Prerequisites

1. Docker (version 20.10.0 or higher)
2. Docker Compose (version 2.0.0 or higher)
3. Node.js (version 20 or higher) for local development

### Development Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:ravzski/fastify_takehome.git
   cd fastify_takehome
   ```

2. Start Development Environment:
   ```bash
   docker-compose up --build
   ```

### Access Points
- Backend API: http://localhost:3000
- Frontend App: http://localhost:5173

### Running Tests
```bash
docker-compose exec backend npm run test
```

## Architecture Principles

### Code Organization
- Domain-Driven Design (DDD) -  Business logic organized in feature modules
- Each feature (author, book) is a self-contained module
- This makes it easier to understand and modify functionality.
- Clear separation of concerns
- Consistent file naming conventions

### DRY (Don't Repeat Yourself) Principles
- Common functionality is abstracted into base classes, reducing code duplication
- Makes adding new features faster through inheritance

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

### Backend Optimization
- Implement rate limiting
- Implement connection pooling
- Implement ETags for resource versioning
- Add cache-control headers
- Implement stale-while-revalidate strategy

### Frontend Optimization
- Use of Storybooks - for easier atomic testing of UI components
- Use of state management library (eg. jotai)
- Zod to validate HTTP responses
- Use of component library for tailwind to make components (modals, tables etc.) more consistent and easier to implement