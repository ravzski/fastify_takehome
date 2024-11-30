import { Author, PrismaClient } from '@prisma/client';
import BaseService from '../../core/base.service';
import { CreateAuthorDTO, UpdateAuthorDTO } from './author.types';

export class AuthorService extends BaseService<Author, CreateAuthorDTO, UpdateAuthorDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'author');
  }

  protected defaultIncludes() {
    return { books: true };
  }
}