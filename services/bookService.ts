import { Book, IBook } from '../models/bookModels';
import { Types } from 'mongoose';

export const getAllBooks = async (): Promise<IBook[]> => {
  return Book.find();
};

export const getBookById = async (id: string): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Book.findById(id);
};

export const createBook = async (data: Partial<IBook>): Promise<IBook> => {
  const book = new Book(data);
  return book.save();
};

export const updateBook = async (
  id: string,
  data: Partial<IBook>
): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Book.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBook = async (id: string): Promise<IBook | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Book.findByIdAndDelete(id);
};
