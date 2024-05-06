import { useSetUser } from '@feature/account';

import { AuthAPI } from '../api/AuthAPI';

export function useLogin() {
  const setUser = useSetUser();

  async function loginUser({ email, password }: { email: string; password: string }) {
    try {
      const data = await AuthAPI.login(email, password);
      if (data.user) setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  return loginUser;
}
