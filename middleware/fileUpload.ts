import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Set up Multer storage and file size limit
const storage = multer.memoryStorage(); // Store the file in memory

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (!file.originalname.endsWith('.csv')) {
      const error = new Error('Only CSV files are allowed');
      // TypeScript expects null for the first param when there is no error
      cb(error as unknown as null, false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
