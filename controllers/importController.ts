import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/bookService';
import { v4 as uuidv4 } from 'uuid';

interface BookInput {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

// Utility function to parse CSV manually
const parseCSV = (csv: string): BookInput[] => {
  const rows = csv.split('\n');
  const books: BookInput[] = [];

  rows.forEach((row) => {
    const columns = row.split(',');
    if (columns.length === 3) {
      books.push({
        id: uuidv4(),
        title: columns[0].trim(),
        author: columns[1].trim(),
        publishedYear: parseInt(columns[2].trim(), 10),
      });
    }
  });

  return books;
};

// Utility function to validate CSV row
const validateRow = (book: BookInput): string[] => {
  const errors: string[] = [];
  if (!book.title) errors.push('Title is required');
  if (!book.author) errors.push('Author is required');
  if (!book.publishedYear || isNaN(book.publishedYear)) {
    errors.push('Published Year is required and must be a number');
  }
  return errors;
};

// Main controller
export const importBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const csv = file.buffer.toString('utf-8');
    const books = parseCSV(csv);

    let successCount = 0;
    const errors: string[] = [];

    for (const book of books) {
      const validationErrors = validateRow(book);
      if (validationErrors.length === 0) {
        await bookService.createBook(book);
        successCount++;
      } else {
        errors.push(
          `Invalid book data: ${JSON.stringify(book)} | Errors: ${validationErrors.join(', ')}`
        );
      }
    }

    res.status(200).json({
      message: `${successCount} books added successfully.`,
      errors: errors.length > 0 ? errors : null,
    });
  } catch (err) {
    next(err);
  }
};
