import { FastifyInstance } from "fastify";
import { z } from "zod";
import { Author } from "@prisma/client";
import { BaseController } from "../../core/base.controller";
import { CreateAuthorDTO, UpdateAuthorDTO } from "./author.types";
import { AuthorService } from "./author.service";

const createAuthorSchema = z.object({
  name: z.string()
});

const updateAuthorSchema = z.object({
  name: z.string().optional()
});

export default class AuthorController extends BaseController<Author, CreateAuthorDTO, UpdateAuthorDTO> {
  constructor(fastify: FastifyInstance) {
    super(
      new AuthorService(fastify.prisma),
      createAuthorSchema,
      updateAuthorSchema
    );
  }
}