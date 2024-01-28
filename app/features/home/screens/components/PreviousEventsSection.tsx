import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Screens } from '@app/navigation/screens';

import { useUserEventsQuery } from '@feature/events/api/useUserEventsQuery';
import { Event } from '@feature/events/types';

import { Text } from '@ui/components/Text';
import { Theme, colours } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const placeholders = [
  {
    name: "Jakey's 29 + 1",
    date: '20 Jan 2024',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: '123',
  },
  {
    name: "Clair's wedding!!!",
    date: '12 Dec 2023',
    image:
      'https://plus.unsplash.com/premium_photo-1687826541778-3f2bf4c03bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: '456',
  },
  {
    name: 'The Gang Does Mushy Valley',
    date: '13 Feb 2024',
    image:
      'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    id: '789',
  },
];

function EventCard({ name, date, image, id }: { name: string; date: string; image: string; id: string }) {
  const navigation = useNavigation();

  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity style={styles.eventContainer} onPress={() => navigation.navigate(Screens.EventScreen, { id, name })}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} contentFit="cover" transition={1000} placeholder={blurhash} />
      </View>
      <View style={styles.eventDetails}>
        <Text size="xs" colour={theme.colours.textPrimary}>
          {name}
        </Text>
        <View style={styles.subheadingContainer}>
          <Text size="xxs" colour={theme.colours.textSecondary}>
            {date}
          </Text>
          <Text size="xxs" colour={theme.colours.textSecondary}>
            {Math.floor(Math.random() * 36) + 5} photos
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function PreviousEventsSection() {
  const navigation = useNavigation();

  const { styles } = useThemedStyles(stylesFn);

  const { data: events } = useUserEventsQuery();

  // if (!events || events.length === 0) {
  //   return <Text>Create an event!</Text>;
  // }

  return (
    <View>
      <View style={styles.heading}>
        <Text>Previous Events ({events?.length ?? 0})</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate(Screens.AllEventsScreen)}>
          <Text colour={colours.sky['700']} size="xxs">
            SEE ALL
          </Text>
        </TouchableOpacity>
      </View>
      {(events ?? []).map((event: Event) => (
        <TouchableOpacity key={event.id} onPress={() => navigation.navigate(Screens.EventScreen, { id: event.id, name: event.event_name })}>
          <Text>{event.event_name}</Text>
        </TouchableOpacity>
      ))}
      {placeholders.map(placeholder => (
        <EventCard key={placeholder.name} {...placeholder} />
      ))}
    </View>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    heading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.medium,
    },
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
      borderColor: colours.sky['50'],
      borderRadius: 14,
      marginBottom: theme.spacing.medium,
    },
    eventDetails: {
      padding: 8,
    },
    subheadingContainer: {
      ...theme.layout.spaceBetweenRow,
    },
  });
