import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import * as React from 'react';

type GenericIconProps = IconProps<any>;

// This will need to be extended when using new icon families.
type IconFamily = 'Feather' | 'AntDesign' | 'Ionicons';

const IconFamilyMap: Record<IconFamily, React.ComponentType<GenericIconProps>> = {
  Feather,
  AntDesign,
  Ionicons,
};

interface Props extends GenericIconProps {
  family: keyof typeof IconFamilyMap;
}

/**
 * Wrapper around icons exported by @expo/vector-icons
 * @link For all icons see https://icons.expo.fyi/
 */
export function Icon({ family, ...props }: Props) {
  const IconComponent = IconFamilyMap[family];

  if (!IconComponent) {
    console.warn(`Icon family ${family} not supported`);
    return null;
  }

  return <IconComponent {...props} />;
}
