import { useSetUser } from '@core/providers/UserProvider';

import { signup } from '../../../services/AuthService';

export function useCreateUser() {
  const setUser = useSetUser();

  async function createUser() {
    const data = await signup();

    setUser(data.user);
  }

  return createUser;
}
