import { useMemo } from 'react';

import { Theme, theme } from '@ui/theme';

export function useThemedStyles<Styles>(stylesFn: (theme: Theme) => Styles) {
  return useMemo(
    () => ({
      theme,
      styles: stylesFn(theme),
    }),
    [stylesFn],
  );
}
