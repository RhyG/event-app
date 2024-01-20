import { Feather } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

import { useHomeHeader } from '../hooks/useHomeHeader';
import { PreviousEventsSection } from './components/PreviousEventsSection';

function JoinEventButton({ onPress }: { onPress: () => void }) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.eventActionButton, styles.joinEventButton]}>
      <Feather name="user-plus" size={18} />
      <Text>Join event</Text>
    </TouchableOpacity>
  );
}

function CreateEventButton({ onPress }: { onPress: () => void }) {
  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.eventActionButton, styles.createEventButton]}>
      <Feather name="plus" size={18} color="white" />
      <Text colour={theme.colours.palette.white}>Create event</Text>
    </TouchableOpacity>
  );
}

export function HomeScreen({ navigation }: ScreenProp<'HomeScreen'>) {
  const { styles } = useThemedStyles(stylesFn);

  useHomeHeader();

  return (
    <Screen>
      <View style={styles.actionButtonsContainer}>
        <JoinEventButton onPress={() => navigation.navigate('JoinEventScreen')} />
        <CreateEventButton onPress={() => navigation.navigate('CreateEventScreen')} />
      </View>

      <PreviousEventsSection />
    </Screen>
  );
}

function stylesFn(theme: Theme) {
  return StyleSheet.create({
    actionButtonsContainer: { flexDirection: 'row', marginVertical: 20, gap: 10 },
    eventActionButton: {
      borderRadius: theme.button.borderRadius,
      ...theme.layout.fullyCentred,
      flexDirection: 'row',
      gap: 5,
      paddingVertical: theme.spacing.extraSmall,
      flex: 1,
    },
    joinEventButton: { borderWidth: 1, borderColor: theme.colours.palette.grey['200'] },
    createEventButton: { backgroundColor: theme.colours.palette.sky['500'] },
  });
}
