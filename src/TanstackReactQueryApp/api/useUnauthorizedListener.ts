import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { routeLinks } from '../../routes';
import { queryClient } from './api';
import { ApiError } from './request';

export const useUnauthorizedListener = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      const { state } = event.query;
      if (
        event.type === 'observerResultsUpdated' &&
        state.status === 'error' &&
        state.error instanceof ApiError &&
        state.error.status === 401
      ) {
        navigate(routeLinks.login);
      }
    });

    return () => unsubscribe();
  }, [navigate]);
};
