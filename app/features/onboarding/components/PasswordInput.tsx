import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

import { useToggle } from '@core/hooks/useToggle';

import { InputWithLabel } from '@ui/components/InputWithLabel';
import { theme } from '@ui/theme';

interface Props {
  onChangeText: ComponentProps<typeof InputWithLabel>['onChangeText'];
  optional?: boolean;
}

export function PasswordInput({ onChangeText, optional, ...props }: Props) {
  const [hidden, toggleHidden] = useToggle(true);

  return (
    <InputWithLabel
      {...props}
      onChangeText={onChangeText}
      placeholder="Enter password"
      label={`Password${optional ? ' (optional)' : ''}`}
      secureTextEntry={hidden}
      autoCapitalize="none"
      RightAccessory={() => (
        <TouchableOpacity onPress={toggleHidden}>
          <Feather name={`eye${hidden ? '' : '-off'}`} size={20} color={theme.icon.primaryColour} />
        </TouchableOpacity>
      )}
    />
  );
}
