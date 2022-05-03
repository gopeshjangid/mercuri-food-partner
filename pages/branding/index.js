import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import BrandingContainer from '../../src/containers/Branding';

export default function Branding() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Menu Page</title>
      </Head>

      <main className={styles.main}>
        <BrandingContainer />
      </main>
    </div>
  )
}