import { MovieResponseDto } from '../movies/dto/movie.dto';

export interface PaginatedResponse<T> {
  movies: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface DeleteResponse {
  message: string;
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface JwtPayload {
  email: string;
  sub: string;
}

export interface FileUploadConfig {
  maxSize: number;
  allowedMimeTypes: readonly string[];
  allowedExtensions: readonly string[];
}

