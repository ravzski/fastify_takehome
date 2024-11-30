import { useState } from 'react';
import { Author } from '../types/models';
import { ApiResponse } from '../types/api';
import { authorApi } from '../services/api';

export type CreateAuthorData = Omit<Author, 'id'>;

interface UseAuthors {
  authors: Author[];
  createAuthor: (data: CreateAuthorData) => Promise<void>;
  fetchAuthors: () => Promise<void>;
}

export function useAuthors(): UseAuthors {
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchAuthors = async (): Promise<void> => {
    const response: ApiResponse<Author[]> = await authorApi.getAll();
    setAuthors(response.data);
  };

  const createAuthor = async (data: CreateAuthorData): Promise<void> => {
    await authorApi.create(data);
    await fetchAuthors();
  };

  return { authors, createAuthor, fetchAuthors };
}
