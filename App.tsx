import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { AuthProvider } from '@app/features/auth/providers/AuthProvider';

import { AppNavigator } from './app/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
