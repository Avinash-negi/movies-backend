import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { Request } from 'express';
import { translate } from './translations';
import {
  FILE_UPLOAD_CONSTANTS,
  FILE_SIZE_CONSTANTS,
  ALLOWED_IMAGE_EXTENSIONS,
} from './constants';

export const multerConfig = {
  storage: diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      const uploadPath = path.join(
        process.cwd(),
        FILE_UPLOAD_CONSTANTS.UPLOAD_DIR,
        FILE_UPLOAD_CONSTANTS.POSTERS_DIR,
      );
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    const extensionPattern = new RegExp(`\/(${ALLOWED_IMAGE_EXTENSIONS.join('|')})$`);
    if (!file.mimetype.match(extensionPattern)) {
      return cb(new Error(translate('validation.onlyImageFilesAllowed')), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: FILE_SIZE_CONSTANTS.MAX_FILE_SIZE_BYTES,
  },
};

