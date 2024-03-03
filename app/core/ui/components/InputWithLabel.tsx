import { ComponentProps } from 'react';
import { ViewStyle } from 'react-native';

import { theme } from '@ui/theme';

import { Text } from './Text';
import { TextInput } from './TextInput';
import { HBox, VBox } from './layout/Box';

interface InputWithLabelProps extends Omit<ComponentProps<typeof TextInput>, 'hasError'> {
  label: string;
  inputStyle?: ViewStyle;
  error?: string;
}

export function InputWithLabel({ label, placeholder, inputStyle, error, ...rest }: InputWithLabelProps) {
  return (
    <VBox>
      <HBox mb="tiny" justifyContent="space-between">
        <Text preset="formLabel">{label}</Text>
        {error ? (
          <Text size="xs" colour={theme.colours.angry}>
            {error}
          </Text>
        ) : null}
      </HBox>
      <TextInput hasError={error !== undefined} placeholder={placeholder} inputStyle={inputStyle} accessibilityLabel={label} {...rest} />
    </VBox>
  );
}
