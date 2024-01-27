import { useReducer } from 'react';

/**
 * Simple hook for toggling a boolean value.
 * @param defaultValue value to initialise state with.
 * @returns [value, toggle] current toggle value and a memory safe toggle function.
 */
export function useToggle(defaultValue: boolean = false) {
  return useReducer(state => !state, defaultValue);
}
