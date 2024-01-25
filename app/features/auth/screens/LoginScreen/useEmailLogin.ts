import { useEmailForm } from '@feature/auth/hooks/useEmailForm';

import { useLogin } from '../../hooks/useLogin';

export function useEmailLogin() {
  const { email, password, changeDetails } = useEmailForm();

  const loginUser = useLogin();

  function login() {
    if (email.length === 0 || password.length === 0) {
      return;
    }

    loginUser(email, password);
  }

  return { changeDetails, login };
}
