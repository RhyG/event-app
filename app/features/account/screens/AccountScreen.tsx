import { useSetUser } from '@core/context/UserContext';
import { logoutUser } from '@core/domains/auth/services/AuthService';

import { Button } from '@ui/components/Button';
import { Screen } from '@ui/components/Screen';

function useLogout() {
  const setUser = useSetUser();

  return () => logoutUser(() => setUser(null));
}

export function AccountScreen() {
  const logout = useLogout();

  return (
    <Screen>
      <Button label="Logout" onPress={logout} />
    </Screen>
  );
}

export const AccountScreenName = 'AccountScreen' as const;
