import { useLogout } from '@feature/auth/hooks/useLogout';

import { Button } from '@ui/components/Button';
import { Screen } from '@ui/components/Screen';

export function AccountScreen() {
  const logout = useLogout();

  return (
    <Screen>
      <Button label="Logout" onPress={logout} />
    </Screen>
  );
}

export const AccountScreenName = 'AccountScreen' as const;
