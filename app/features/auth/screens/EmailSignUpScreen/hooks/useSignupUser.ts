import { useSetUser } from '@app/features/user/providers/UserProvider';

import { AuthAPI } from '../../../api/AuthAPI';

export function useSignupUser() {
  const setUser = useSetUser();

  async function signupUser() {
    const data = await AuthAPI.createAccount();

    setUser(data.user);
  }

  return signupUser;
}
