import Head from 'next/head';

import App from '../src/containers/App/App';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mercuri App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App />
      </main>
    </div>
  )
}