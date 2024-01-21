import { TextInputProps, View, ViewStyle } from 'react-native';

import { Input } from './Input';
import { Text } from './Text';

interface InputWithLabelProps extends TextInputProps {
  label: string;
  inputStyle?: ViewStyle;
}

export function InputWithLabel({ label, placeholder, inputStyle, ...rest }: InputWithLabelProps) {
  return (
    <View>
      <Text preset="formLabel" style={marginBottom}>
        {label}
      </Text>
      <Input placeholder={placeholder} inputStyle={inputStyle} {...rest} />
    </View>
  );
}

const marginBottom = { marginBottom: 5 };
