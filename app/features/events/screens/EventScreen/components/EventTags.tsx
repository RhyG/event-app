import { useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon } from '@ui/components/Icon';
import { Text } from '@ui/components/Text';
import { HBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

const placeholder_tags = ['Getting ready', 'Reception', 'Ceremony', 'Dinner', 'After party', 'Bux night', "Hen's night"];

function useEventTagsQuery(eventId: string) {
  return { data: placeholder_tags };
}

function Tag({ label, onPress, selected }: { label: string; onPress: () => void; selected: boolean }) {
  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <TouchableOpacity
      style={[styles.tag, { backgroundColor: selected ? theme.colours.palette.sky['100'] : theme.colours.secondaryBackground }]}
      onPress={onPress}>
      <Text colour={theme.colours.textSubdued}>{label}</Text>
    </TouchableOpacity>
  );
}

export function EventTags({ eventId }: { eventId: string }) {
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const { styles } = useThemedStyles(stylesFn);

  const { data } = useEventTagsQuery(eventId);

  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <Tag
        label={item}
        onPress={() => {
          setSelectedTag(curr => (curr === item ? undefined : item));
        }}
        selected={item === selectedTag}
      />
    );
  };

  return (
    <HBox alignItems="center">
      <TouchableOpacity style={styles.addButton}>
        <Icon family="Feather" name="plus" size={20} />
      </TouchableOpacity>
      <FlatList data={data} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} />
    </HBox>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    tag: {
      borderRadius: 20,
      padding: 10,
      margin: 5,
    },
    addButton: {
      borderColor: theme.colours.borderColour,
      borderWidth: 1,
      padding: 10,
      borderRadius: 20,
      marginRight: 10,
    },
  });
