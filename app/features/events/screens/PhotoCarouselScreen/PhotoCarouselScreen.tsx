import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { ActivityIndicator, Dimensions, FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { eventPhotosPathsQueryKey } from '@core/domains/events/api/query-keys';
import { getPhoto } from '@core/domains/photo-management/services/PhotoService';
import { useHeaderOptions } from '@core/hooks/useHeaderOptions';
import { useRenderAfterInteractions } from '@core/hooks/useRenderAfterInteractions';

import { Icon } from '@ui/components/Icon';

// TODO: Move to generating hash and saving with image in DB.
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function usePhotoPaths(eventId: string) {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(eventPhotosPathsQueryKey(eventId)) as Array<string>;
}

function usePhotoQuery(path: string) {
  return useQuery({
    queryKey: ['photo', path],
    queryFn: () => getPhoto(path),
    staleTime: 120_000,
  });
}

function keyExtractor(item: string, index: number) {
  return item ?? index;
}

function onScrollToIndexFailed() {
  console.log('Scroll to index failed.');
}

function getItemLayout(_: ArrayLike<string> | null | undefined, index: number) {
  return { length: Dimensions.get('screen').width, offset: Dimensions.get('screen').width * index, index };
}

function Photo({ path }: { path: string }) {
  const { data, error, isLoading } = usePhotoQuery(path);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <View style={{ flex: 1, width: Dimensions.get('screen').width }}>
      <Image
        source={{
          uri: data,
        }}
        placeholder={blurhash}
        style={{ height: '100%', width: Dimensions.get('screen').width }}
        contentFit="contain"
      />
    </View>
  );
}

const renderItem: ListRenderItem<string> = ({ item }) => {
  return <Photo path={item} />;
};

export function PhotoCarouselScreen({ route, navigation }: ScreenProp<typeof PhotoCarouselScreenName>) {
  const { initialIndex, eventId } = route.params;

  const shouldRender = useRenderAfterInteractions();

  const photoPaths = usePhotoPaths(eventId);

  useHeaderOptions({
    headerShown: false,
  });

  return (
    <>
      <View
        style={{
          width: Dimensions.get('screen').width,
          backgroundColor: 'black',
        }}>
        {shouldRender ? (
          <FlatList
            data={photoPaths}
            renderItem={renderItem}
            initialScrollIndex={initialIndex}
            horizontal
            pagingEnabled={true}
            keyExtractor={keyExtractor}
            onScrollToIndexFailed={onScrollToIndexFailed}
            getItemLayout={getItemLayout}
          />
        ) : null}
      </View>
      <TouchableOpacity onPress={() => navigation.pop()} style={{ position: 'absolute', right: 20, top: 40 }}>
        <Icon name="x" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}

export const PhotoCarouselScreenName = 'PhotoCarouselScreen' as const;
export type PhotoCarouselScreenParams = { initialIndex: number; eventId: string };
