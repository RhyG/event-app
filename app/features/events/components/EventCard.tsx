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

export function EventCardImage({ photoURL }: { photoURL: string }) {
  const { styles } = useThemedStyles(stylesFn);

  const { data } = useEventPreviewImageQuery({ photoURL, enabled: !!photoURL });
  const previewImage = { signedUrl: data };

  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={previewImage.signedUrl} contentFit="cover" transition={1000} placeholder={blurhash} />
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
