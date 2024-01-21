import { useSetUser } from '@app/features/user';

import { login } from '../services/AuthService';

export function useLogin() {
  const setUser = useSetUser();

  async function loginUser(email: string, password: string) {
    try {
      const data = await login(email, password);

      if (data.user) setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  return loginUser;
}
