import { Module, Global } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { Movie } from '../models/movie.model';

@Global()
@Module({
  providers: [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const databaseUrl = process.env.DATABASE_URL;
        
        let sequelize: Sequelize;
        
        if (databaseUrl) {
          // Parse DATABASE_URL if provided
          const url = new URL(databaseUrl);
          sequelize = new Sequelize({
            dialect: 'postgres',
            host: url.hostname,
            port: parseInt(url.port || '5432'),
            username: url.username,
            password: url.password,
            database: url.pathname.slice(1), // Remove leading slash
            models: [User, Movie],
            logging: process.env.NODE_ENV === 'development' ? console.log : false,
          });
        } else {
          // Fallback to individual env vars
          sequelize = new Sequelize({
            dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            username: process.env.DB_USER || 'user',
            password: process.env.DB_PASSWORD || 'password',
            database: process.env.DB_NAME || 'moviedb',
            models: [User, Movie],
            logging: process.env.NODE_ENV === 'development' ? console.log : false,
          });
        }
        
        await sequelize.authenticate();
        // Schema is managed by migrations - do not use sync()
        
        return sequelize;
      },
    },
  ],
  exports: ['SEQUELIZE'],
})
export class DatabaseModule {}
