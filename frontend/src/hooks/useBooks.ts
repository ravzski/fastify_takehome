import { useState } from 'react';
import { Book } from '../types/models';
import { ApiResponse } from '../types/api';
import { bookApi } from '../services/api';

export type CreateBookData = Omit<Book, 'id'>;
export type UpdateBookData = Partial<Omit<Book, 'id'>>;

interface UseBooks {
  books: Book[];
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  createBook: (data: CreateBookData) => Promise<void>;
  updateBook: (id: number, data: UpdateBookData) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  fetchBooks: () => Promise<void>;
}

export function useBooks(): UseBooks {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const fetchBooks = async (): Promise<void> => {
    const response: ApiResponse<Book[]> = await bookApi.getAll();
    setBooks(response.data);
  };

  const createBook = async (data: CreateBookData): Promise<void> => {
    await bookApi.create(data);
    await fetchBooks();
  };

  const updateBook = async (id: number, data: UpdateBookData): Promise<void> => {
    await bookApi.update(id, data);
    await fetchBooks();
    setSelectedBook(null);
  };

  const deleteBook = async (id: number): Promise<void> => {
    await bookApi.delete(id);
    await fetchBooks();
  };

  return {
    books,
    selectedBook,
    setSelectedBook,
    createBook,
    updateBook,
    deleteBook,
    fetchBooks,
  };
}