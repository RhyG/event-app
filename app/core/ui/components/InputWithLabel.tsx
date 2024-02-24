import { ComponentProps } from 'react';
import { View, ViewStyle } from 'react-native';

import { Text } from './Text';
import { TextInput } from './TextInput';

interface InputWithLabelProps extends ComponentProps<typeof TextInput> {
  label: string;
  inputStyle?: ViewStyle;
}

export function InputWithLabel({ label, placeholder, inputStyle, ...rest }: InputWithLabelProps) {
  return (
    <View>
      <Text preset="formLabel" style={marginBottom}>
        {label}
      </Text>
      <TextInput placeholder={placeholder} inputStyle={inputStyle} accessibilityLabel={label} {...rest} />
    </View>
  );
}

const marginBottom = { marginBottom: 5 };
