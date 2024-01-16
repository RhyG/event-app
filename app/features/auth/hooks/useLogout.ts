import { logout } from '../lib/logout';
import { useSetUser } from '../providers/AuthProvider';

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
