import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';

import { ScreenProp } from '@app/navigation/types';

import { useEventPhotosQuery } from '@feature/events/api/useEventQuery';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function FeedCard({ uri }: { uri: string }) {
  return (
    <Image
      source={{
        uri,
      }}
      transition={1000}
      placeholder={blurhash}
      style={{ height: 100, width: 100 }}
    />
  );
}

const renderItem: ListRenderItem<string> = ({ item }) => {
  return <FeedCard uri={item} />;
};

export function EventFeedScreen({ route }: ScreenProp<'EventFeedScreen'>) {
  const { id } = route.params;
  const { data: photos = [] } = useEventPhotosQuery(id);

  return <FlashList data={photos} renderItem={renderItem} />;
}
