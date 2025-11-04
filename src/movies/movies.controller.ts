import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto, MovieResponseDto } from './dto/movie.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileUploadService } from '../common/file-upload.service';
import { multerConfig } from '../common/multer.config';
import { ImageFileValidator } from '../common/image-file.validator';
import { translate } from '../common/translations';
import { PaginatedResponse, DeleteResponse, AuthenticatedRequest } from '../common/interfaces';
import {
  PAGINATION_CONSTANTS,
  FILE_SIZE_CONSTANTS,
  HTTP_STATUS_CODES,
  API_ROUTES,
  API_TAGS,
  BEARER_AUTH,
  CONTENT_TYPES,
  QUERY_PARAMS,
  EXAMPLE_VALUES,
  PAGINATION_EXAMPLES,
  FILE_UPLOAD_CONSTANTS,
} from '../common/constants';
import { API_DESCRIPTIONS } from '../common/api-descriptions';

@ApiTags(API_TAGS.MOVIES)
@ApiBearerAuth(BEARER_AUTH.SWAGGER_NAME)
@Controller(API_ROUTES.MOVIES)
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get()
  @ApiOperation({ summary: API_DESCRIPTIONS.movies.getAll.summary, description: API_DESCRIPTIONS.movies.getAll.description })
  @ApiQuery({ name: QUERY_PARAMS.PAGE, required: false, type: Number, description: API_DESCRIPTIONS.movies.query.page, example: PAGINATION_CONSTANTS.DEFAULT_PAGE })
  @ApiQuery({ name: QUERY_PARAMS.LIMIT, required: false, type: Number, description: API_DESCRIPTIONS.movies.query.limit, example: PAGINATION_CONSTANTS.DEFAULT_LIMIT })
  @ApiResponse({
    status: HTTP_STATUS_CODES.OK,
    description: API_DESCRIPTIONS.movies.getAll.successDescription,
    schema: {
      type: 'object',
      properties: {
        movies: {
          type: 'array',
          items: { $ref: '#/components/schemas/MovieResponseDto' },
        },
        total: { type: 'number', example: PAGINATION_EXAMPLES.TOTAL },
        page: { type: 'number', example: PAGINATION_EXAMPLES.PAGE },
        totalPages: { type: 'number', example: PAGINATION_EXAMPLES.TOTAL_PAGES },
      },
    },
  })
  @ApiResponse({ status: HTTP_STATUS_CODES.UNAUTHORIZED, description: API_DESCRIPTIONS.common.unauthorized })
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query(QUERY_PARAMS.PAGE, new DefaultValuePipe(PAGINATION_CONSTANTS.DEFAULT_PAGE), ParseIntPipe) page: number,
    @Query(QUERY_PARAMS.LIMIT, new DefaultValuePipe(PAGINATION_CONSTANTS.DEFAULT_LIMIT), ParseIntPipe) limit: number,
  ): Promise<PaginatedResponse<MovieResponseDto>> {
    return await this.moviesService.findAll(req.user.id, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: API_DESCRIPTIONS.movies.getOne.summary, description: API_DESCRIPTIONS.movies.getOne.description })
  @ApiParam({ name: QUERY_PARAMS.ID, description: API_DESCRIPTIONS.movies.getOne.paramDescription, example: EXAMPLE_VALUES.UUID })
  @ApiResponse({
    status: HTTP_STATUS_CODES.OK,
    description: API_DESCRIPTIONS.movies.getOne.successDescription,
    type: MovieResponseDto,
  })
  @ApiResponse({ status: HTTP_STATUS_CODES.UNAUTHORIZED, description: API_DESCRIPTIONS.common.unauthorized })
  @ApiResponse({ status: HTTP_STATUS_CODES.NOT_FOUND, description: API_DESCRIPTIONS.movies.notFound })
  async findOne(@Param(QUERY_PARAMS.ID) id: string, @Request() req: AuthenticatedRequest): Promise<MovieResponseDto> {
    return await this.moviesService.findOne(id, req.user.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor(FILE_UPLOAD_CONSTANTS.POSTER_FIELD_NAME, multerConfig))
  @ApiOperation({ summary: API_DESCRIPTIONS.movies.create.summary, description: API_DESCRIPTIONS.movies.create.description })
  @ApiConsumes(CONTENT_TYPES.MULTIPART_FORM_DATA)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: EXAMPLE_VALUES.MOVIE_TITLE,
        },
        publishingYear: {
          type: 'number',
          example: EXAMPLE_VALUES.PUBLISHING_YEAR,
        },
        poster: {
          type: 'string',
          format: CONTENT_TYPES.BINARY,
          description: API_DESCRIPTIONS.movies.dto.posterFile,
        },
      },
      required: ['title', 'publishingYear'],
    },
  })
  @ApiResponse({
    status: HTTP_STATUS_CODES.CREATED,
    description: API_DESCRIPTIONS.movies.create.successDescription,
    type: MovieResponseDto,
  })
  @ApiResponse({ status: HTTP_STATUS_CODES.UNAUTHORIZED, description: API_DESCRIPTIONS.common.unauthorized })
  @ApiResponse({ status: HTTP_STATUS_CODES.BAD_REQUEST, description: API_DESCRIPTIONS.common.badRequest })
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Request() req: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: FILE_SIZE_CONSTANTS.MAX_FILE_SIZE_BYTES }),
          new ImageFileValidator(),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ): Promise<MovieResponseDto> {
    if (file) {
      createMovieDto.poster = this.fileUploadService.getFileUrl(file.filename);
    }
    return await this.moviesService.create(createMovieDto, req.user.id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor(FILE_UPLOAD_CONSTANTS.POSTER_FIELD_NAME, multerConfig))
  @ApiOperation({ summary: API_DESCRIPTIONS.movies.update.summary, description: API_DESCRIPTIONS.movies.update.description })
  @ApiParam({ name: QUERY_PARAMS.ID, description: API_DESCRIPTIONS.movies.getOne.paramDescription, example: EXAMPLE_VALUES.UUID })
  @ApiConsumes(CONTENT_TYPES.MULTIPART_FORM_DATA)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: EXAMPLE_VALUES.MOVIE_TITLE_UPDATED,
        },
        publishingYear: {
          type: 'number',
          example: EXAMPLE_VALUES.PUBLISHING_YEAR_UPDATED,
        },
        poster: {
          type: 'string',
          format: CONTENT_TYPES.BINARY,
          description: API_DESCRIPTIONS.movies.dto.posterFile,
        },
      },
    },
  })
  @ApiResponse({
    status: HTTP_STATUS_CODES.OK,
    description: API_DESCRIPTIONS.movies.update.successDescription,
    type: MovieResponseDto,
  })
  @ApiResponse({ status: HTTP_STATUS_CODES.UNAUTHORIZED, description: API_DESCRIPTIONS.common.unauthorized })
  @ApiResponse({ status: HTTP_STATUS_CODES.NOT_FOUND, description: API_DESCRIPTIONS.movies.notFound })
  @ApiResponse({ status: HTTP_STATUS_CODES.BAD_REQUEST, description: API_DESCRIPTIONS.common.badRequest })
  async update(
    @Param(QUERY_PARAMS.ID) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Request() req: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: FILE_SIZE_CONSTANTS.MAX_FILE_SIZE_BYTES }),
          new ImageFileValidator(),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ): Promise<MovieResponseDto> {
    const existingMovie = await this.moviesService.findOne(id, req.user.id);
    
    if (file) {
      if (existingMovie.poster) {
        const oldFilename = this.fileUploadService.extractFilenameFromUrl(existingMovie.poster);
        if (oldFilename) {
          this.fileUploadService.deleteFile(oldFilename);
        }
      }
      updateMovieDto.poster = this.fileUploadService.getFileUrl(file.filename);
    }
    
    return await this.moviesService.update(id, updateMovieDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: API_DESCRIPTIONS.movies.delete.summary, description: API_DESCRIPTIONS.movies.delete.description })
  @ApiParam({ name: QUERY_PARAMS.ID, description: API_DESCRIPTIONS.movies.getOne.paramDescription, example: EXAMPLE_VALUES.UUID })
  @ApiResponse({
    status: HTTP_STATUS_CODES.OK,
    description: API_DESCRIPTIONS.movies.delete.successDescription,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: translate('movies.deletedSuccessfully') },
      },
    },
  })
  @ApiResponse({ status: HTTP_STATUS_CODES.UNAUTHORIZED, description: API_DESCRIPTIONS.common.unauthorized })
  @ApiResponse({ status: HTTP_STATUS_CODES.NOT_FOUND, description: API_DESCRIPTIONS.movies.notFound })
  async remove(@Param(QUERY_PARAMS.ID) id: string, @Request() req: AuthenticatedRequest): Promise<DeleteResponse> {
    const movie = await this.moviesService.findOne(id, req.user.id);
    
    if (movie.poster) {
      const filename = this.fileUploadService.extractFilenameFromUrl(movie.poster);
      if (filename) {
        this.fileUploadService.deleteFile(filename);
      }
    }
    
    await this.moviesService.remove(id, req.user.id);
    return { message: translate('movies.deletedSuccessfully') };
  }
}
