import I18n from 'i18n-js';
import { StyleSheet } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { CreateEventScreenName, JoinEventScreenName } from '@feature/events';
import { useAllEventsQuery } from '@feature/events/api/useUserEventsQuery';

import { Button } from '@ui/components/Button';
import { Icon } from '@ui/components/Icon';
import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { HBox, VBox } from '@ui/components/layout/Box';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useHomeHeader } from '../hooks/useHomeHeader';
import { PreviousEventsSection } from './components/PreviousEventsSection';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';

function NoEventsView({ navigateToCreateEvent, navigateToJoinEvent }: { navigateToCreateEvent: () => void; navigateToJoinEvent: () => void }) {
  return (
    <VBox ph="base" justifyContent="center" flex={1}>
      <Text align="center" preset="subheading">
        You haven't joined any events yet
      </Text>
      <Text align="center">Join an event or create a new one</Text>
      <CreateEventButton onPress={navigateToCreateEvent} />
      <JoinEventButton onPress={navigateToJoinEvent} />
    </VBox>
  );
}

function JoinEventButton({ onPress }: { onPress: () => void }) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <Button onPress={onPress} preset="secondary" style={styles.eventActionButton} LeftAccessory={() => <Icon family="Feather" name="user-plus" size={18} />}>
      {I18n.t('homeScreen.joinEvent')}
    </Button>
  );
}

function CreateEventButton({ onPress }: { onPress: () => void }) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <Button onPress={onPress} style={styles.eventActionButton} LeftAccessory={() => <Icon family="Feather" name="plus" size={18} color="white" />}>
      {I18n.t('homeScreen.createEvent')}
    </Button>
  );
}

export function HomeScreen({ navigation }: ScreenProp<'HomeScreen'>) {
  useHomeHeader();

  const { data } = useAllEventsQuery();
  const userHasNoEvents = data?.length === 0;

  function navigateToCreateEvent() {
    navigation.navigate(CreateEventScreenName);
  }

  function navigateToJoinEvent() {
    navigation.navigate(JoinEventScreenName);
  }

  return (
    <Screen style={{ flex: 1 }}>
      {userHasNoEvents ? (
        <NoEventsView navigateToCreateEvent={navigateToCreateEvent} navigateToJoinEvent={navigateToJoinEvent} />
      ) : (
        <>
          <HBox mv="base" gap="small">
            <JoinEventButton onPress={navigateToJoinEvent} />
            <CreateEventButton onPress={navigateToCreateEvent} />
          </HBox>

          <UpcomingEventsSection />
          <PreviousEventsSection />
        </>
      )}
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
