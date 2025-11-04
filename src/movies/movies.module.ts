import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DatabaseModule } from '../database/database.module';
import { FileUploadService } from '../common/file-upload.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MoviesController],
  providers: [MoviesService, FileUploadService],
  exports: [MoviesService],
})
export class MoviesModule {}

