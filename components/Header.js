import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/header.module.css';
import AlternatingDisplay from './AlternatingDisplay';
import MainAnimation from './MainAnimation';
import ScrollTo from './ScrollTo';

export default function Header(props) {
  const [visible, setVisibility] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function updateVisible() {
    await sleep(3500);
    setVisibility(!visible);
  }

  useEffect(() => {
    updateVisible();
  }, []);

  return (
    <div>
      <Head>
        <title>Ryan Whittingham</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <MainAnimation />
        <h1>RYAN WHITTINGHAM</h1>
        {visible && (
          <div className={styles.description}>
            <AlternatingDisplay
              text={['DEVELOP', 'DIGITAL', 'DATA', 'DESIGN']}
            />
          </div>
        )}
        <ScrollTo targetRef={props.targetRef} />
      </header>
    </div>
  );
}
