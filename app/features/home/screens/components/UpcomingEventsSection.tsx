import { FlatList, ListRenderItem, StyleSheet } from 'react-native';

import { useUpcomingEventsQuery } from '@feature/events/api/useUserEventsQuery';
import { Event } from '@feature/events/types';

import { formatTimestamp } from '@core/lib/date';

import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

function keyExtractor(item: Event) {
  return item.id;
}

function ListItem({ eventName, eventDate }: { eventName: string; eventDate: string }) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <VBox style={styles.listItem} p="small" mr="small">
      <Text size="md">{eventName}</Text>
      <Text preset="formLabel">{formatTimestamp(eventDate)}</Text>
    </VBox>
  );
}

const renderItem: ListRenderItem<Event> = ({ item }) => {
  return <ListItem eventName={item.event_name} eventDate={item.event_date} />;
};

export function UpcomingEventsSection() {
  const { data } = useUpcomingEventsQuery();

  if (!data) return <Text>Broke</Text>;

  return (
    <VBox mb="base" gap="medium">
      <Text preset="subheading">Upcoming Events</Text>
      <FlatList data={data} horizontal renderItem={renderItem} keyExtractor={keyExtractor} showsHorizontalScrollIndicator={false} />
    </VBox>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    listItem: {
      borderWidth: 1,
      borderRadius: theme.card.borderRadius,
      borderColor: theme.colours.borderColour,
    },
  });
