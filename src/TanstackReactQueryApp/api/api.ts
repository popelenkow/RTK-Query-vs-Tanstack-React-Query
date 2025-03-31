import { QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const useUn = () => {
  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      console.log('Event queryCache:', event);
    });

    return () => unsubscribe();
  }, []);
}
