import React from 'react';
import { ApiResponse, ApiError } from '../../types/api';

interface ResponseDisplayProps {
  response: ApiResponse | null;
  error: ApiError | null;
  isLoading: boolean;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  response,
  error,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        <h3 className="font-semibold">Error</h3>
        <p>{error.message}</p>
      </div>
    )
  }

  if (!response) {
    return (
      <div className="text-gray-500 text-center p-4">
        No data to display
      </div>
    )
  }

  return (
    <pre className="bg-gray-50 p-4 rounded overflow-x-auto">
      {JSON.stringify(response, null, 2)}
    </pre>
  )
}