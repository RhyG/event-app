import { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useToastContext } from '@core/providers/ToastProvider';

import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { Text } from './Text';

function BaseToast() {
  const { toast, hideToast } = useToastContext();

  const { styles } = useThemedStyles(styleFn);

  const timeout = useRef<NodeJS.Timeout>();

  const style = useAnimatedStyle(() => {
    return {
      bottom: withTiming(toast ? 100 : -100, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  }, [toast]);

  useEffect(
    function handleAnimateToast() {
      if (toast) {
        timeout.current = setTimeout(() => {
          hideToast();
        }, 3500);
      }

      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    },
    [hideToast, toast],
  );
  return (
    <TouchableOpacity onPress={hideToast} style={styles.outerContainer}>
      <Animated.View style={[style, styles.innerContainer]}>
        {/* <Icon name="alert-circle" size={24} color="#fff" /> */}
        <Text>An error has occurred.</Text>
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
      backgroundColor: theme.colours.palette.red['500'],
      paddingHorizontal: theme.spacing.base,
      paddingVertical: theme.spacing.small,
      borderRadius: 8,
    },
  });

export function ErrorToast() {
  return <BaseToast />;
}

export function SuccessToast() {}
