import { login } from '../lib/login';
import { useSetUser } from '../providers/AuthProvider';

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
