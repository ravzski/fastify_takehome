import { FastifyReply, FastifyRequest } from 'fastify';

export const mockReply = {
  code: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
} as unknown as FastifyReply;

export const createMockRequest = <T extends object>(params?: object, body?: T) => ({
  params,
  body,
} as FastifyRequest<any>);

