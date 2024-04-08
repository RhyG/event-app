import I18n from 'i18n-js';
import { ViewStyle } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { CreateEventScreenName, JoinEventScreenName } from '@feature/events';
import { useAllEventsQuery } from '@feature/events/api/useUserEventsQuery';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { Icon } from '@ui/components/Icon';
import { Screen } from '@ui/components/Screen';
import { HBox, VBox } from '@ui/components/layout/Box';

import { useHomeHeader } from '../hooks/useHomeHeader';
import { PreviousEventsSection } from './components/PreviousEventsSection';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';

function NoEventsView({ onCreateEventPress, onJoinEventPress }: { onCreateEventPress: () => void; onJoinEventPress: () => void }) {
  return (
    <WelcomeFlowScreen heading={I18n.t('homeScreen.emptyScreenHeading')} subheading={I18n.t('homeScreen.emptyScreenSubheading')}>
      <VBox gap="medium">
        <CreateEventButton onPress={onCreateEventPress} />
        <JoinEventButton onPress={onJoinEventPress} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

function JoinEventButton({ onPress, style }: { onPress: () => void; style?: ViewStyle }) {
  return (
    <Button onPress={onPress} preset="outlined" style={style} LeftAccessory={() => <Icon family="Feather" name="user-plus" size={18} />}>
      {I18n.t('homeScreen.joinEvent')}
    </Button>
  );
}

function CreateEventButton({ onPress, style }: { onPress: () => void; style?: ViewStyle }) {
  return (
    <Button onPress={onPress} style={style} LeftAccessory={() => <Icon family="Feather" name="plus" size={18} color="white" />}>
      {I18n.t('homeScreen.createEvent')}
    </Button>
  );
}

export function HomeScreen({ navigation }: ScreenProp<'HomeScreen'>) {
  useHomeHeader();

  const { data, isLoading } = useAllEventsQuery();
  const userHasNoEvents = data?.length === 0;

  function navigateToCreateEvent() {
    navigation.navigate(CreateEventScreenName);
  }

  function navigateToJoinEvent() {
    navigation.navigate(JoinEventScreenName);
  }

  // TODO: Show nice loading state or ensure this is done in startup
  if (isLoading) return null;

  return (
    <Screen preset={userHasNoEvents ? 'fixed' : 'scroll'}>
      {userHasNoEvents ? (
        <NoEventsView onCreateEventPress={navigateToCreateEvent} onJoinEventPress={navigateToJoinEvent} />
      ) : (
        <>
          <HBox mv="base" gap="small">
            <JoinEventButton onPress={navigateToJoinEvent} style={{ flex: 1 }} />
            <CreateEventButton onPress={navigateToCreateEvent} style={{ flex: 1 }} />
          </HBox>

          <UpcomingEventsSection />
          <PreviousEventsSection />
        </>
      )}
    </Screen>
  );
}

export const HomeScreenName = 'HomeScreen' as const;
