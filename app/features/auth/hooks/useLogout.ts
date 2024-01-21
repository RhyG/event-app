import { useSetUser } from '@app/features/user/providers/UserProvider';

import { logout } from '../services/AuthService';

export function useLogout() {
  const setUser = useSetUser();

  async function logoutUser() {
    try {
      const result = await logout();

      if (result === 'SUCCESS') setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return logoutUser;
}
