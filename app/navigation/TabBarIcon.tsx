import { Icon } from '@ui/components/Icon';
import colours from '@ui/theme/colours';

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  name: React.ComponentProps<typeof Icon>['name'];
}

const focusedColour = colours.sky['800'];
const blurredColour = colours.slate['500'];

export function TabBarIcon(props: TabBarIconProps) {
  return <Icon name={props.name} size={24} color={props.focused ? focusedColour : blurredColour} />;
}
