import React from 'react';
import { Book } from '../../types/models';
import { Button } from '../ui/Button';

type BookListProps = {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export function BookList({ books, onEdit, onDelete, isLoading }: BookListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map(book => (
            <tr key={book.id}>
              <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.author?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  variant="secondary"
                  onClick={() => onEdit(book)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onDelete(book.id)}
                  isLoading={isLoading}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}