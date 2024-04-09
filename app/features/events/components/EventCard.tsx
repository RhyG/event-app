import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { formatTimestamp, isToday } from '@core/lib/date';

import { Button } from '@ui/components/Button';
import { Icon } from '@ui/components/Icon';
import { Text } from '@ui/components/Text';
import { HBox, VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useEventPreviewImageQuery } from '../api/useEventPreviewQuery';
import { EventScreenName } from '../screens/EventScreen/EventScreen';
import { Event } from '../types';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const defaultImage =
  'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export function EventCardImage({ photoURL }: { photoURL: string }) {
  const { styles } = useThemedStyles(stylesFn);

  const { data } = useEventPreviewImageQuery({ photoURL, enabled: !!photoURL });
  const previewImage = { signedUrl: data };

  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={previewImage?.signedUrl ?? defaultImage} contentFit="cover" transition={1000} placeholder={blurhash} />
    </View>
  );
}

export function EventCard({ event_name, event_date, preview_url, id }: Event) {
  const navigation = useNavigation();

  const { styles, theme } = useThemedStyles(stylesFn);

  const formattedDate = isToday(event_date) ? 'Today' : formatTimestamp(event_date);

  return (
    <TouchableOpacity style={styles.eventContainer} onPress={() => navigation.navigate(EventScreenName, { id, name: event_name })} key={id}>
      {preview_url ? <EventCardImage photoURL={preview_url} /> : null}

      <VBox p="extraSmall">
        <HBox justifyContent="space-between" alignItems="center">
          <VBox>
            <Text size="xs" colour={theme.colours.textPrimary}>
              {event_name}
            </Text>
            <Text size="xxs" colour={theme.colours.textSecondary}>
              {formattedDate}
            </Text>
          </VBox>
          <Text size="xxs" colour={theme.colours.textSecondary}>
            {/* TODO: Randomise photo count while we get S3 up and running */}
            {Math.floor(Math.random() * 36) + 5} photos
          </Text>
        </HBox>

        <HBox gap="extraSmall" pt="small">
          <Button
            preset="secondary"
            onPress={() => console.log('Upload photos')}
            label="Add Photos"
            style={{ flex: 6 }}
            LeftAccessory={() => <Icon family="Feather" name="plus" size={20} />}
          />

          <Button preset="secondary" onPress={() => console.log('Share event')} label="View Event" style={{ flex: 1 }}>
            <Icon family="Feather" name="share" size={16} />
          </Button>
        </HBox>
      </VBox>
    </TouchableOpacity>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
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
      borderColor: theme.colours.borderColour,
      borderRadius: 14,
      marginBottom: theme.spacing.medium,
    },
  });
