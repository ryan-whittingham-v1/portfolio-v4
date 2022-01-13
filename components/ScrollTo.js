import { useState, useEffect, useRef } from 'react';

import styles from '../styles/scrollTo.module.css';

export default function ScrollTo(props) {
  const [visible, setVisibility] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function updateVisible() {
    await sleep(6000);
    setVisibility(!visible);
  }

  useEffect(() => {
    updateVisible();
  }, []);

  const scrollToRef = () =>
    props.targetRef.current.scrollIntoView({ behavior: 'smooth' });
  return (
    <>
      {visible && (
        <div className={styles.arrow}>
          <button onClick={scrollToRef}>▼</button>
        </div>
      )}
    </>
  );
}
