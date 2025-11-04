# Movie Database API - Backend

A NestJS-based REST API for managing movies with JWT authentication, file uploads, and PostgreSQL database integration.

## 🚀 Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **Sequelize** - SQL ORM with TypeScript support
- **JWT** - Authentication with Passport.js
- **Swagger/OpenAPI** - API documentation
- **Multer** - File upload handling
- **bcrypt** - Password hashing
- **class-validator** - DTO validation

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Database Configuration (Option 1: DATABASE_URL)
   DATABASE_URL=postgresql://username:password@localhost:5432/moviedb

   # Database Configuration (Option 2: Individual variables)
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=moviedb

   # JWT Secret (generate a secure random string)
   JWT_SECRET=your-secret-key-change-in-production
   ```

   **Generate a secure JWT secret:**
   ```bash
   openssl rand -base64 32
   ```

3. **Run database migrations:**
   ```bash
   npm run migration:run
   ```

4. **Seed the database (optional):**
   ```bash
   npm run seeder:run
   ```

   This will create:
   - Admin user: `admin@gmail.com` / `123456`
   - 12 dummy movies for the admin user

## 🏃 Running the Application

### Development Mode
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

### Production Build
```bash
npm run build
npm start
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3001/api/docs`

The Swagger UI provides interactive API documentation where you can:
- View all available endpoints
- Test API calls directly
- See request/response schemas
- Authenticate using JWT tokens

## 🗄️ Database Management

### Migrations

The project uses Sequelize migrations for database schema management.

**Create a new migration:**
```bash
npm run migration:generate -- --name migration-name
```

**Run migrations:**
```bash
npm run migration:run
```

**Rollback last migration:**
```bash
npm run migration:undo
```

**Rollback all migrations:**
```bash
npm run migration:undo:all
```

**Check migration status:**
```bash
npm run migration:status
```

### Seeders

Seeders are used to populate the database with initial data.

**Create a new seeder:**
```bash
npm run seeder:generate -- --name seeder-name
```

**Run all seeders:**
```bash
npm run seeder:run
```

**Rollback last seeder:**
```bash
npm run seeder:undo
```

**Rollback all seeders:**
```bash
npm run seeder:undo:all
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── guards/             # Auth guards
│   │   ├── strategies/         # Passport strategies
│   │   ├── auth.controller.ts  # Auth endpoints
│   │   ├── auth.module.ts      # Auth module
│   │   └── auth.service.ts     # Auth business logic
│   ├── movies/                  # Movies module
│   │   ├── dto/                # Movie DTOs
│   │   ├── movies.controller.ts
│   │   ├── movies.module.ts
│   │   └── movies.service.ts
│   ├── models/                 # Sequelize models
│   │   ├── user.model.ts
│   │   └── movie.model.ts
│   ├── common/                 # Shared utilities
│   │   ├── constants.ts        # Application constants
│   │   ├── interfaces.ts       # TypeScript interfaces
│   │   ├── translations.ts     # Translation strings
│   │   ├── api-descriptions.ts # API documentation strings
│   │   ├── multer.config.ts    # File upload config
│   │   ├── file-upload.service.ts
│   │   └── image-file.validator.ts
│   ├── database/               # Database module
│   │   └── database.module.ts
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Application entry point
├── database/
│   ├── migrations/             # Database migrations
│   ├── seeders/               # Database seeders
│   └── config.js              # Sequelize CLI config
├── uploads/                    # Uploaded files directory
│   └── posters/               # Movie poster images
├── .env                        # Environment variables (not in git)
├── package.json
└── tsconfig.json
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Endpoint
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "admin@gmail.com",
    "name": "Admin User"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Using JWT Token

Include the token in the Authorization header for protected routes:
```
Authorization: Bearer <token>
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Movies (Protected - requires JWT)
- `GET /api/movies` - Get paginated list of movies
  - Query params: `page` (default: 1), `limit` (default: 8)
- `GET /api/movies/:id` - Get single movie by ID
- `POST /api/movies` - Create new movie (with optional poster upload)
- `PUT /api/movies/:id` - Update movie (with optional poster upload)
- `DELETE /api/movies/:id` - Delete movie

### File Upload

Movies can include poster images:
- **Supported formats**: JPEG, JPG, PNG, GIF
- **Max file size**: 10MB
- **Field name**: `poster`
- **Storage**: Files are stored in `uploads/posters/` directory

## 🗂️ Database Models

### User Model
```typescript
{
  id: UUID (Primary Key)
  email: string (Unique)
  password: string (Hashed)
  name: string (Optional)
  createdAt: Date
  updatedAt: Date
}
```

### Movie Model
```typescript
{
  id: UUID (Primary Key)
  title: string
  publishingYear: number (1900-2035)
  poster: string (Optional - URL path)
  userId: UUID (Foreign Key -> User)
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 Configuration

### Constants

All hard-coded values are centralized in `src/common/constants.ts`:
- Pagination defaults
- File size limits
- Movie year ranges
- HTTP status codes
- API routes
- Content types

### Translations

All user-facing strings are centralized in `src/common/translations.ts`:
- Error messages
- API descriptions
- Validation messages

## 🧪 Validation

The API uses `class-validator` for DTO validation:

- **Email**: Must be valid email format
- **Password**: Minimum 6 characters
- **Movie Title**: Required, non-empty string
- **Publishing Year**: Integer between 1900 and 2035
- **Poster**: Optional image file (JPEG, PNG, GIF, max 10MB)

## 📝 Code Quality

### Linting
```bash
npm run lint
```

### TypeScript
The project uses strict TypeScript configuration for type safety.

## 🚨 Error Handling

The API returns standardized error responses:

```json
{
  "statusCode": 400,
  "message": ["validation error messages"],
  "error": "Bad Request"
}
```

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: All inputs validated using class-validator
- **File Upload Security**: File type and size validation
- **CORS**: Enabled for cross-origin requests
- **SQL Injection Protection**: Using Sequelize ORM parameterized queries

## 📦 Dependencies

### Core Dependencies
- `@nestjs/common`, `@nestjs/core` - NestJS framework
- `@nestjs/jwt`, `@nestjs/passport` - Authentication
- `sequelize`, `sequelize-typescript` - Database ORM
- `pg`, `pg-hstore` - PostgreSQL driver
- `bcrypt` - Password hashing
- `class-validator`, `class-transformer` - Validation
- `@nestjs/swagger` - API documentation

### Development Dependencies
- `typescript` - TypeScript compiler
- `ts-node-dev` - Development server
- `sequelize-cli` - Database migrations
- `eslint` - Code linting

## 🌍 Environment Variables

See `ENV_SETUP.md` in the root directory for detailed environment variable documentation.

## 📖 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [Swagger/OpenAPI Documentation](https://swagger.io/docs/)

## 📄 License

This project is part of a full-stack developer assignment.
