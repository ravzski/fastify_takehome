
import { Author } from '@prisma/client';
import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authorId: z.number()
});

export const updateBookSchema = createBookSchema.partial();

export type CreateBookDTO = z.infer<typeof createBookSchema>;
export type UpdateBookDTO = z.infer<typeof updateBookSchema>;

export interface Book {
  id: number;
  title: string;
  authorId: number;
  author?: Author;
}