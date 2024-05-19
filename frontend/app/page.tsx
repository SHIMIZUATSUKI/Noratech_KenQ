import Head from 'next/head'
import styles from './Page.module.css' // CSS Moduleを使う想定です。

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to NoraTech Services</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <img src="/path-to-your-logo.png" alt="NoraTech Logo" className={styles.logo} />
          <nav className={styles.navbar}>
            <a href="#" className={styles.navItem}>Home</a>
            <a href="#" className={styles.navItem}>About</a>
            <a href="#" className={styles.navItem}>Services</a>
            <a href="#" className={styles.navItem}>Contact</a>
          </nav>
        </header>
        <main className={styles.main}>
          <div className={styles.hero}>
            <h1 className={styles.title}>Welcome to NoraTech Services</h1>
            <button className={styles.ctaButton}>Learn More</button>
          </div>
        </main>
      </div>
    </>
  )
}
