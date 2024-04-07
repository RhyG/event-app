import { ComponentProps } from 'react';
import { ActivityIndicator } from 'react-native';

import { Button } from './Button';

interface Props extends ComponentProps<typeof Button> {
  loading: boolean;
}

export function ButtonWithLoading({ loading, label, ...buttonProps }: Props) {
  const preset = loading ? 'disabled' : 'primary';
  return (
    <Button {...buttonProps} preset={preset}>
      {loading ? <ActivityIndicator size={24} color={'white'} /> : label}
    </Button>
  );
}
