import { useNavigation } from '@react-navigation/native';
import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Screens } from '@app/navigation/screens';

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

function Gap() {
  return <View style={{ width: 10 }} />;
}

function ListItem({ eventName, eventDate, eventId }: { eventName: string; eventDate: string; eventId: string }) {
  const { styles, theme } = useThemedStyles(stylesFn);
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(Screens.EventScreen, { name: eventName, id: eventId })}>
      <Text>{eventName}</Text>
      <Text size="xs" colour={theme.colours.textSecondary}>
        {formatTimestamp(eventDate)}
      </Text>
    </TouchableOpacity>
  );
}

const renderItem: ListRenderItem<Event> = ({ item }) => {
  return <ListItem eventName={item.event_name} eventDate={item.event_date} eventId={item.id} />;
};

export function UpcomingEventsSection() {
  const { data } = useUpcomingEventsQuery();

  if (!data) return <Text>No data</Text>;

  return (
    <VBox mb="base" gap="small">
      <Text preset="subheading">Upcoming Events</Text>
      <FlatList
        data={data}
        horizontal
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={Gap}
      />
    </VBox>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    listItem: {
      borderRadius: theme.card.borderRadius,
      borderColor: theme.colours.borderColour,
      padding: theme.spacing.small,
      backgroundColor: theme.colours.secondaryBackground,
    },
  });
