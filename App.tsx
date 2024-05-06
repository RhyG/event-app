import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { QueryClientProvider } from '@app/core/providers/QueryClientProvider';

import { UserProvider } from '@core/domains/user/context/UserContext';
import '@core/lib/polyfills';
import { ToastProvider } from '@core/providers/ToastProvider';

import { Toast } from '@ui/components/Toast';

import './app/i18n/i18n';
import { AppNavigator } from './app/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ToastProvider>
          <BottomSheetModalProvider>
            <QueryClientProvider>
              <UserProvider>
                <AppNavigator />
                <Toast />
              </UserProvider>
            </QueryClientProvider>
          </BottomSheetModalProvider>
        </ToastProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
