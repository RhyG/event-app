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
  gotUser: (user: User): UserAction => ({ type: 'GOT_USER', payload: user }),
  loading: (): UserAction => ({ type: 'LOADING' }),
  error: (error: unknown): UserAction => ({ type: 'ERROR', payload: error }),
  userCleared: (): UserAction => ({ type: 'USER_CLEARED' }),
};

function userReducer(state: UserContextState, action: UserAction): UserContextState {
  switch (action.type) {
    case 'GOT_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_CLEARED':
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
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
          dispatch(userReducerActions.gotUser(user));
        } else {
          dispatch(userReducerActions.userCleared());
        }
      } catch (e) {
        dispatch(userReducerActions.error(e));
      }
    })();
  }, []);

  function setUser(userToSet: User | null) {
    if (userToSet) {
      dispatch(userReducerActions.gotUser(userToSet));
    } else {
      dispatch(userReducerActions.userCleared());
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
