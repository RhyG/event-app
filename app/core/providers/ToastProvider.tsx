import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface Toast {
  message: string;
}

export type ToastContextType = {
  toast: Toast | undefined;
  showToast: (message: string) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType>({
  toast: undefined,
  showToast: () => {},
  hideToast: () => {},
});

export function ToastProvider({ children }: PropsWithChildren<{}>) {
  const [currentToast, setCurrentToast] = useState<Toast | undefined>();

  function showToast(message: string) {
    setCurrentToast({ message });
  }

  function hideToast() {
    setCurrentToast(undefined);
  }

  return <ToastContext.Provider value={{ toast: currentToast, showToast, hideToast }}>{children}</ToastContext.Provider>;
}

export function useToastContext() {
  return useContext(ToastContext);
}
