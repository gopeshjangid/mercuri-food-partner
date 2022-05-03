import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NProgress from 'nprogress';

import theme from '../src/theme';
import withReduxStore from '../src/utils/with-redux-store';
import '../styles/globals.css';
import '../src/components/CommonInput/colorinput.css';
import ToastMessageProvider from '../src/context/messageContext';
import ToastMessage from '../src/components/Universal/StausMessage';
import ConnectionMessage from '../src/components/Universal/ConnectionMessage';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = (props) => {
  const { Component, pageProps } = props;
  React.useEffect(() => {

    registerServiceWorker();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Inspired by
  // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
  function forcePageReload(registration) {
    // console.log('already controlled?', Boolean(navigator.serviceWorker.controller));

    if (!navigator.serviceWorker.controller) {
      // The window client isn't currently controlled so it's a new service
      // worker that will activate immediately.
      return;
    }

    // console.log('registration waiting?', Boolean(registration.waiting));
    if (registration.waiting) {
      // SW is waiting to activate. Can occur if multiple clients open and
      // one of the clients is refreshed.
      registration.waiting.postMessage('skipWaiting');
      return;
    }

    function listenInstalledStateChange() {
      registration.installing.addEventListener('statechange', (event) => {
        // console.log('statechange', event.target.state);
        if (event.target.state === 'installed' && registration.waiting) {
          // A new service worker is available, inform the user
          registration.waiting.postMessage('skipWaiting');
        } else if (event.target.state === 'activated') {
          // Force the control of the page by the activated service worker.
          window.location.reload();
        }
      });
    }

    if (registration.installing) {
      listenInstalledStateChange();
      return;
    }

    // We are currently controlled so a new SW may be found...
    // Add a listener in case a new SW is found,
    registration.addEventListener('updatefound', listenInstalledStateChange);
  }

  async function registerServiceWorker() {
    if (
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production' &&
      window.location.host.indexOf('material-ui.com') !== -1
    ) {
      // register() automatically attempts to refresh the sw.js.
      const registration = await navigator.serviceWorker.register('/sw.js');
      // Force the page reload for users.
      forcePageReload(registration);
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ToastMessageProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
          <ToastMessage />
        </ToastMessageProvider>
      </ThemeProvider>
      <ConnectionMessage />
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);