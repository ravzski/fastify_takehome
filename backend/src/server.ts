import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma'
import cors from '@fastify/cors'
import { bookRoutes } from './modules/book/book.routes';
import { authorRoutes } from './modules/author/author.routes';

const server = Fastify({
  logger: true
});

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
});

server.register(prismaPlugin);
server.register(bookRoutes, { prefix: '/api' });
server.register(authorRoutes, { prefix: '/api' });

server.get('/health', async (request, reply) => {
  try {
    await server.prisma.$queryRaw`SELECT 1`;
    return { status: 'ok', db: 'connected' };
  } catch (error) {
    return reply.status(500).send({ status: 'error', db: 'disconnected' });
  }
});

const start = async () => {
  try {
    await server.listen({
      port: 3000,
      host: '0.0.0.0'
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();