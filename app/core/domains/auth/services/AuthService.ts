import { User } from '@core/domains/user/types';

import { AuthAPI } from '../api/AuthAPI';

export async function loginUser({ email, password, onSuccess }: { email: string; password: string; onSuccess: (user: User) => void }) {
  try {
    const data = await AuthAPI.login(email, password);
    if (data.user) onSuccess(data.user);
  } catch (error) {
    // TODO: Something with failed login
    console.log(error);
  }
}
