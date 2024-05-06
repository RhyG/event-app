import { PropsWithChildren, createContext, useContext, useState } from 'react';

export type ToastType = 'INFO' | 'ERROR' | 'SUCCESS';
interface Toast {
  message: string;
  type: ToastType;
}

export type ToastContextType = {
  toast: Toast | undefined;
  showToast: ({ message, type }: { message: string; type: ToastType }) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType>({
  toast: undefined,
  showToast: () => {},
  hideToast: () => {},
});

export function ToastProvider({ children }: PropsWithChildren<{}>) {
  {
    /* This will trigger high in the tree remounts so fix that */
  }
  const [currentToast, setCurrentToast] = useState<Toast | undefined>();

  function showToast({ message, type }: { message: string; type: ToastType }) {
    setCurrentToast({ message, type });
  }

  function hideToast() {
    setCurrentToast(undefined);
  }

  return <ToastContext.Provider value={{ toast: currentToast, showToast, hideToast }}>{children}</ToastContext.Provider>;
}

export function useToastContext() {
  return useContext(ToastContext);
}
