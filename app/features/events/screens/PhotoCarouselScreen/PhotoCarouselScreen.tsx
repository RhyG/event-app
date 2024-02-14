import { Feather } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Dimensions, FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { eventPhotosPathsQueryKey } from '@feature/events/api/query-keys';
import { getPhoto } from '@feature/photo-management/services/PhotoService';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Text } from '@ui/components/Text';

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
  });
}

function keyExtractor(item: string, index: number) {
  return item ?? index;
}

function Photo({ path }: { path: string }) {
  const { data, error, isLoading } = usePhotoQuery(path);

  if (isLoading) {
    return null;
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

export function PhotoCarouselScreen({ route, navigation }: ScreenProp<'PhotoCarouselScreen'>) {
  const { initialIndex, eventId } = route.params;

  const photoPaths = usePhotoPaths(eventId);

  useHeaderOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Feather name="x" size={24} color="white" />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: 'black',
    },
    title: '',
  });

  console.log('Got photo paths:', photoPaths?.filter(Boolean).length ?? 0);

  return (
    <View
      style={{
        // height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'black',
        // borderWidth: 1,
        // borderColor: 'red',
      }}>
      <FlatList
        // style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}
        data={photoPaths}
        renderItem={renderItem}
        initialScrollIndex={initialIndex}
        horizontal
        pagingEnabled={true}
        keyExtractor={keyExtractor}
        onScrollToIndexFailed={() => console.log('Scroll to index failed')}
      />
    </View>
  );
}
