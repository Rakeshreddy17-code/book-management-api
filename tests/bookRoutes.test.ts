import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';  // Make sure your app exports the Express instance
import * as bookService from '../services/bookService';

jest.mock('../services/bookService');

describe('GET /books', () => {
  it('should return a list of books', async () => {
    const mockBooks = [
      { id: '1', title: 'Book A', author: 'Author A', publishedYear: 2020 },
      { id: '2', title: 'Book B', author: 'Author B', publishedYear: 2021 },
    ];

    (bookService.getAllBooks as jest.Mock).mockResolvedValue(mockBooks);

    const res = await request(app).get('/books');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockBooks);
  });
});

// 🧹 Clean up MongoDB connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});