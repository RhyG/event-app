import { useSetUser } from '@app/features/user/providers/UserProvider';

import { signup } from '../../../services/AuthService';

export function useSignupUser() {
  const setUser = useSetUser();

  async function signupUser() {
    const data = await signup();

    setUser(data.user);
  }

  return signupUser;
}
