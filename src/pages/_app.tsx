import { NextUIProvider } from '@nextui-org/react';
import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { trpc } from '~/utils/trpc';
import '~/globals.css';
import { createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      black: '#101014',
      myBlack: '#48484e',
    }, // override dark theme colors
    radii: {
      xs: '4px',
    },
  },
});

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: theme.className,
      }}
    >
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
