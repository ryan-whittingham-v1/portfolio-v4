import Head from 'next/head';

import styles from '../styles/header.module.css';
import AlternatingDisplay from './AlternatingDisplay';
import MainAnimation from './MainAnimation';
import ScrollTo from './ScrollTo';

export default function Header(props) {
  return (
    <div>
      <Head>
        <title>Ryan Whittingham</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <MainAnimation />
        <h1>RYAN WHITTINGHAM</h1>

        <div className={styles.description}>
          <AlternatingDisplay text={['DESIGN', 'DEVELOP', 'DIGITAL', 'DATA']} />
        </div>
        <ScrollTo targetRef={props.targetRef} />
      </header>
    </div>
  );
}
