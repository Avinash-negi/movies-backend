import { IsString, IsInt, Min, Max, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MOVIE_CONSTANTS } from '../../common/constants';
import { API_DESCRIPTIONS } from '../../common/api-descriptions';
import { EXAMPLE_VALUES } from '../../common/constants';

export class CreateMovieDto {
  @ApiProperty({
    description: API_DESCRIPTIONS.movies.dto.title,
    example: EXAMPLE_VALUES.MOVIE_TITLE,
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: API_DESCRIPTIONS.movies.dto.publishingYear,
    example: EXAMPLE_VALUES.PUBLISHING_YEAR,
    minimum: MOVIE_CONSTANTS.MIN_YEAR,
    maximum: MOVIE_CONSTANTS.MAX_YEAR,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(MOVIE_CONSTANTS.MIN_YEAR)
  @Max(MOVIE_CONSTANTS.MAX_YEAR)
  publishingYear!: number;

  @ApiPropertyOptional({
    description: API_DESCRIPTIONS.movies.dto.poster,
    example: EXAMPLE_VALUES.POSTER_URL,
  })
  @IsString()
  @IsOptional()
  poster?: string;
}

export class UpdateMovieDto {
  @ApiPropertyOptional({
    description: API_DESCRIPTIONS.movies.dto.title,
    example: EXAMPLE_VALUES.MOVIE_TITLE_UPDATED,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: API_DESCRIPTIONS.movies.dto.publishingYear,
    example: EXAMPLE_VALUES.PUBLISHING_YEAR_UPDATED,
    minimum: MOVIE_CONSTANTS.MIN_YEAR,
    maximum: MOVIE_CONSTANTS.MAX_YEAR,
  })
  @Transform(({ value }) => value ? parseInt(value, 10) : value)
  @IsInt()
  @Min(MOVIE_CONSTANTS.MIN_YEAR)
  @Max(MOVIE_CONSTANTS.MAX_YEAR)
  @IsOptional()
  publishingYear?: number;

  @ApiPropertyOptional({
    description: API_DESCRIPTIONS.movies.dto.poster,
    example: EXAMPLE_VALUES.POSTER_URL,
  })
  @IsString()
  @IsOptional()
  poster?: string;
}

export class MovieResponseDto {
  @ApiProperty({
    description: API_DESCRIPTIONS.movies.dto.movieId,
    example: EXAMPLE_VALUES.UUID,
  })
  id!: string;

  @ApiProperty({
    description: API_DESCRIPTIONS.movies.dto.title,
    example: EXAMPLE_VALUES.MOVIE_TITLE,
  })
  title!: string;

  @ApiProperty({
    description: API_DESCRIPTIONS.movies.dto.publishingYear,
    example: EXAMPLE_VALUES.PUBLISHING_YEAR,
  })
  publishingYear!: number;

  @ApiPropertyOptional({
    description: API_DESCRIPTIONS.movies.dto.posterUrl,
    example: EXAMPLE_VALUES.POSTER_URL,
  })
  poster?: string;

  @ApiProperty({
    description: API_DESCRIPTIONS.movies.dto.userId,
    example: EXAMPLE_VALUES.UUID,
  })
  userId!: string;

  @ApiProperty({
    description: API_DESCRIPTIONS.movies.dto.createdAt,
    example: EXAMPLE_VALUES.DATE,
  })
  createdAt!: Date;

  @ApiProperty({
    description: API_DESCRIPTIONS.movies.dto.updatedAt,
    example: EXAMPLE_VALUES.DATE,
  })
  updatedAt!: Date;
}
