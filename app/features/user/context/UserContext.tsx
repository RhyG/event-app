import React, { PropsWithChildren, createContext, useEffect, useReducer } from 'react';
import { Text, View } from 'react-native';

import * as UserService from '@app/features/user/services/UserService';
import { User } from '@app/features/user/types';

interface UserContextProps {
  user: User | null;
  setUser: (userToSet: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

const initialState = {
  user: null,
  loading: true,
  error: null,
};

type UserContextState = {
  user: User | null;
  loading: boolean;
  error: unknown | null;
};

type UserAction = { type: 'GOT_USER'; payload: User } | { type: 'LOADING' } | { type: 'ERROR'; payload: unknown } | { type: 'USER_CLEARED' };

const userReducerActions = {
  GOT_USER: (state: UserContextState, action: { type: 'GOT_USER'; payload: User }) => ({
    ...state,
    user: action.payload,
    loading: false,
    error: null,
  }),
  LOADING: (state: UserContextState) => ({
    ...state,
    loading: true,
    error: null,
  }),
  ERROR: (state: UserContextState, action: { type: 'ERROR'; payload: unknown }) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  USER_CLEARED: (state: UserContextState) => ({
    ...state,
    user: null,
    loading: false,
    error: null,
  }),
};
function userReducer(state: UserContextState, action: UserAction): UserContextState {
  const handler = userReducerActions[action.type];
  if (handler) {
    return handler(state, action as any);
  }
  return state;
}

function useUserReducer() {
  // Likely something Tanstack Query could handle but this is a set and forget state so felt overkill.
  const [{ user, loading, error }, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    (async function getUser() {
      dispatch({ type: 'LOADING' });

      try {
        const user = await UserService.getUser();

        if (user) {
          dispatch({ type: 'GOT_USER', payload: user });
        } else {
          dispatch({ type: 'USER_CLEARED' });
        }
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e });
      }
    })();
  }, []);

  function setUser(userToSet: User | null) {
    if (userToSet) {
      dispatch({ type: 'GOT_USER', payload: userToSet });
    } else {
      dispatch({ type: 'USER_CLEARED' });
    }
  }

  return { user, loading, error, setUser };
}

export function UserProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  const { user, loading, error, setUser } = useUserReducer();

  // TODO: nice error state (toast maybe)
  if (error)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ERROR</Text>
      </View>
    );

  // TODO: Should continue showing splash
  if (loading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LOADING</Text>
      </View>
    );

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useIsLoggedIn() {
  const { user } = React.useContext(UserContext);
  return !!user;
}

export function useSetUser() {
  const { setUser } = React.useContext(UserContext);
  return setUser;
}

export function useUserContext() {
  const userContext = React.useContext(UserContext);
  return userContext;
}
