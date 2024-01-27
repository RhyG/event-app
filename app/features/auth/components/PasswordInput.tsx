import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

import { useToggle } from '@core/hooks/useToggle';

import { InputWithLabel } from '@ui/components/InputWithLabel';

interface Props {
  onChangeText: ComponentProps<typeof InputWithLabel>['onChangeText'];
}

export function PasswordInput({ onChangeText, ...props }: Props) {
  const [hidden, toggleHidden] = useToggle(true);

  return (
    <InputWithLabel
      {...props}
      onChangeText={onChangeText}
      placeholder="Enter password"
      label="Password"
      secureTextEntry={hidden}
      autoCapitalize="none"
      RightAccessory={() => (
        <TouchableOpacity onPress={toggleHidden}>
          <Feather name={`eye${hidden ? '' : '-off'}`} size={20} color="black" />
        </TouchableOpacity>
      )}
    />
  );
}