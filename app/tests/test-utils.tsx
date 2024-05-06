import { RenderOptions, render } from '@testing-library/react-native';

import { UserProvider } from '@feature/account';

import { QueryClientProvider } from '@core/context/QueryClientProvider';

const RenderWithProviders = ({ children }: React.PropsWithChildren<Record<string, unknown>>) => {
  return (
    <QueryClientProvider>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) => render(ui, { wrapper: RenderWithProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
