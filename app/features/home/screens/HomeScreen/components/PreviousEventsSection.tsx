import { useNavigation } from '@react-navigation/native';
import I18n from 'i18n-js';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { usePreviousEventsQuery } from '@feature/events/api/useUserEventsQuery';
import { EventCard } from '@feature/events/components/EventCard';
import { AllEventsScreenName } from '@feature/events/screens/AllEventsScreen/AllEventsScreen';
import { Event } from '@feature/events/types';

import { Text } from '@ui/components/Text';
import { HBox, VBox } from '@ui/components/layout/Box';
import { colours } from '@ui/theme';

const placeholders = [
  {
    event_name: "Jakey's 29 + 1",
    event_date: '2024-08-15T21:45:28+00:00',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: '123',
  },
  {
    event_name: "Clair's wedding!!!",
    event_date: '2024-10-31T21:45:28+00:00',
    image:
      'https://plus.unsplash.com/premium_photo-1687826541778-3f2bf4c03bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: '456',
  },
  {
    event_name: 'The Gang Does Mushy Valley',
    event_date: '2024-07-24T21:45:28+00:00',
    image:
      'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: '789',
  },
] as Array<Event & { image?: string }>;

export function PreviousEventsSection() {
  const navigation = useNavigation();

  const { data } = usePreviousEventsQuery();

  if (!data || data.length === 0) return null;

  return (
    <VBox>
      <HBox justifyContent="space-between" alignItems="center" mb="small">
        <Text preset="subheading">{I18n.t('homeScreen.previousEvents')}</Text>

        <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate(AllEventsScreenName)}>
          <Text colour={colours.sky['700']} size="xxs">
            {I18n.t('homeScreen.seeAll').toUpperCase()}
          </Text>
        </TouchableOpacity>
      </HBox>

      {data.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
      {/* Add a footer here with an illustration saying "That's all for now" or something like that. */}
    </VBox>
  );
}

const styles = StyleSheet.create({
  seeAllButton: {
    backgroundColor: colours.sky['50'],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
});
