import { ScreenProp } from '@app/navigation/types';

export function EventScreen({ route }: ScreenProp<'EventScreen'>) {
  console.log(route.params.eventId);
  return <></>;
}
