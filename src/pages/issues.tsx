import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Table, message } from 'antd';

import { useFetchIssues } from '@/hooks/issue.hook';
import { useFavoriteRepository } from '@/hooks/repository.hook';
import { useRedirectHome } from '@/hooks/common.hook';
import { IssuesItem } from '@/types/issue';
import { Box } from '@/components/common';

const Issues = () => {
  const [searchParams] = useSearchParams();
  const id = String(searchParams.get('id'));

  const [msg, contextHolder] = message.useMessage();
  const redirectHome = useRedirectHome();

  const { items, isLoading, total, isNotFoundError } = useFetchIssues(parseInt(id));
  const favoriteRepository = useFavoriteRepository(parseInt(id));

  useEffect(() => {
    if (isNotFoundError) {
      msg.open({
        type: 'error',
        content: 'Not found repository!',
      });

      redirectHome(3000);
    }
  }, [isNotFoundError]);

  if (!favoriteRepository) {
    return <>{contextHolder}</>;
  }
  return (
    <Container>
      <h1>Issues Page</h1>

      <h3>{favoriteRepository.name}</h3>

      <Box mt="30px">
        <Table
          size="middle"
          rowKey="id"
          dataSource={items}
          loading={isLoading}
          columns={[
            {
              dataIndex: 'title',
              title: 'Issue Title',
              width: 500,
              render: (title: string, items: IssuesItem) => (
                <a href={items.html_url} target="_blank" rel="noreferrer">
                  {title}
                </a>
              ),
            },
          ]}
          pagination={{
            size: 'default',
            showSizeChanger: true,
            total,
            showTotal: total => `Total ${total} issues`,
          }}
        />
      </Box>
    </Container>
  );
};

export default Issues;

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
  h3 {
    font-size: 1.4rem;
  }
`;
