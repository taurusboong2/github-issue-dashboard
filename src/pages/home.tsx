import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Table, TablePaginationConfig, message } from 'antd';

import { useFetchRepositories } from '@/hooks/repository.hook';
import { getItem, removeItem, setItem } from '@/commons/localStorage';
import { RepositoryItem } from '@/types/repository';
import { Box, InputSearch, SimpleUser } from '@/components/common';
import { IconRepository } from '@/components/icons';

const Home = () => {
  const [currentParams, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [msg, contextHolder] = message.useMessage();

  const q = String(currentParams.get('q') ?? '');
  const page = Number(currentParams.get('page') ?? 1);
  const per_page = Number(currentParams.get('per_page') ?? 20);
  const queryParams = { q, page, per_page };

  const [favoriteRepositories, setFavoriteRepositories] = useState<any[]>([]);

  const { total, items: searchedItems, isLoading } = useFetchRepositories({ q, page, per_page });

  function handleSearchRepositories(value: string) {
    setParams({ q: value });
  }

  function handleResetButton() {
    setParams({});
  }

  function handleFavoriteButton(id: any, info: any) {
    if (favoriteRepositories.length >= 4) {
      if (getItem(id)) {
        removeItem(id);
        setFavoriteRepositories([...favoriteRepositories].filter(e => e !== id));
        return;
      }
      msg.open({
        type: 'error',
        content: 'You cannot save more than 4.',
      });
      return;
    }
    if (getItem(id)) {
      removeItem(id);
      setFavoriteRepositories([...favoriteRepositories].filter(e => e !== id));
      return;
    }
    setItem(id, info);
    setFavoriteRepositories([...favoriteRepositories, id]);
  }

  function handleGoToIssuePage(id: string) {
    navigate(`/issues?id=${id}`);
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
              render: (_name: string, items: RepositoryItem) => (
                <>
                  <SimpleUser userName={items.owner.login} size="30px" userImg={items.owner.avatar_url} />
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
              render: (name: string, items: RepositoryItem) => (
                <Box>
                  <a href={`https://github.com/${items.full_name}`} target="_blank" rel="noreferrer">
                    <IconRepository />
                  </a>
                </Box>
              ),
            },
            {
              dataIndex: 'id',
              title: 'Add Favorite',
              render: (id: any, items: RepositoryItem) => (
                <Button
                  type="primary"
                  danger={getItem(id) ? true : false}
                  onClick={() => {
                    handleFavoriteButton(id, JSON.stringify({ items }));
                  }}>
                  {getItem(id) ? 'Delete' : 'Add'}
                </Button>
              ),
            },
            {
              dataIndex: 'id',
              title: 'See Issues',
              render: (id: any) => getItem(id) && <Button onClick={() => handleGoToIssuePage(id)}>Go</Button>,
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
