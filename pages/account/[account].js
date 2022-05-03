import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';

import Account from '../../src/containers/Account/Account';
import Menus from '../../src/containers/Menus';
import AccountContext from '../../src/context/accountContext';
import Business from '../../src/components/Business/Business';
import Layout from '../../src/components/Layout';

export default function BusinessProfileWrapper() {
  const router = useRouter();
  const pathName = router.query.account;

  const checkPathName = () => {
    switch (pathName) {
      case 'menu':
        return <Menus />
      case 'orders':
        return <h1>Orders</h1>
      default:
        return <Business />
    }
  }
  const ComponentLoad = checkPathName();
  return (
    <div>
      <Head>
        <title>BusinessProfile</title>
      </Head>
      <Layout>
        <Business />
      </Layout>
    </div>
  )
}