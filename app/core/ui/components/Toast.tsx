import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useToastContext } from '@core/providers/ToastProvider';

import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { Text } from './Text';

const iconName = {
  ERROR: 'alert-circle',
  SUCCESS: 'check',
  INFO: 'info',
} as const;

export function Toast() {
  const { styles, theme } = useThemedStyles(styleFn);
  const { toast, hideToast } = useToastContext();
  const [isVisible, setIsVisible] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  const style = useAnimatedStyle(() => {
    return {
      bottom: withTiming(isVisible ? 100 : -100, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  }, [isVisible]);

  useEffect(
    function handleShowToast() {
      if (toast) {
        setIsVisible(true);
        timeout.current = setTimeout(() => {
          setIsVisible(false);
        }, 3500);
      }
    },
    [toast],
  );

  const handlePress = () => {
    clearTimeout(timeout.current);
    setIsVisible(false);

    setTimeout(hideToast, 500);
  };

  useEffect(
    function handleHideToast() {
      if (!isVisible && toast) {
        const timer = setTimeout(hideToast, 500); // Wait for the hide animation to complete
        return () => clearTimeout(timer);
      }

      return;
    },
    [isVisible, toast, hideToast],
  );

  const toastBackground = (() => {
    switch (toast?.type) {
      case 'ERROR':
        return theme.colours.angry;
      case 'SUCCESS':
        return theme.colours.success;
      case 'INFO':
        return theme.colours.palette.blue['400'];
      default:
        return theme.colours.palette.blue['400'];
    }
  })();

  return (
    <TouchableOpacity onPress={handlePress} style={styles.outerContainer}>
      <Animated.View style={[style, styles.innerContainer, { backgroundColor: toastBackground }]}>
        <Feather name={iconName[toast?.type ?? 'INFO']} size={20} color={theme.colours.white} />
        <Text colour={theme.colours.white}>{toast?.message}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styleFn = (theme: Theme) =>
  StyleSheet.create({
    outerContainer: {
      position: 'absolute',
      bottom: 0,
      width: Dimensions.get('window').width * 0.8,
      alignSelf: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    innerContainer: {
      paddingHorizontal: theme.spacing.base,
      paddingVertical: theme.spacing.small,
      borderRadius: 12,
      flexDirection: 'row',
      gap: theme.spacing.small,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
