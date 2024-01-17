import { useSetUser } from '@core/providers/UserProvider';

import { login } from '../lib/login';

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
