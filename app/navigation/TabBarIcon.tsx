import { Feather } from '@expo/vector-icons';

import colours from '@ui/theme/colours';

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  name: React.ComponentProps<typeof Feather>['name'];
}

const focusedColour = colours.sky['800'];
const blurredColour = colours.slate['500'];

export function TabBarIcon(props: TabBarIconProps) {
  return <Feather name={props.name} size={24} color={props.focused ? focusedColour : blurredColour} />;
}
