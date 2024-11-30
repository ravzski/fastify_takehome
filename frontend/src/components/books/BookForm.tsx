import React from 'react';
import { Book, Author } from '../../types/models';
import { Button } from '../ui/Button';

type BookFormProps = {
  onSubmit: (data: Omit<Book, 'id'>) => void;
  authors: Author[];
  initialData?: Book | null;
  isLoading?: boolean;
}

export function BookForm({ onSubmit, authors, initialData, isLoading }: BookFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const authorId = parseInt((form.elements.namedItem('authorId') as HTMLSelectElement).value);
    onSubmit({ title, authorId });
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Book Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={initialData?.title}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="authorId" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <select
          name="authorId"
          id="authorId"
          defaultValue={initialData?.authorId}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select an author</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" isLoading={isLoading}>
        {initialData ? 'Update Book' : 'Create Book'}
      </Button>
    </form>
  );
}