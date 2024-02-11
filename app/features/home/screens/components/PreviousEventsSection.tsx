import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Screens } from '@app/navigation/screens';

import { usePreviousEventsQuery } from '@feature/events/api/useUserEventsQuery';
import { Event } from '@feature/events/types';

import { formatTimestamp } from '@core/lib/date';

import { Text } from '@ui/components/Text';
import { HBox, VBox } from '@ui/components/layout/Box';
import { Theme, colours } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

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

const defaultImage =
  'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function EventCard({ event_name, event_date, image = defaultImage, id }: Event & { image?: string }) {
  const navigation = useNavigation();

  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity style={styles.eventContainer} onPress={() => navigation.navigate(Screens.EventScreen, { id, name: event_name })}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} contentFit="cover" transition={1000} placeholder={blurhash} />
      </View>
      <VBox p="extraSmall">
        <Text size="xs" colour={theme.colours.textPrimary}>
          {event_name}
        </Text>
        <HBox justifyContent="space-between">
          <Text size="xxs" colour={theme.colours.textSecondary}>
            {formatTimestamp(event_date)}
          </Text>
          <Text size="xxs" colour={theme.colours.textSecondary}>
            {Math.floor(Math.random() * 36) + 5} photos
          </Text>
        </HBox>
      </VBox>
    </TouchableOpacity>
  );
}

export function PreviousEventsSection() {
  const navigation = useNavigation();

  const { styles } = useThemedStyles(stylesFn);

  const data = usePreviousEventsQuery();

  const mergedData = [...(data.data ?? []), ...placeholders];

  return (
    <VBox>
      <HBox justifyContent="space-between" alignItems="center" mb="medium">
        <Text preset="subheading">Previous Events ({mergedData?.length ?? 0})</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate(Screens.AllEventsScreen)}>
          <Text colour={colours.sky['700']} size="xxs">
            SEE ALL
          </Text>
        </TouchableOpacity>
      </HBox>
      {mergedData.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </VBox>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    seeAllButton: {
      backgroundColor: colours.sky['50'],
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 14,
    },
    imageContainer: {
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
    },
    image: {
      borderTopLeftRadius: theme.card.borderRadius,
      borderTopRightRadius: theme.card.borderRadius,
      flex: 1,
      width: '100%',
      backgroundColor: '#0553',
    },
    eventContainer: {
      borderWidth: 1,
      borderColor: theme.colours.palette.sky['50'],
      borderRadius: 14,
      marginBottom: theme.spacing.medium,
    },
  });
