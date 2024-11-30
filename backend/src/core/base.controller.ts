import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

interface BaseService<T, CreateDTO, UpdateDTO> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(data: CreateDTO): Promise<T>;
  update(id: number, data: UpdateDTO): Promise<T | null>;
  delete(id: number): Promise<void>;
}

export abstract class BaseController<T, CreateDTO, UpdateDTO> {
  protected service: BaseService<T, CreateDTO, UpdateDTO>;
  protected createSchema: z.ZodType<CreateDTO>;
  protected updateSchema: z.ZodType<UpdateDTO>;

  constructor(
    service: BaseService<T, CreateDTO, UpdateDTO>,
    createSchema: z.ZodType<CreateDTO>,
    updateSchema: z.ZodType<UpdateDTO>
  ) {
    this.service = service;
    this.createSchema = createSchema;
    this.updateSchema = updateSchema;
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const items = await this.service.findAll();
    return items;
  }

  async findOne(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = parseInt(request.params.id);
    const item = await this.service.findOne(id);
    if (!item) return reply.code(404).send();
    return item;
  }

  async create(request: FastifyRequest<{ Body: CreateDTO }>, reply: FastifyReply) {
    const data = this.createSchema.parse(request.body);
    const item = await this.service.create(data);
    return item;
  }

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateDTO }>,
    reply: FastifyReply
  ) {
    const id = parseInt(request.params.id);
    const data = this.updateSchema.parse(request.body);
    const item = await this.service.update(id, data);
    if (!item) return reply.code(404).send();
    return item;
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = parseInt(request.params.id);
    await this.service.delete(id);
    return reply.code(204).send();
  }
}