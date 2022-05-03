import Head from 'next/head';

import SignInSide from '../../src/containers/Login/Login';

export default function RegisterN() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <SignInSide />
    </div>
  )
}