import { Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { CreateUserCard } from '../common/CreateUserCard';
import { QueryError } from '../common/QueryError';
import { QueryPending } from '../common/QueryPending';
import { UsersLayout } from '../common/UsersLayout';
import { addUserApi, getUserListApi } from './api/endpoints';
import { UserDetails } from './Details';
import { UserCard } from './UserCard';

export const Users: FC = () => {
  const users = useQuery(getUserListApi());
  const add = useMutation(addUserApi());
  const [detailsUserId, setDetailsUserId] = useState<number>();

  const renderContent = () => {
    if (users.isError) {
      return <QueryError error={users.error} />;
    }
    if (users.isPending) {
      return <QueryPending />;
    }
    return (
      <UsersLayout>
        {users.data.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDetails={() => setDetailsUserId(user.id)}
          />
        ))}
        {users.data.length < 10 && (
          <CreateUserCard
            onClick={() => add.mutate()}
            loading={add.isPending}
          />
        )}
      </UsersLayout>
    );
  };

  return (
    <Stack padding={4} gap={2} height='100dvh'>
      <Typography variant='h4'>Users</Typography>
      {renderContent()}
      {detailsUserId && (
        <UserDetails
          userId={detailsUserId}
          close={() => setDetailsUserId(undefined)}
        />
      )}
    </Stack>
  );
};
