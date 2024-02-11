import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { Button } from '@ui/components/Button';
import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { HBox } from '@ui/components/layout/Box';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useHomeHeader } from '../hooks/useHomeHeader';
import { PreviousEventsSection } from './components/PreviousEventsSection';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';

function JoinEventButton({ onPress }: { onPress: () => void }) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <Button onPress={onPress} preset="secondary" style={styles.eventActionButton} LeftAccessory={() => <Feather name="user-plus" size={18} />}>
      <Text>Join event</Text>
    </Button>
  );
}

function CreateEventButton({ onPress }: { onPress: () => void }) {
  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <Button onPress={onPress} style={styles.eventActionButton} LeftAccessory={() => <Feather name="plus" size={18} color="white" />}>
      <Text colour={theme.colours.palette.white}>Create event</Text>
    </Button>
  );
}

export function HomeScreen({ navigation }: ScreenProp<'HomeScreen'>) {
  useHomeHeader();

  return (
    <Screen>
      <HBox mv="base" gap="small">
        <JoinEventButton onPress={() => navigation.navigate(Screens.JoinEventScreen)} />
        <CreateEventButton onPress={() => navigation.navigate(Screens.CreateEventScreen)} />
      </HBox>

      <UpcomingEventsSection />
      <PreviousEventsSection />
    </Screen>
  );
}

function stylesFn() {
  return StyleSheet.create({
    eventActionButton: {
      flex: 1,
    },
  });
}
