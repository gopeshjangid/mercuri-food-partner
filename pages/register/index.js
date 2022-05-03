import Head from 'next/head';

import Register from '../../src/containers/Register/Register';

export default function RegisterN() {
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <Register />
    </div>
  )
}