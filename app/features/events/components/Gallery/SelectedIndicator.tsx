import { StyleSheet, View } from 'react-native';

import { Icon } from '@ui/components/Icon';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

export function SelectedIndicator() {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <View style={styles.selectedIndicator}>
      <Icon family="Feather" name="check" size={12} color="white" />
    </View>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    selectedIndicator: {
      backgroundColor: theme.button.primaryBackground,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 20,
      padding: 3,
      position: 'absolute',
      bottom: 8,
      right: 8,
    },
  });
