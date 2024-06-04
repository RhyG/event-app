import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icon } from '@ui/components/Icon';
import { Text } from '@ui/components/Text';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

function NotificationIcon() {
  const { styles } = useThemedStyles(stylesFn);

  const hasNotifications = false;

  return (
    <>
      <TouchableOpacity style={styles.notificationIconContainer}>
        <Icon name="bell" size={18} />
      </TouchableOpacity>
      {hasNotifications ? <View style={styles.notificationIndicator} /> : null}
    </>
  );
}

export function useHomeHeader() {
  const navigation = useNavigation();

  useLayoutEffect(function setHomeHeader() {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <Text preset="heading">WIP Name</Text>, // TODO make this a sexy logo with the eventual app name
      headerShadowVisible: false,
      headerRight: () => <NotificationIcon />,
    });
  });
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    notificationIconContainer: {
      borderRadius: 50,
      borderColor: theme.colours.borderColour,
      borderWidth: 1,
      padding: 8,
      ...theme.layout.fullyCentred,
    },
    notificationIndicator: {
      position: 'absolute',
      backgroundColor: theme.colours.palette.red['500'],
      bottom: 20,
      left: 18,
      height: 8,
      width: 8,
      borderRadius: 8,
    },
  });
