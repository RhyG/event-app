import { ListRenderItem, MasonryFlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useCallback } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle, useWindowDimensions } from 'react-native';

// TODO: Move to generating hash and saving with image in DB.
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const GAP = 5;
const NUM_OF_COLUMNS = 3;

type ImageSize = {
  width: number;
  height: number;
};

function calculateImageSize(viewportWidth: number): ImageSize {
  const width = (viewportWidth - GAP) / NUM_OF_COLUMNS;
  return { width, height: width }; // Ensuring the image is square
}

function ImagePreview({ uri, onImagePress, index }: { uri: string; onImagePress: (index: number) => void; index: number }) {
  const { width: windowWidth } = useWindowDimensions();

  // 30 is the sum of the horizontal padding + gap between columns, needs adjusting if the parent container has different padding.
  // There's probably a better way to do this but I'm shit as fuck at maths.
  const availableSpace = windowWidth - 30;

  const { width, height } = calculateImageSize(availableSpace);

  const containerStyle = {
    width,
    height,
    marginBottom: GAP,
    borderRadius: 5,
  } as StyleProp<ViewStyle>;

  return (
    <TouchableOpacity onPress={() => onImagePress(index)} style={containerStyle}>
      <Image style={{ width: '100%', height: '100%', borderRadius: 5 }} source={{ uri }} transition={200} placeholder={blurhash} />
    </TouchableOpacity>
  );
}

export function Gallery({ photos, onImagePress }: { photos: Array<string>; onImagePress: (index: number) => void }) {
  const renderItem: ListRenderItem<string> = useCallback(({ item, index }) => {
    return <ImagePreview uri={item} index={index} onImagePress={onImagePress} />;
  }, []);

  return (
    <View style={{ height: '100%' }}>
      {/* This parent view is arbitrary but suppresses the "FlashList's rendered size is not usable" warning */}
      <MasonryFlashList
        data={photos ?? []}
        numColumns={NUM_OF_COLUMNS}
        renderItem={renderItem}
        estimatedItemSize={110}
        optimizeItemArrangement
        overrideItemLayout={overrideItemLayout}
      />
    </View>
  );
}

function overrideItemLayout() {
  return { height: 115, width: 115 };
}

const dummy_images = [
  'https://plus.unsplash.com/premium_photo-1687826541778-3f2bf4c03bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1668376545856-ad0314a8479e?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1591243315780-978fd00ff9db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684629279389-8fc4beb3236f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1687826541778-3f2bf4c03bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1668376545856-ad0314a8479e?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1591243315780-978fd00ff9db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684629279389-8fc4beb3236f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
