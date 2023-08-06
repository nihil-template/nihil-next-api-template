import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '@/store';

interface Props {
  children: React.ReactNode;
}

export const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 600000,
      refetchInterval: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const persistor = persistStore(store);

export function Providers({ children, }: Props) {
  return (
    <QueryClientProvider client={appQueryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
