

import { useEffect } from 'react';
import { BookForm } from './components/books/BookForm';
import { BookList } from './components/books/BookList';
import { AuthorForm } from './components/authors/AuthorForm';
import { CreateBookData, UpdateBookData, useBooks } from './hooks/useBooks';
import { CreateAuthorData, useAuthors } from './hooks/useAuthors';
import { useAsync } from './hooks/useAsync';
import { ErrorAlert } from './components/ui/ErrorAlert';
import { Section } from './components/ui/Section';
import React from 'react';

export default function App(): JSX.Element {
  const { books, selectedBook, setSelectedBook, createBook, updateBook, deleteBook, fetchBooks } = useBooks();
  const { authors, createAuthor, fetchAuthors } = useAuthors();
  const { loading, error, run } = useAsync();

  useEffect(() => {
    void run(Promise.all([fetchBooks(), fetchAuthors()]));
  }, []);

  const handleCreateBook = async (data: CreateBookData): Promise<void> => {
    await run(createBook(data));
  };

  const handleUpdateBook = async (id: number, data: UpdateBookData): Promise<void> => {
    await run(updateBook(id, data));
  };

  const handleDeleteBook = async (id: number): Promise<void> => {
    await run(deleteBook(id));
  };

  const handleCreateAuthor = async (data: CreateAuthorData): Promise<void> => {
    await run(createAuthor(data));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <ErrorAlert message={error} />

          <Section title="Add Author">
            <AuthorForm
              onSubmit={handleCreateAuthor}
              isLoading={loading}
            />
          </Section>

          <Section title={selectedBook ? 'Edit Book' : 'Add Book'}>
            <BookForm
              onSubmit={selectedBook
                ? (data) => handleUpdateBook(selectedBook.id, data)
                : handleCreateBook}
              authors={authors}
              initialData={selectedBook}
              isLoading={loading}
            />
          </Section>

          <Section title="Books">
            <BookList
              books={books}
              onEdit={setSelectedBook}
              onDelete={handleDeleteBook}
              isLoading={loading}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}