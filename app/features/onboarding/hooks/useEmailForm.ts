import { useRef } from 'react';

interface EmailAuthDetails {
  email: string;
  password: string;
}

/**
 * Non-reactive form for email/password forms.
 * TODO: Include validation, errors etc.
 */
export function useEmailForm() {
  const details = useRef<EmailAuthDetails>({
    email: '',
    password: '',
  });

  function changeDetails(key: keyof EmailAuthDetails, value: string) {
    details.current = { ...details.current, [key]: value };
  }

  return {
    changeDetails,
    getFormValues: () => details.current,
  };
}
