import { Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { CreateUserCard } from '../common/CreateUserCard';
import { QueryError } from '../common/QueryError';
import { QueryPending } from '../common/QueryPending';
import { UsersLayout } from '../common/UsersLayout';
import { api } from './api/endpoints';
import { UserDetails } from './Details';
import { UserCard } from './UserCard';

export const Users: FC = () => {
  const users = api.useGetUserListQuery();
  const [add, addResult] = api.useAddUserMutation();
  const [detailsUserId, setDetailsUserId] = useState<number>();

  const renderContent = () => {
    if (users.isError) {
      return <QueryError error={users.error} />;
    }
    if (users.isFetching) {
      return <QueryPending />;
    }
    return (
      <UsersLayout>
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        {users.data!.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDetails={() => setDetailsUserId(user.id)}
          />
        ))}
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        {users.data!.length < 10 && (
          <CreateUserCard
            onClick={() => add()}
            loading={addResult.isLoading}
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
