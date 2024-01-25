import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { Button } from '@ui/components/Button';
import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useHomeHeader } from '../hooks/useHomeHeader';
import { PreviousEventsSection } from './components/PreviousEventsSection';

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
  const { styles } = useThemedStyles(stylesFn);

  useHomeHeader();

  return (
    <Screen>
      <View style={styles.actionButtonsContainer}>
        <JoinEventButton onPress={() => navigation.navigate(Screens.JoinEventScreen)} />
        <CreateEventButton onPress={() => navigation.navigate(Screens.CreateEventScreen)} />
      </View>

      <PreviousEventsSection />
    </Screen>
  );
}

function stylesFn(theme: Theme) {
  return StyleSheet.create({
    actionButtonsContainer: { flexDirection: 'row', marginVertical: 20, gap: 10 },
    eventActionButton: {
      flex: 1,
    },
    joinEventButton: { borderWidth: 1, borderColor: theme.colours.palette.grey['200'] },
    createEventButton: { backgroundColor: theme.colours.palette.sky['500'] },
  });
}
