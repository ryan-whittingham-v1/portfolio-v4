import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styles from '../styles/alternatingDisplay.module.css';

export default function AlternatingDisplay(props) {
  const [activeText, setActiveText] = useState(props.text[0]);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function updateVisibleText() {
    if (active) {
      setActiveText(props.text[index]);
      await sleep(2000);
      setIndex((index + 1) % props.text.length);
    }
  }

  async function delay(ms) {
    await sleep(ms);
    setActive(true);
  }

  useEffect(() => {
    delay(2500);
  }, []);

  useEffect(() => {
    updateVisibleText();
  }, [index, active]);

  return <div className={styles.display}>{activeText}</div>;
}
