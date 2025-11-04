# Database Migrations

This directory contains Sequelize migration files for managing database schema changes.

## Migration Structure

- `database/migrations/` - Contains all migration files
- `database/seeders/` - Contains seeder files (optional)
- `database/config.js` - Sequelize CLI configuration

## Available Commands

### Create a new migration
```bash
npm run migration:generate -- migration-name
```

Example:
```bash
npm run migration:generate -- add-column-to-movies
```

### Run all pending migrations
```bash
npm run migration:run
```

### Undo the last migration
```bash
npm run migration:undo
```

### Undo all migrations
```bash
npm run migration:undo:all
```

### Check migration status
```bash
npm run migration:status
```

## Migration Files

### Initial Migrations

1. **20241104152101-create-users.js**
   - Creates the `users` table
   - Fields: id, email, password, name, createdAt, updatedAt

2. **20241104152102-create-movies.js**
   - Creates the `movies` table
   - Fields: id, title, publishingYear, poster, userId, createdAt, updatedAt
   - Foreign key relationship to `users` table
   - Index on `userId` column

## Creating New Migrations

When you need to modify a model:

1. **Create a migration file:**
   ```bash
   npm run migration:generate -- modify-movies-table
   ```

2. **Edit the migration file** in `database/migrations/`:
   ```javascript
   module.exports = {
     async up(queryInterface, Sequelize) {
       // Add your changes here
       await queryInterface.addColumn('movies', 'newColumn', {
         type: Sequelize.STRING,
         allowNull: true,
       });
     },
     async down(queryInterface, Sequelize) {
       // Rollback changes here
       await queryInterface.removeColumn('movies', 'newColumn');
     },
   };
   ```

3. **Run the migration:**
   ```bash
   npm run migration:run
   ```

## Best Practices

1. Always provide both `up` and `down` methods in migrations
2. Never modify existing migration files - create new ones instead
3. Test migrations in development before applying to production
4. Keep migrations focused on a single change
5. Use descriptive names for migration files

## Environment Variables

Migrations use the same environment variables as the application:
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name (default: moviedb)
- `DATABASE_URL` - Alternative: full database URL

## Production Usage

In production, migrations should be run before starting the application:
```bash
npm run migration:run
npm start
```

