import I18n from 'i18n-js';
import { StyleSheet } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { CreateEventScreenName, JoinEventScreenName } from '@feature/events';

import { Button } from '@ui/components/Button';
import { Icon } from '@ui/components/Icon';
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
    <Button onPress={onPress} preset="secondary" style={styles.eventActionButton} LeftAccessory={() => <Icon family="Feather" name="user-plus" size={18} />}>
      <Text>{I18n.t('homeScreen.joinEvent')}</Text>
    </Button>
  );
}

function CreateEventButton({ onPress }: { onPress: () => void }) {
  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <Button onPress={onPress} style={styles.eventActionButton} LeftAccessory={() => <Icon family="Feather" name="plus" size={18} color="white" />}>
      <Text colour={theme.colours.palette.white}>{I18n.t('homeScreen.createEvent')}</Text>
    </Button>
  );
}

export function HomeScreen({ navigation }: ScreenProp<'HomeScreen'>) {
  useHomeHeader();

  return (
    <Screen style={{ flex: 1 }}>
      <HBox mv="base" gap="small">
        <JoinEventButton onPress={() => navigation.navigate(JoinEventScreenName)} />
        <CreateEventButton onPress={() => navigation.navigate(CreateEventScreenName)} />
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

export const HomeScreenName = 'HomeScreen' as const;
