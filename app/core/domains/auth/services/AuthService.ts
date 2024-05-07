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

export async function logoutUser(onSuccess: () => void) {
  try {
    const result = await AuthAPI.logout();

    if (result === 'SUCCESS') onSuccess();
  } catch (error) {
    console.error(error);
  }
}
