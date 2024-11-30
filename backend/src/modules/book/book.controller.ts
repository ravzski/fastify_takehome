import { FastifyInstance } from "fastify";
import { z } from "zod";
import { Book } from "@prisma/client";
import { BaseController } from "../../core/base.controller";
import { BookService } from "./book.service";
import { CreateBookDTO, UpdateBookDTO } from "./book.types";

const createBookSchema = z.object({
  title: z.string(),
  authorId: z.number()
});

const updateBookSchema = z.object({
  title: z.string().optional(),
  authorId: z.number().optional()
});

export default class BookController extends BaseController<Book, CreateBookDTO, UpdateBookDTO> {
  constructor(fastify: FastifyInstance) {
    super(
      new BookService(fastify.prisma),
      createBookSchema,
      updateBookSchema
    );
  }
}
