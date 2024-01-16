import React, { PropsWithChildren, createContext, useState } from 'react';

import { User } from '@app/types/user';

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  const [user, setUser] = useState<User | null>(null);

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
