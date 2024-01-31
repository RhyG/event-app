import Icon from '@expo/vector-icons/Entypo';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { BounceInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

const FAB_VISIBLE_BOTTOM_VALUE = 30;
const FAB_HIDDEN_BOTTOM_VALUE = -180;

type Props = {
  onPress: () => void;
  buttonVisible: boolean;
};

export function AddPhotosFAB({ onPress, buttonVisible }: Props) {
  const { styles } = useThemedStyles(stylesFn);

  const style = useAnimatedStyle(() => {
    let value: number;

    if (buttonVisible) {
      value = withSpring(FAB_VISIBLE_BOTTOM_VALUE, { damping: 15 });
    } else {
      value = withSpring(FAB_HIDDEN_BOTTOM_VALUE, { damping: 15 });
    }

    return {
      bottom: value,
    };
  }, [buttonVisible]);

  return (
    <Animated.View entering={BounceInDown} style={[styles.animatedView, style]}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Icon name="plus" color="#fff" size={25} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    animatedView: {
      position: 'absolute',
      right: 20,
      zIndex: 0,
    },
    buttonContainer: {
      backgroundColor: theme.colours.palette.green['400'],
      height: 40,
      width: 40,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
