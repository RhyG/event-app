import { PropsWithChildren, createContext, useContext, useMemo, useReducer } from 'react';

interface WelcomeFlowContextProps {
  /**
   * Current form mode.
   * @default LOGIN
   */
  formMode: 'LOGIN' | 'SIGNUP';
  /**
   * Toggles the form between login and signup.
   */
  toggleFormMode: React.DispatchWithoutAction;
}

export const WelcomeFormContext = createContext<WelcomeFlowContextProps>({
  formMode: 'LOGIN',
  toggleFormMode: () => {},
});

function reducer(currentFormMode: 'LOGIN' | 'SIGNUP') {
  return currentFormMode === 'LOGIN' ? 'SIGNUP' : 'LOGIN';
}

export function WelcomeFlowProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  const [formMode, toggleFormMode] = useReducer(reducer, 'LOGIN');

  const contextValue = useMemo(() => ({ formMode, toggleFormMode }) as const, [formMode]);

  return <WelcomeFormContext.Provider value={contextValue}>{children}</WelcomeFormContext.Provider>;
}

export function useWelcomeFlowContext() {
  return useContext(WelcomeFormContext);
}
