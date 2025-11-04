import { FileValidator } from '@nestjs/common';
import { Express } from 'express';
import { translate } from './translations';
import { ALLOWED_IMAGE_MIME_TYPES } from './constants';

export class ImageFileValidator extends FileValidator {
  private readonly allowedMimeTypes: readonly string[] = ALLOWED_IMAGE_MIME_TYPES;

  constructor() {
    super({});
  }

  isValid(file?: Express.Multer.File): boolean {
    if (!file) {
      return true;
    }
    return this.allowedMimeTypes.includes(file.mimetype);
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return translate('validation.invalidFileType', {
      currentType: file.mimetype,
      expectedTypes: this.allowedMimeTypes.join(', '),
    });
  }
}

