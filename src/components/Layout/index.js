import React, { Children } from 'react'
import { Grid, Box } from '@material-ui/core'
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

import SideMenu from '../SideMenu';

Router.onRouteChangeStart = url => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default function Layout({ children, ...props }) {


  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" />
      </Head>
      <Grid container wrap="wrap" >
        <SideMenu />
        <Box marginLeft={20} width="100%">
          <Grid item xs={12} container justify="center">
            {children}
          </Grid>
        </Box>
      </Grid>
    </>
  )
}
