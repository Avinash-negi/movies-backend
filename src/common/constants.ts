export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 8,
} as const;

export const FILE_SIZE_CONSTANTS = {
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024,
  MAX_FILE_SIZE_MB: 10,
} as const;

export const MOVIE_CONSTANTS = {
  MIN_YEAR: 1900,
  MAX_YEAR: 2035,
} as const;

export const FILE_UPLOAD_CONSTANTS = {
  UPLOAD_DIR: 'uploads',
  POSTERS_DIR: 'posters',
  POSTER_FIELD_NAME: 'poster',
} as const;

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
] as const;

export const ALLOWED_IMAGE_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'gif',
] as const;

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
} as const;

export const ORDER_DIRECTIONS = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const API_ROUTES = {
  AUTH: 'auth',
  MOVIES: 'movies',
  LOGIN: 'login',
  API_PREFIX: 'api',
  API_DOCS: 'api/docs',
} as const;

export const API_TAGS = {
  AUTH: 'auth',
  MOVIES: 'movies',
} as const;

export const BEARER_AUTH = {
  STRATEGY_NAME: 'jwt',
  SWAGGER_NAME: 'JWT-auth',
  SCHEME: 'bearer',
  BEARER_FORMAT: 'JWT',
  NAME: 'JWT',
  IN: 'header',
} as const;

export const CONTENT_TYPES = {
  MULTIPART_FORM_DATA: 'multipart/form-data',
  BINARY: 'binary',
} as const;

export const QUERY_PARAMS = {
  PAGE: 'page',
  LIMIT: 'limit',
  ID: 'id',
} as const;

export const TABLE_NAMES = {
  MOVIES: 'movies',
  USERS: 'users',
} as const;

export const SWAGGER_CONFIG = {
  VERSION: '1.0',
  DOCS_PATH: 'api/docs',
} as const;

export const EXAMPLE_VALUES = {
  UUID: '123e4567-e89b-12d3-a456-426614174000',
  MOVIE_TITLE: 'The Matrix',
  MOVIE_TITLE_UPDATED: 'The Matrix Reloaded',
  PUBLISHING_YEAR: 1999,
  PUBLISHING_YEAR_UPDATED: 2003,
  EMAIL: 'admin@gmail.com',
  PASSWORD: 'password123',
  JWT_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  DATE: '2024-01-01T00:00:00.000Z',
  POSTER_URL: '/uploads/posters/uuid-filename.jpg',
  USER_NAME: 'John Doe',
} as const;

export const PAGINATION_EXAMPLES = {
  TOTAL: 10,
  PAGE: 1,
  TOTAL_PAGES: 2,
} as const;

