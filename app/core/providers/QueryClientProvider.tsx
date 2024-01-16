import { QueryClient, QueryClientProvider as _QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

// Create a client
const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  return <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>;
}
