import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function Settings() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Settings Page</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Settings Page</h1>
      </main>
    </div>
  )
}