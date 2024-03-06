import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

import { useToggle } from '@core/hooks/useToggle';

import { Icon } from '@ui/components/Icon';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { theme } from '@ui/theme';

type Props = {
  onChangeText: ComponentProps<typeof InputWithLabel>['onChangeText'];
  optional?: boolean;
} & Partial<ComponentProps<typeof InputWithLabel>>;

export function PasswordInput({ onChangeText, optional, label, placeholder, ...props }: Props) {
  const [hidden, toggleHidden] = useToggle(true);

  return (
    <InputWithLabel
      {...props}
      onChangeText={onChangeText}
      placeholder={placeholder ?? 'Enter password'}
      label={label ?? `Password${optional ? ' (optional)' : ''}`}
      secureTextEntry={hidden}
      autoCapitalize="none"
      RightAccessory={() => (
        <TouchableOpacity onPress={toggleHidden}>
          <Icon family="Feather" name={`eye${hidden ? '' : '-off'}`} size={20} color={theme.icon.primaryColour} />
        </TouchableOpacity>
      )}
    />
  );
}
