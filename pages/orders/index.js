import Head from 'next/head';

import OrdersContainer from '../../src/containers/Orders'
import styles from '../../styles/Home.module.css';
import { CssBaseline } from '@material-ui/core';

export default function Orders() {
  return (
    <>

      <div>
        <Head>
          <title>Orders Page</title>
        </Head>
        <OrdersContainer />
      </div>
    </>
  )
}