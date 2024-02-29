import { useEffect, useRef } from 'react';
import { Easing, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useToastContext } from '@core/providers/ToastProvider';

import { Text } from './Text';

function BaseToast() {
  const { toast, hideToast } = useToastContext();

  const styles = styleFn();

  const timeout = useRef<NodeJS.Timeout>();

  const style = useAnimatedStyle(() => {
    return {
      bottom: withTiming(toast ? 100 : -100, {
        duration: 500,
        easing: Easing.bounce,
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

const styleFn = () =>
  StyleSheet.create({
    outerContainer: {
      position: 'absolute',
      bottom: 0,
      width: 200,
      alignSelf: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    innerContainer: {
      backgroundColor: 'red',
    },
  });

export function ErrorToast() {
  return <BaseToast />;
}

export function SuccessToast() {}
