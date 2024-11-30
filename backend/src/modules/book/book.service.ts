import { Book, PrismaClient } from '@prisma/client';
import BaseService from '../../core/base.service';
import { CreateBookDTO, UpdateBookDTO } from './book.types';

export class BookService extends BaseService<Book, CreateBookDTO, UpdateBookDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'book');
  }

  protected defaultIncludes() {
    return { author: true };
  }
}
