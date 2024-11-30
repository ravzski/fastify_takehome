import { FastifyInstance } from 'fastify';
import { Author } from '@prisma/client';
import { MockContext, Context, createMockContext } from '../../core/tests/context';
import { mockReply, createMockRequest } from '../../core/tests/utils';
import AuthorController from './author.controller';
import { CreateAuthorDTO, UpdateAuthorDTO } from './author.types';

describe('AuthorController', () => {
  let mockCtx: MockContext;
  let ctx: Context;
  let authorController: AuthorController;
  let mockFastify: FastifyInstance;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockFastify = { prisma: mockCtx.prisma } as unknown as FastifyInstance;
    authorController = new AuthorController(mockFastify);
    jest.clearAllMocks();
  });

  const mockAuthor: Author = {
    id: 1,
    name: 'Test Author'
  };

  describe('findAll', () => {
    it('should return all authors', async () => {
      const expectedAuthors = [mockAuthor];
      mockCtx.prisma.author.findMany.mockResolvedValue(expectedAuthors);

      const result = await authorController.findAll(createMockRequest(), mockReply);
      expect(result).toEqual(expectedAuthors);
      expect(mockCtx.prisma.author.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an author by id', async () => {
      mockCtx.prisma.author.findUnique.mockResolvedValue(mockAuthor);
      const result = await authorController.findOne(createMockRequest({ id: '1' }), mockReply);
      expect(result).toEqual(mockAuthor);
    });

    it('should return 404 if not found', async () => {
      mockCtx.prisma.author.findUnique.mockResolvedValue(null);
      await authorController.findOne(createMockRequest({ id: '999' }), mockReply);
      expect(mockReply.code).toHaveBeenCalledWith(404);
    });
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const dto: CreateAuthorDTO = { name: 'Test Author' };
      mockCtx.prisma.author.create.mockResolvedValue(mockAuthor);

      const result = await authorController.create(createMockRequest(undefined, dto), mockReply);
      expect(result).toEqual(mockAuthor);
    });
  });

  describe('update', () => {
    const updateDTO: UpdateAuthorDTO = { name: 'Updated Author' };

    it('should update an author', async () => {
      mockCtx.prisma.author.update.mockResolvedValue({ ...mockAuthor, name: 'Updated Author' });
      const result = await authorController.update(createMockRequest({ id: '1' }, updateDTO), mockReply);
      expect(result.name).toBe('Updated Author');
    });

    it('should return 404 if not found', async () => {
      mockCtx.prisma.author.update.mockResolvedValue(null as unknown as Author);
      await authorController.update(createMockRequest({ id: '999' }, updateDTO), mockReply);
      expect(mockReply.code).toHaveBeenCalledWith(404);
    });
  });

  describe('delete', () => {
    it('should delete and return 204', async () => {
      mockCtx.prisma.author.delete.mockResolvedValue(mockAuthor);
      await authorController.delete(createMockRequest({ id: '1' }), mockReply);
      expect(mockCtx.prisma.author.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockReply.code).toHaveBeenCalledWith(204);
    });
  });
});