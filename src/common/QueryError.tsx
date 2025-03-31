import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export type QueryErrorProps = {
  error?: unknown;
};
export const QueryError: FC<QueryErrorProps> = (props) => {
  const { error } = props;
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100%'
    >
      <ReportGmailerrorredIcon color='error' fontSize='large' />
      <Typography color='error'>Unexpected error</Typography>
      {error ? <Typography color='error'>{String(error)}</Typography> : null}
    </Stack>
  );
};
