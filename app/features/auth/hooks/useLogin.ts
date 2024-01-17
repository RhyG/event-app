import { useSetUser } from '@app/features/user';

import { login } from '../services/AuthService';

export function useLogin() {
  const setUser = useSetUser();

  async function loginUser() {
    try {
      const data = await login();

      if (data.user) setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  return loginUser;
}
