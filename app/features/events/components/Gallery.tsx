import { MasonryFlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useWindowDimensions } from 'react-native';

// TODO: Move to generating hash and saving with image in DB.
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type ImageSize = {
  width: number;
  height: number;
};

// Calculates the size of the image based on the viewport width so that they render evenly sized and spaced.
function calculateImageSize(viewportWidth: number): ImageSize {
  const gap = 13;
  const totalHorizontalGaps = 4;

  const width = (viewportWidth - gap * totalHorizontalGaps) / 3;

  const height = width;

  return { width, height };
}

function ImagePreview({ uri }: { uri: string }) {
  const { width: windowWidth } = useWindowDimensions();
  const { height, width } = calculateImageSize(windowWidth);

  return (
    <Image
      style={{ width, height, marginBottom: 6, borderRadius: 8 }}
      source={{
        uri,
      }}
      transition={1000}
      placeholder={blurhash}
    />
  );
}

function renderItem({ item }: { item: string }) {
  return <ImagePreview uri={item} />;
}

export function Gallery({ photos }: { photos: Array<string> }) {
  return (
    <MasonryFlashList
      data={photos ?? dummy_images}
      numColumns={3}
      renderItem={renderItem}
      estimatedItemSize={110}
      optimizeItemArrangement
      overrideItemLayout={() => ({ height: 115, width: 115 })}
    />
  );
}
