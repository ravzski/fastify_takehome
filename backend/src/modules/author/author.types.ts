
import { Book } from '@prisma/client';
import { z } from 'zod';

export const createAuthorSchema = z.object({
  name: z.string().min(1, 'Name is required')
});

export const updateAuthorSchema = createAuthorSchema.partial();

export type CreateAuthorDTO = z.infer<typeof createAuthorSchema>;
export type UpdateAuthorDTO = z.infer<typeof updateAuthorSchema>;

export interface Author {
  id: number;
  name: string;
  books?: Book[];
}