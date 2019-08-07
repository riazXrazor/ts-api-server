# ts-api-server
This project is a starting point for developing an API application using TypeScript, Node.js, and swagger UI for docs.

## Technologies Used
- [TypeScript](http://www.typescriptlang.org/)
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com/)
- [tsoa](https://github.com/lukeautry/tsoa)
    - Generates Express Routes from TypeScript controllers
    - Generates [OpenAPI ("Swagger")](https://swagger.io/docs/specification/about) specification, enabling automatic documentation and client library generation
    - [TypeORM](http://typeorm.io) for code-first database migrations
        - Optional: ORM-like queries
- Testing
    - Mocha/Chai tests for API

## Getting Started

### System Requirements
- [Node.js 8+](https://nodejs.org/en/download/)

### Starting the app
- `npm install` to install dependencies
- `npm start` to start environment

### api documentation
`use http://localhost:3000/docs to access the documentation`


## Database Operations

### Creating a new migration
- Create a new class under [the entities directory](./api/database/entities) extending from [base.ts](./api/database/entities/base.ts)
    - See [user.ts](./api/database/entities/user.ts) as an example
    - Review [TypeORM documentation](http://typeorm.io) for the full migration API
- `npm db:migrate`

### Update database with pending migrations
- `npm db:update`

## Contributing
- Features and bug fixes welcome
