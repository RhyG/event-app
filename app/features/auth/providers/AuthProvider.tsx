import React, { PropsWithChildren, createContext, useEffect, useReducer, useState } from 'react';
import { Text } from 'react-native';

import { supabase } from '@app/core/lib/supabase';
import { User } from '@app/types/user';

interface AuthContextProps {
  user: User | null;
  setUser: (userToSet: User | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

const initialState = {
  user: null,
  loading: true,
  error: null,
};

type AuthContextState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type UserAction = { type: 'GOT_USER'; payload: User } | { type: 'LOADING' } | { type: 'ERROR'; payload: string };

function authReducer(state: AuthContextState, action: UserAction): AuthContextState {
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

function useAuthReducer() {
  // Likely something Tanstack Query could handle but this is a set and forget state so felt overkill.
  const [{ user, loading, error }, dispatch] = useReducer(authReducer, initialState);

  useEffect(function getUser() {
    (async function getSupabaseUser() {
      dispatch({ type: 'LOADING' });
      const { data, error: _error } = await supabase.auth.getUser();

      if (_error) {
        dispatch({ type: 'ERROR', payload: _error.message });
      }

      if (data.user) {
        dispatch({ type: 'GOT_USER', payload: data.user });
      }
    })();
  }, []);

  function setUser(userToSet: User | null) {
    if (userToSet) dispatch({ type: 'GOT_USER', payload: userToSet });
  }

  return { user, loading, error, setUser };
}

export function AuthProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  const { user, loading, error, setUser } = useAuthReducer();

  if (error) return <Text>ERROR</Text>;

  if (loading) return <Text>LOADING</Text>;

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export function useIsLoggedIn() {
  const { user } = React.useContext(AuthContext);
  console.log({ user });
  return !!user;
}

export function useSetUser() {
  const { setUser } = React.useContext(AuthContext);
  return setUser;
}

export function useAuthContext() {
  const authContext = React.useContext(AuthContext);
  return authContext;
}
