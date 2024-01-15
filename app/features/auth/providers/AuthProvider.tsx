import React, { createContext, useState } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  toggleLoggedIn: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  toggleLoggedIn: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoggedIn = () => {
    setIsLoggedIn(prevLoggedIn => !prevLoggedIn);
  };

  return <AuthContext.Provider value={{ isLoggedIn, toggleLoggedIn }}>{children}</AuthContext.Provider>;
};

export function useIsLoggedIn() {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn;
}

export function useAuthContext() {
  const authContext = React.useContext(AuthContext);
  return authContext;
}

export default AuthProvider;
