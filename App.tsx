import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { QueryClientProvider } from '@app/core/providers/QueryClientProvider';

import { UserProvider } from '@feature/user/context/UserContext';

import { AppNavigator } from './app/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
