import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';

export function useHeaderOptions(options: NativeStackNavigationOptions) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
}
