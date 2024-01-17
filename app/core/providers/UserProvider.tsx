import React, { PropsWithChildren, createContext, useEffect, useReducer } from 'react';
import { Text } from 'react-native';

import { getUser as _getUser } from '@app/features/user/services/UserService';
import { User } from '@app/types/user';

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

type UserAction = { type: 'GOT_USER'; payload: User } | { type: 'LOADING' } | { type: 'ERROR'; payload: unknown };

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
        const data = await _getUser();

        if (data.user) {
          dispatch({ type: 'GOT_USER', payload: data.user });
        }
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e });
      }
    })();
  }, []);

  function setUser(userToSet: User | null) {
    if (userToSet) dispatch({ type: 'GOT_USER', payload: userToSet });
  }

  return { user, loading, error, setUser };
}

export function UserProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  const { user, loading, error, setUser } = useUserReducer();

  if (error) return <Text>ERROR</Text>;

  if (loading) return <Text>LOADING</Text>;

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
