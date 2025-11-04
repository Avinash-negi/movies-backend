import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { API_DESCRIPTIONS } from './common/api-descriptions';
import {
  FILE_UPLOAD_CONSTANTS,
  API_ROUTES,
  API_TAGS,
  BEARER_AUTH,
  SWAGGER_CONFIG,
} from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.setGlobalPrefix(API_ROUTES.API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  app.useStaticAssets(join(process.cwd(), FILE_UPLOAD_CONSTANTS.UPLOAD_DIR), {
    prefix: `/${FILE_UPLOAD_CONSTANTS.UPLOAD_DIR}`,
  });
  
  const config = new DocumentBuilder()
    .setTitle(API_DESCRIPTIONS.swagger.title)
    .setDescription(API_DESCRIPTIONS.swagger.description)
    .setVersion(SWAGGER_CONFIG.VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: BEARER_AUTH.SCHEME,
        bearerFormat: BEARER_AUTH.BEARER_FORMAT,
        name: BEARER_AUTH.NAME,
        description: API_DESCRIPTIONS.swagger.jwtTokenDescription,
        in: BEARER_AUTH.IN,
      },
      BEARER_AUTH.SWAGGER_NAME,
    )
    .addTag(API_TAGS.AUTH, API_DESCRIPTIONS.swagger.authTag)
    .addTag(API_TAGS.MOVIES, API_DESCRIPTIONS.swagger.moviesTag)
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_CONFIG.DOCS_PATH, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3001);
  console.log(`Application is running on: http://localhost:${process.env.PORT ? Number(process.env.PORT) : 3001}`);
  console.log(`Swagger documentation available at: http://localhost:${process.env.PORT ? Number(process.env.PORT) : 3001}/${SWAGGER_CONFIG.DOCS_PATH}`);
}

bootstrap();
