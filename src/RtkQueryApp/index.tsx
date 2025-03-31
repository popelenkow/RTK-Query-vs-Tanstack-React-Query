import { FC } from 'react';
import { Provider } from 'react-redux';
import { apiStore } from './api/api';
import { Users } from './Users';

export const App: FC = () => {
  return (
    <Provider store={apiStore}>
      <Users />
    </Provider>
  );
};
