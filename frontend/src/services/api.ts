import axios from 'axios';
import { Author, Book } from '../types/models';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const authorApi = {
  getAll: () => api.get<Author[]>('/authors'),
  getOne: (id: number) => api.get<Author>(`/authors/${id}`),
  create: (data: Omit<Author, 'id'>) => api.post<Author>('/authors', data),
  update: (id: number, data: Partial<Author>) => api.put<Author>(`/authors/${id}`, data),
  delete: (id: number) => api.delete(`/authors/${id}`),
};

export const bookApi = {
  getAll: () => api.get<Book[]>('/books'),
  getOne: (id: number) => api.get<Book>(`/books/${id}`),
  create: (data: Omit<Book, 'id'>) => api.post<Book>('/books', data),
  update: (id: number, data: Partial<Book>) => api.put<Book>(`/books/${id}`, data),
  delete: (id: number) => api.delete(`/books/${id}`),
};
