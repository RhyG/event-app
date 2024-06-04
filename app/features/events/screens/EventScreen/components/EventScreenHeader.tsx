import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { Icon } from '@ui/components/Icon';
import { Text } from '@ui/components/Text';
import { HBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function PhotoCountView({ count }: { count: number }) {
  return (
    <View style={photoCountStyles.container}>
      <BlurView style={photoCountStyles.blurView} intensity={15}>
        <HBox gap="small" alignItems="center" ph="medium" pv="extraSmall">
          <Icon name="camera" size={20} color="white" />
          <Text colour="white">{count}</Text>
        </HBox>
      </BlurView>
    </View>
  );
}

// TODO: Add a nice little blur on the bottom of the header
// TODO: Show a nice illustration saying to add photos if no photos or preview photo.
export function EventScreenHeader({ previewImage, photoCount }: { previewImage: string; photoCount: number }) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground source={previewImage} style={styles.imageBackgroundStyle} imageStyle={styles.imageStyle} transition={200} placeholder={blurhash}>
        <PhotoCountView count={photoCount} />
      </ImageBackground>
    </>
  );
}

const stylesFn = ({ colours }: Theme) =>
  StyleSheet.create({
    imageBackgroundStyle: { height: 220 },
    imageStyle: { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
    headerBackgroundStyle: { backgroundColor: colours.black, opacity: 0.35, width: '100%', height: '40%' },
  });

const photoCountStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  blurView: {
    borderRadius: 14,
    overflow: 'hidden',
  },
});
