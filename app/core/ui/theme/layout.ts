import { ViewStyle } from 'react-native';

export const layout: Record<string, ViewStyle> = {
  centerAlignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullyCentred: {
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const;
