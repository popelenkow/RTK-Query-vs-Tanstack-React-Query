import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export type QueryNotFoundProps = {
  error: unknown;
};
export const QueryNotFound: FC<QueryNotFoundProps> = () => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100%'
    >
      <ErrorOutlineIcon color='warning' fontSize='large' />
      <Typography color='warning'>Not found</Typography>
    </Stack>
  );
};
