import { useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '@ui/components/Text';
import { HBox } from '@ui/components/layout/Box';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

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
      <Text size="xs" colour={theme.colours.textSubdued}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function EventTags({ eventId }: { eventId: string }) {
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

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
