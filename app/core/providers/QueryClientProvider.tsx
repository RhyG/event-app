import { QueryClient, QueryClientProvider as _QueryClientProvider, focusManager } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

// Create a client
export const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  useEffect(function manageWindowFocus() {
    const subscription = AppState.addEventListener('change', function onAppStateChange(status: AppStateStatus) {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    });

    return () => subscription.remove();
  }, []);

  return <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>;
}
