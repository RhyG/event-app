import { Screen } from '@ui/components/Screen';

export function EditEventScreen() {
  return (
    <Screen>
      <></>
    </Screen>
  );
}

export const EditEventScreenName = 'EditEventScreen' as const;
export type EditEventScreenParams = { id: string; name: string; shouldPreventBack?: boolean };
