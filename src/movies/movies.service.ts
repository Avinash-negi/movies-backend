import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../models/movie.model';
import { CreateMovieDto, UpdateMovieDto, MovieResponseDto } from './dto/movie.dto';
import { translate } from '../common/translations';
import { PaginatedResponse } from '../common/interfaces';
import { PAGINATION_CONSTANTS, ORDER_DIRECTIONS } from '../common/constants';

@Injectable()
export class MoviesService {
  async findAll(
    userId: string,
    page: number = PAGINATION_CONSTANTS.DEFAULT_PAGE,
    limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
  ): Promise<PaginatedResponse<MovieResponseDto>> {
    const offset = (page - 1) * limit;
    
    const { rows: movies, count } = await Movie.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['updatedAt', ORDER_DIRECTIONS.DESC]],
    });

    return {
      movies: movies.map(movie => this.toResponseDto(movie)),
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }

  async findOne(id: string, userId: string): Promise<MovieResponseDto> {
    const movie = await Movie.findOne({
      where: { id, userId },
    });

    if (!movie) {
      throw new NotFoundException(translate('movies.notFound'));
    }

    return this.toResponseDto(movie);
  }

  async create(createMovieDto: CreateMovieDto, userId: string): Promise<MovieResponseDto> {
    const movieData: any = {
      title: createMovieDto.title,
      publishingYear: createMovieDto.publishingYear,
      userId,
    };

    if (createMovieDto.poster) {
      movieData.poster = createMovieDto.poster;
    }

    const movie = await Movie.create(movieData);

    return this.toResponseDto(movie);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto, userId: string): Promise<MovieResponseDto> {
    const movie = await Movie.findOne({
      where: { id, userId },
    });

    if (!movie) {
      throw new NotFoundException(translate('movies.notFound'));
    }

    await movie.update(updateMovieDto);

    return this.toResponseDto(movie);
  }

  async remove(id: string, userId: string): Promise<void> {
    const movie = await Movie.findOne({
      where: { id, userId },
    });

    if (!movie) {
      throw new NotFoundException(translate('movies.notFound'));
    }

    await movie.destroy();
  }

  private toResponseDto(movie: Movie): MovieResponseDto {
    return {
      id: movie.id,
      title: movie.title,
      publishingYear: movie.publishingYear,
      poster: movie.poster || undefined,
      userId: movie.userId,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }
}

