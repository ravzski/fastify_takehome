import { FastifyInstance } from 'fastify';
import { Book } from '@prisma/client';
import { createMockRequest, mockReply } from '../../core/tests/utils';
import BookController from './book.controller';
import { CreateBookDTO, UpdateBookDTO } from './book.types';
import { Context } from 'vm';
import { MockContext, createMockContext } from '../../core/tests/context';

describe('BookController', () => {
  let mockCtx: MockContext;
  let ctx: Context;
  let bookController: BookController;
  let mockFastify: FastifyInstance;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockFastify = { prisma: mockCtx.prisma } as unknown as FastifyInstance;
    bookController = new BookController(mockFastify);
    jest.clearAllMocks();
  });

  const mockBook: Book = {
    id: 1,
    title: 'Test Book',
    authorId: 1
  };

  describe('findAll', () => {
    it('should return all books', async () => {
      const expectedBooks = [mockBook];
      mockCtx.prisma.book.findMany.mockResolvedValue(expectedBooks);

      const result = await bookController.findAll(createMockRequest(), mockReply);
      expect(result).toEqual(expectedBooks);
      expect(mockCtx.prisma.book.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      mockCtx.prisma.book.findUnique.mockResolvedValue(mockBook);
      const result = await bookController.findOne(createMockRequest({ id: '1' }), mockReply);
      expect(result).toEqual(mockBook);
    });

    it('should return 404 if not found', async () => {
      mockCtx.prisma.book.findUnique.mockResolvedValue(null);
      await bookController.findOne(createMockRequest({ id: '999' }), mockReply);
      expect(mockReply.code).toHaveBeenCalledWith(404);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const dto: CreateBookDTO = { title: 'Test Book', authorId: 1 };
      mockCtx.prisma.book.create.mockResolvedValue(mockBook);

      const result = await bookController.create(createMockRequest(undefined, dto), mockReply);
      expect(result).toEqual(mockBook);
    });
  });

  describe('update', () => {
    const updateDTO: UpdateBookDTO = { title: 'Updated Book' };

    it('should update a book', async () => {
      mockCtx.prisma.book.update.mockResolvedValue({ ...mockBook, title: 'Updated Book' });
      const result = await bookController.update(createMockRequest({ id: '1' }, updateDTO), mockReply);
      expect(result.title).toBe('Updated Book');
    });

    it('should return 404 if not found', async () => {
      mockCtx.prisma.book.update.mockResolvedValue(null as unknown as Book);
      await bookController.update(createMockRequest({ id: '999' }, updateDTO), mockReply);
      expect(mockReply.code).toHaveBeenCalledWith(404);
    });
  });

  describe('delete', () => {
    it('should delete and return 204', async () => {
      mockCtx.prisma.book.delete.mockResolvedValue(mockBook);
      await bookController.delete(createMockRequest({ id: '1' }), mockReply);
      expect(mockCtx.prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockReply.code).toHaveBeenCalledWith(204);
    });
  });
});