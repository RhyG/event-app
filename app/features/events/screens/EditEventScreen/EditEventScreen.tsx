import { Screen } from '@ui/components/Screen';

export function EditEventScreen() {
  return (
    <Screen>
      <></>
    </Screen>
  );
}

EditEventScreen.screenName = 'EditEventScreen' as const;
export type EditEventScreenParams = { id: string; name: string; shouldPreventBack?: boolean };
