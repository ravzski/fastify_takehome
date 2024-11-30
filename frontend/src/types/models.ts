export interface Author {
  id: number;
  name: string;
  books?: Book[];
}

export interface Book {
  id: number;
  title: string;
  authorId: number;
  author?: Author;
}