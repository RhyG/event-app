import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

export function useHeaderOptions(options: Record<string, unknown>) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
}
