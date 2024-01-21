import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme, theme } from '@ui/theme';

function NotificationIcon() {
  const { styles } = useThemedStyles(stylesFn);

  const hasNotifications = false;

  return (
    <>
      <TouchableOpacity style={styles.notificationIconContainer}>
        <Feather name="bell" size={18} color={theme.colours.textPrimary} />
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
      headerLeft: () => <Text>Event App</Text>, // TODO make this a sexy logo with the eventual app name
      headerShadowVisible: false,
      headerRight: () => <NotificationIcon />,
    });
  });
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    notificationIconContainer: {
      borderRadius: 50,
      borderColor: theme.colours.palette.sky['100'],
      borderWidth: 1,
      padding: 8,
      ...theme.layout.fullyCentred,
    },
    notificationIndicator: { position: 'absolute', backgroundColor: 'red', bottom: 20, left: 18, height: 8, width: 8, borderRadius: 8 },
  });
