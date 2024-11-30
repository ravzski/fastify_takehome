import { Book } from "@prisma/client";
import { createRoutes } from "../../core/base.routes";
import BookController from "./book.controller";
import { CreateBookDTO, UpdateBookDTO } from "./book.types";

export const bookRoutes  = createRoutes<Book, CreateBookDTO, UpdateBookDTO>('books', BookController);
