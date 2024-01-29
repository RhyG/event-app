import { useEffect, useReducer } from 'react';
import { InteractionManager } from 'react-native';

export function useRenderAfterInteractions() {
  const [shouldRender, setShouldRender] = useReducer(() => true, false);

  useEffect(function renderAfterInteractions() {
    void InteractionManager.runAfterInteractions(() => {
      setShouldRender();
    });
  }, []);

  return shouldRender;
}
