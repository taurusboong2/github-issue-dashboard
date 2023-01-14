import { useEffect, useState } from 'react';

import { RepositoryListRequestParams, RepositoryItem } from '@/types/repository';
import { fetchRepositories } from '@/networks/repository';

export const useFetchRepositories = (params: RepositoryListRequestParams) => {
  const [items, setItems] = useState<RepositoryItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { q, page, per_page } = params;

  useEffect(() => {
    if (q && !isLoading) {
      (async () => {
        setIsLoading(true);

        const { data } = await fetchRepositories({
          q,
          page,
          per_page,
        });

        setItems(data.items);
        setTotal(data.total_count);

        setIsLoading(false);
      })();
    }
  }, [q, page, per_page]);

  const reset = () => {
    setItems([]);
    setTotal(0);
  };

  return {
    items,
    total,
    isLoading,
    reset,
  };
};
