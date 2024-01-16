import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// This module just provides a more common API to the storage module so that libs like Supabase can use it.
export const PersistedStorage = {
  getItem: <T>(key: string): T | undefined => {
    const value = storage.getString(key);

    if (!value) return undefined;

    // Attempt to parse the value as JSON, if it fails, return the value as-is.
    try {
      return JSON.parse(value) as T;
    } catch {
      // If a value exists for the key, and it failed to parse into an object, assume it's a string.
      return value as T;
    }
  },
  setItem: (key: string, value: string | number | boolean | Record<PropertyKey, unknown>): void => {
    let valueToSet = value;

    if (typeof value === 'object') {
      valueToSet = JSON.stringify(value);
    }

    // @ts-expect-error - MMKV typings are weird.
    storage.set(key, valueToSet);
  },
  removeItem: (key: string): void => {
    const keyIsInStorage = storage.contains(key);

    if (keyIsInStorage) {
      storage.delete(key);
    }
  },
  removeAll: () => {
    storage.clearAll();
  },
};
