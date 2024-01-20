import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

import { useHomeHeader } from '../hooks/useHomeHeader';
import { PreviousEventsSection } from './components/PreviousEventsSection';

function CreateEventButton({ onPress }: { onPress: () => void }) {
  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity onPress={onPress} style={styles.createEventButton}>
      <Text weight="semiBold" colour={theme.colours.palette.white}>
        Create new event
      </Text>
    </TouchableOpacity>
  );
}

export function HomeScreen({ navigation }: ScreenProp<'HomeScreen'>) {
  useHomeHeader();

  return (
    <Screen>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <CreateEventButton onPress={() => navigation.navigate('CreateEventScreen')} />
        <CreateEventButton onPress={() => navigation.navigate('CreateEventScreen')} />
      </View>

      <PreviousEventsSection />
    </Screen>
  );
}

function stylesFn(theme: Theme) {
  return StyleSheet.create({
    createEventButton: {
      borderRadius: theme.button.borderRadius,
      backgroundColor: theme.colours.palette.sky['500'],
      ...theme.layout.fullyCentred,
      paddingVertical: theme.spacing.small,
    },
  });
}
