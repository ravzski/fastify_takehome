import { Author } from '@prisma/client';
import { createRoutes } from '../../core/base.routes';
import AuthorController from './author.controller';
import { CreateAuthorDTO, UpdateAuthorDTO } from './author.types';

export const authorRoutes  = createRoutes<Author, CreateAuthorDTO, UpdateAuthorDTO>('authors', AuthorController);
