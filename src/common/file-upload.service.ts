import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FILE_UPLOAD_CONSTANTS } from './constants';

@Injectable()
export class FileUploadService {
  private readonly uploadPath = path.join(
    process.cwd(),
    FILE_UPLOAD_CONSTANTS.UPLOAD_DIR,
    FILE_UPLOAD_CONSTANTS.POSTERS_DIR,
  );

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  getFileUrl(filename: string): string {
    return `/${FILE_UPLOAD_CONSTANTS.UPLOAD_DIR}/${FILE_UPLOAD_CONSTANTS.POSTERS_DIR}/${filename}`;
  }

  deleteFile(filename: string): void {
    const filePath = path.join(this.uploadPath, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  extractFilenameFromUrl(url: string): string | null {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}

