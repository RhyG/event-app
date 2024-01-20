import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme, colours } from '@ui/theme';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const placeholders = [
  {
    name: "Jakey's 29 + 1",
    date: '20 Jan 2024',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: "Clair's wedding!!!",
    date: '12 Dec 2023',
    image:
      'https://plus.unsplash.com/premium_photo-1687826541778-3f2bf4c03bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'The Gang Does Mushy Valley',
    date: '13 Feb 2024',
    image:
      'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function EventCard({ name, date, image }: { name: string; date: string; image: string }) {
  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity style={styles.eventContainer}>
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
  const { styles } = useThemedStyles(stylesFn);
  return (
    <View>
      <View style={styles.heading}>
        <Text>Previous Events</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text colour={colours.sky['700']} size="xxs">
            SEE ALL
          </Text>
        </TouchableOpacity>
      </View>
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
