import { useSetUser } from '@app/features/user/providers/UserProvider';

import { AuthAPI } from '../api/AuthAPI';

export function useLogout() {
  const setUser = useSetUser();

  async function logoutUser() {
    try {
      const result = await AuthAPI.logout();

      if (result === 'SUCCESS') setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return logoutUser;
}
