import { useRef } from 'react';

import { useLogin } from '../../hooks/useLogin';

interface EmailLoginDetails {
  email: string;
  password: string;
}

export function useEmailLogin() {
  // Using a ref because the UI doesn't depend on these details, and inputs internally handle their values.
  const loginDetails = useRef<EmailLoginDetails>({
    email: '',
    password: '',
  });

  const loginUser = useLogin();

  function changeLoginDetails(key: keyof EmailLoginDetails, value: string) {
    loginDetails.current = { ...loginDetails.current, [key]: value };
  }

  function login() {
    const { email, password } = loginDetails.current;

    if (email.length === 0 || password.length === 0) {
      return;
    }

    loginUser(email, password);
  }

  return { changeLoginDetails, login };
}
