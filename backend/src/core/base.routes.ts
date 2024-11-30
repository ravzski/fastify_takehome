import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { BaseController } from './base.controller';

export class RouteBuilder<T, CreateDTO, UpdateDTO> {
  constructor(
    private readonly prefix: string,
    private readonly controller: BaseController<T, CreateDTO, UpdateDTO>
  ) {}

  registerRoutes(fastify: FastifyInstance) {
    fastify.get(
      `/${this.prefix}`,
      this.controller.findAll.bind(this.controller)
    );

    fastify.get(
      `/${this.prefix}/:id`,
      this.controller.findOne.bind(this.controller)
    );

    fastify.post(
      `/${this.prefix}`,
      this.controller.create.bind(this.controller)
    );

    fastify.put(
      `/${this.prefix}/:id`,
      this.controller.update.bind(this.controller)
    );

    fastify.delete(
      `/${this.prefix}/:id`,
      this.controller.delete.bind(this.controller)
    );
  }
}

export const createRoutes = <T, CreateDTO, UpdateDTO>(
  prefix: string,
  ControllerClass: new (fastify: FastifyInstance) => BaseController<T, CreateDTO, UpdateDTO>
): FastifyPluginAsync => {
  return async (fastify) => {
    const controller = new ControllerClass(fastify);
    new RouteBuilder(prefix, controller).registerRoutes(fastify);
  };
};