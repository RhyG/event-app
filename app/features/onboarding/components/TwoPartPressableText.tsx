import { TouchableOpacity } from 'react-native';

import { Text } from '@ui/components/Text';
import { HBox } from '@ui/components/layout/Box';

type Props = {
  texts: [string, string];
  onPress: () => void;
};

export function TwoPartPressableText({ texts, onPress }: Props) {
  const [first, second] = texts;

  return (
    <HBox justifyContent="center" mb="medium">
      <Text size="xs">{first} </Text>
      <TouchableOpacity onPress={onPress} style={{ borderBottomWidth: 1 }}>
        <Text size="xs">{second}</Text>
      </TouchableOpacity>
    </HBox>
  );
}
