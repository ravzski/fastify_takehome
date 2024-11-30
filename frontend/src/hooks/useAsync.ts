import { useState } from 'react';

interface UseAsync {
  loading: boolean;
  error: string | null;
  run: <T>(promise: Promise<T>) => Promise<T | undefined>;
}

export function useAsync(): UseAsync {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const run = async <T,>(promise: Promise<T>): Promise<T | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const result = await promise;
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, run };
}