import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { QueryError } from '../common/QueryError';
import { QueryNotFound } from '../common/QueryNotFound';
import { QueryPending } from '../common/QueryPending';
import { api } from './api/endpoints';

export type UserDetailsProps = {
  userId: number;
  close?: () => void;
};
export const UserDetails: FC<UserDetailsProps> = (props) => {
  const { userId, close } = props;
  const user = api.useGetUserQuery(userId);

  const renderContent = () => {
    if (user.isError) {
      if ('status' in user.error && user.error.status === 404) {
        return <QueryNotFound error={user.error} />;
      }
      return <QueryError error={user.error} />;
    }
    if (user.isFetching) {
      return <QueryPending />;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { info, roles } = user.data!;
    return (
      <Stack gap={2}>
        <Stack direction='row' gap={2} alignItems='center'>
          <Typography
            px={2}
            sx={{
              bgcolor: 'text.secondary',
              color: 'info.contrastText',
            }}
          >
            {info.id}
          </Typography>
          <Typography width='100%'>{info.name}</Typography>
          <Typography
            px={2}
            width='fit-content'
            sx={{
              bgcolor: 'text.secondary',
              color: 'info.contrastText',
            }}
          >
            {info.type}
          </Typography>
        </Stack>
        <Stack direction='column' gap={2}>
          <Typography>{info.email}</Typography>
          <Typography>{info.phone}</Typography>
        </Stack>
        <Stack direction='row' gap={2}>
          {roles.map((role) => (
            <Typography
              key={role}
              px={2}
              sx={{
                bgcolor: 'primary.main',
                color: 'background.paper',
              }}
            >
              {role}
            </Typography>
          ))}
        </Stack>
      </Stack>
    );
  };

  return (
    <Dialog open onClose={close} scroll='body'>
      <DialogTitle>User</DialogTitle>
      <DialogContent
        sx={{
          width: '340px',
        }}
      >
        {renderContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
