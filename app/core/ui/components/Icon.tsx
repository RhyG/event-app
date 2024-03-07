import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import * as React from 'react';

import { useTheme } from '@ui/theme/useTheme';

type GenericIconProps = IconProps<any>;

// This will need to be extended when using new icon families but try really hard to exclusively use Feather.
type IconFamily = 'Feather' | 'AntDesign' | 'Octicons';

const IconFamilyMap: Record<IconFamily, React.ComponentType<GenericIconProps>> = {
  Feather,
  AntDesign,
  Octicons,
};

interface Props extends GenericIconProps {
  family: keyof typeof IconFamilyMap;
}

/**
 * Wrapper around icons exported by @expo/vector-icons
 * @link For all icons see https://icons.expo.fyi/
 */
export function Icon({ family, ...props }: Props) {
  const theme = useTheme();

  const IconComponent = IconFamilyMap[family];

  if (!IconComponent) {
    console.warn(`Icon family ${family} not supported`);
    return null;
  }

  return <IconComponent color={theme.icon.primaryColour} {...props} />;
}
