import { useEffect, useState } from 'react';

import { IssuesItem } from '@/types/issue';
import { FavoriteRepository } from '@/types/repository';
import { fetchIssues } from '@/networks/issue';
import { FAVORITE_ITEM_LOCALSTORAGE_KEY } from '@/constants';
import { getItem } from '@/commons/localStorage';

export const useFetchIssues = (targetId?: number) => {
  const [items, setItems] = useState<IssuesItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotFoundError, setIsNotFoundError] = useState<boolean>(false);

  useEffect(() => {
    if (targetId && !isLoading) {
      (async () => {
        setIsLoading(true);
        const favoriteRepositoriesString = getItem(FAVORITE_ITEM_LOCALSTORAGE_KEY);

        const saved = favoriteRepositoriesString
          ? (JSON.parse(favoriteRepositoriesString) as FavoriteRepository[])
          : [];

        const repository = saved.find(({ id }) => targetId === id);

        if (!repository) {
          setIsNotFoundError(true);
          return;
        }

        const { data } = await fetchIssues(repository.fullName);

        setItems(data);
        setTotal(data.length);

        setIsLoading(false);
      })();
    }
  }, [targetId]);

  return {
    items,
    total,
    isLoading,
    isNotFoundError,
  };
};
