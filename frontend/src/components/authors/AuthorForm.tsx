import React from 'react';
import { Author } from '../../types/models';
import { Button } from '../ui/Button';

type AuthorFormProps = {
  onSubmit: (data: Omit<Author, 'id'>) => void;
  initialData?: Author;
  isLoading?: boolean;
}

export function AuthorForm({ onSubmit, initialData, isLoading }: AuthorFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    onSubmit({ name });
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Author Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={initialData?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <Button type="submit" isLoading={isLoading}>
        {initialData ? 'Update Author' : 'Create Author'}
      </Button>
    </form>
  );
}
