import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Table, TablePaginationConfig, message } from 'antd';

import { useFetchRepositories } from '@/hooks/repository.hook';
import { getItem, setItem } from '@/commons/localStorage';
import { RepositoryItem, FavoriteRepository } from '@/types/repository';
import { Box, InputSearch, SimpleUser } from '@/components/common';
import { IconRepository } from '@/components/icons';
import { MAX_FAVORITE_ITEM_COUNT, FAVORITE_ITEM_LOCALSTORAGE_KEY } from '@/constants';

const Home = () => {
  const [currentParams, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [msg, contextHolder] = message.useMessage();

  const q = String(currentParams.get('q') ?? '');
  const page = Number(currentParams.get('page') ?? 1);
  const per_page = Number(currentParams.get('per_page') ?? 20);
  const queryParams = { q, page, per_page };

  const [favoriteRepositories, setFavoriteRepositories] = useState<FavoriteRepository[]>([]);

  const {
    total,
    items: searchedItems,
    isLoading,
    reset: resetSearchedItems,
  } = useFetchRepositories({ q, page, per_page });

  useEffect(() => {
    const favoriteRepositoriesString = getItem(FAVORITE_ITEM_LOCALSTORAGE_KEY);

    const saved = favoriteRepositoriesString ? (JSON.parse(favoriteRepositoriesString) as FavoriteRepository[]) : [];

    setFavoriteRepositories(saved);
  }, []);

  function handleSearchRepositories(value: string) {
    setParams({ q: value });
  }

  function handleResetButton() {
    setParams({});
    resetSearchedItems();
  }

  function handleAddFavorite(item: RepositoryItem) {
    if (favoriteRepositories.length >= MAX_FAVORITE_ITEM_COUNT) {
      msg.open({
        type: 'error',
        content: 'You cannot save more than 4.',
      });
      return;
    }
    const newFavoriteRepositories = [
      ...favoriteRepositories,
      { id: item.id, name: item.name, fullName: item.full_name },
    ];

    setItem(FAVORITE_ITEM_LOCALSTORAGE_KEY, JSON.stringify(newFavoriteRepositories));
    setFavoriteRepositories(newFavoriteRepositories);
  }

  function handleDeleteFavorite(targetId: number) {
    const newFavoriteRepositories = favoriteRepositories.filter(({ id }) => id !== targetId);

    setItem(FAVORITE_ITEM_LOCALSTORAGE_KEY, JSON.stringify(newFavoriteRepositories));
    setFavoriteRepositories(newFavoriteRepositories);
  }

  function isFavoriteItem(targetId: number) {
    return favoriteRepositories.some(({ id }) => targetId === id);
  }

  return (
    <Container>
      <h1>Search Repositories</h1>
      my-repository-issue
      <Box width="300px" flexDirection="row">
        <InputSearch placeholder="Search Repository" onSearch={handleSearchRepositories} />
        <ResetBox onClick={handleResetButton}>🔄</ResetBox>
      </Box>
      <Box mt="30px">
        <Table
          size="middle"
          rowKey="id"
          dataSource={searchedItems}
          loading={isLoading}
          columns={[
            {
              dataIndex: 'owner',
              title: 'User Name',
              width: 300,
              render: (_name: string, item: RepositoryItem) => (
                <>
                  <SimpleUser userName={item.owner.login} size="30px" userImg={item.owner.avatar_url} />
                </>
              ),
            },
            {
              dataIndex: 'open_issues',
              title: 'Issues',
              width: 80,
            },
            {
              dataIndex: 'full_name',
              title: 'Repository',
              render: (name: string, item: RepositoryItem) => (
                <Box>
                  <a href={`https://github.com/${item.full_name}`} target="_blank" rel="noreferrer">
                    <IconRepository />
                  </a>
                </Box>
              ),
            },
            {
              dataIndex: 'id',
              title: 'Add Favorite',
              render: (id: number, item) =>
                isFavoriteItem(id) ? (
                  <Button
                    type="primary"
                    danger={true}
                    onClick={() => {
                      handleDeleteFavorite(id);
                    }}>
                    Delete
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      handleAddFavorite(item);
                    }}>
                    Add
                  </Button>
                ),
            },
            {
              dataIndex: 'id',
              title: 'See Issues',
              render: (id: number) =>
                isFavoriteItem(id) ? <Button onClick={() => navigate(`/issues?id=${id}`)}>Go</Button> : <></>,
            },
          ]}
          pagination={{
            size: 'default',
            current: page,
            pageSize: per_page,
            total,
            showSizeChanger: true,
            showTotal: total => `Total ${total} repositories`,
          }}
          onChange={(pagination: TablePaginationConfig) => {
            const { current, pageSize } = pagination;
            setParams({ ...queryParams, page: current, per_page: pageSize } as any);
          }}
        />
      </Box>
      {contextHolder}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  max-width: 1200px;
  padding: 50px 0;
  margin: 0 auto;
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const ResetBox = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #eee;
  margin-left: 5px;
  font-size: 30px;
  cursor: pointer;
`;

export default Home;
