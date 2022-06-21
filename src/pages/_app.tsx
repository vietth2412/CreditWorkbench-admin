import 'simplebar/dist/simplebar.min.css';
import type { FC } from 'react';
import { useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import nProgress from 'nprogress';
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AuthConsumer, AuthProvider } from '../contexts/jwt-context';
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context';
import { RTL } from '../components/rtl';
import { gtm } from '../lib/gtm';
import { gtmConfig } from '../config';
import { store } from '../store';
import { createTheme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
import '../i18n';

type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
}

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Carpatin Dashboard
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeProvider
                    theme={createTheme({
                      direction: settings.direction,
                      mode: settings.theme
                    })}
                  >
                    <RTL direction={settings.direction}>
                      <CssBaseline />
                      <AuthConsumer>
                        {
                          (auth) => !auth.isInitialized
                            ? <SplashScreen />
                            : getLayout(<Component {...pageProps} />)
                        }
                      </AuthConsumer>
                      <Toaster position="top-center" />
                    </RTL>
                  </ThemeProvider>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
