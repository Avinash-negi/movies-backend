export const translations = {
  en: {
    auth: {
      invalidCredentials: 'Invalid email or password',
      invalidToken: 'Invalid token',
      emailAlreadyExists: 'Email already exists',
      registrationFailed: 'Registration failed',
      login: {
        summary: 'User login',
        description: 'Authenticate user and return JWT token',
        successDescription: 'Login successful',
        errorDescription: 'Invalid email or password',
      },
      register: {
        summary: 'User registration',
        description: 'Register a new user and return JWT token',
        successDescription: 'Registration successful',
        errorDescription: 'Registration failed',
      },
      dto: {
        emailDescription: 'User email address',
        passwordDescription: 'User password',
        nameDescription: 'User name (optional)',
        userInfoDescription: 'User information',
        jwtTokenDescription: 'JWT authentication token',
      },
    },
    movies: {
      notFound: 'Movie not found',
      deletedSuccessfully: 'Movie deleted successfully',
      getAll: {
        summary: 'Get all movies',
        description: 'Retrieve paginated list of movies for the authenticated user',
        successDescription: 'Movies retrieved successfully',
      },
      getOne: {
        summary: 'Get movie by ID',
        description: 'Retrieve a single movie by its ID',
        successDescription: 'Movie retrieved successfully',
        paramDescription: 'Movie ID',
      },
      create: {
        summary: 'Create a new movie',
        description: 'Create a new movie with optional poster image upload',
        successDescription: 'Movie created successfully',
      },
      update: {
        summary: 'Update a movie',
        description: 'Update an existing movie with optional poster image upload',
        successDescription: 'Movie updated successfully',
      },
      delete: {
        summary: 'Delete a movie',
        description: 'Delete a movie and its associated poster image',
        successDescription: 'Movie deleted successfully',
      },
      dto: {
        titleDescription: 'Movie title',
        publishingYearDescription: 'Year the movie was published',
        posterDescription: 'Poster image URL (set automatically when file is uploaded)',
        posterUrlDescription: 'Poster image URL',
        movieIdDescription: 'Movie unique identifier',
        userIdDescription: 'User ID who owns this movie',
        createdAtDescription: 'Date when the movie was created',
        updatedAtDescription: 'Date when the movie was last updated',
        posterFileDescription: 'Poster image file (optional)',
      },
      query: {
        pageDescription: 'Page number (default: 1)',
        limitDescription: 'Items per page (default: 8)',
      },
    },
    common: {
      unauthorized: 'Unauthorized',
      badRequest: 'Bad request - validation error',
      notFound: 'Not found',
    },
    swagger: {
      title: 'Movie Database API',
      description: 'API documentation for Movie Database application',
      jwtTokenDescription: 'Enter JWT token',
      authTag: 'Authentication endpoints',
      moviesTag: 'Movie management endpoints',
    },
    validation: {
      onlyImageFilesAllowed: 'Only image files are allowed!',
      invalidFileType: 'Validation failed (current file type is {currentType}, expected types are: {expectedTypes})',
    },
  },
};

export type TranslationKey = 
  | 'auth.invalidCredentials'
  | 'auth.invalidToken'
  | 'auth.emailAlreadyExists'
  | 'auth.registrationFailed'
  | 'auth.login.summary'
  | 'auth.login.description'
  | 'auth.login.successDescription'
  | 'auth.login.errorDescription'
  | 'auth.register.summary'
  | 'auth.register.description'
  | 'auth.register.successDescription'
  | 'auth.register.errorDescription'
  | 'auth.dto.emailDescription'
  | 'auth.dto.passwordDescription'
  | 'auth.dto.nameDescription'
  | 'auth.dto.userInfoDescription'
  | 'auth.dto.jwtTokenDescription'
  | 'movies.notFound'
  | 'movies.deletedSuccessfully'
  | 'movies.getAll.summary'
  | 'movies.getAll.description'
  | 'movies.getAll.successDescription'
  | 'movies.getOne.summary'
  | 'movies.getOne.description'
  | 'movies.getOne.successDescription'
  | 'movies.getOne.paramDescription'
  | 'movies.create.summary'
  | 'movies.create.description'
  | 'movies.create.successDescription'
  | 'movies.update.summary'
  | 'movies.update.description'
  | 'movies.update.successDescription'
  | 'movies.delete.summary'
  | 'movies.delete.description'
  | 'movies.delete.successDescription'
  | 'movies.dto.titleDescription'
  | 'movies.dto.publishingYearDescription'
  | 'movies.dto.posterDescription'
  | 'movies.dto.posterUrlDescription'
  | 'movies.dto.movieIdDescription'
  | 'movies.dto.userIdDescription'
  | 'movies.dto.createdAtDescription'
  | 'movies.dto.updatedAtDescription'
  | 'movies.dto.posterFileDescription'
  | 'movies.query.pageDescription'
  | 'movies.query.limitDescription'
  | 'common.unauthorized'
  | 'common.badRequest'
  | 'common.notFound'
  | 'swagger.title'
  | 'swagger.description'
  | 'swagger.jwtTokenDescription'
  | 'swagger.authTag'
  | 'swagger.moviesTag'
  | 'validation.onlyImageFilesAllowed'
  | 'validation.invalidFileType';

export function translate(key: TranslationKey, params?: Record<string, string>): string {
  const keys = key.split('.');
  let value: any = translations.en;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] || match;
    });
  }
  
  return value || key;
}
