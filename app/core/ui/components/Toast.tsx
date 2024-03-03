import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useToastContext } from '@core/providers/ToastProvider';

import { theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { Text } from './Text';
import { HBox } from './layout/Box';

const TOAST_DURATION = 3000;

function ToastIcon({ type }: { type: 'ERROR' | 'SUCCESS' | 'INFO' }) {
  if (type === 'ERROR') {
    return <Feather name="alert-circle" size={20} color={theme.colours.angry} />;
  }

  if (type === 'SUCCESS') {
    return <Octicons name="check-circle" size={20} color={theme.colours.success} />;
  }

  return <Feather name="info" size={20} color={theme.colours.palette.blue['400']} />;
}

export function Toast() {
  const { styles, theme } = useThemedStyles(styleFn);
  const { toast, hideToast } = useToastContext();
  const [isVisible, setIsVisible] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  const style = useAnimatedStyle(() => {
    return {
      bottom: withTiming(isVisible ? 80 : -100, {
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
        }, TOAST_DURATION);
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
    <Pressable onPress={handlePress} style={styles.outerContainer}>
      <Animated.View style={[style, styles.innerContainer, { backgroundColor: 'white' }]}>
        <View style={[styles.bar, { backgroundColor: toastBackground }]} />
        <HBox pl="small" pr="base" pv="small" alignItems="center" gap="small">
          <ToastIcon type={toast?.type ?? 'INFO'} />
          {/* <Feather name={iconName[toast?.type ?? 'INFO']} /> */}
          <Text preset="formLabel">{toast?.message}</Text>
        </HBox>
      </Animated.View>
    </Pressable>
  );
}

const styleFn = () =>
  StyleSheet.create({
    outerContainer: {
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      alignItems: 'center',
      zIndex: 1,
      height: 60,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    innerContainer: {
      borderRadius: 8,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    bar: { height: '100%', width: 5 },
  });
