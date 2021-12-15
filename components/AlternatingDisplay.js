import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styles from '../styles/alternatingDisplay.module.css';

export default function AlternatingDisplay(props) {
  const [activeText, setActiveText] = useState('');
  const [index, setIndex] = useState(0);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function updateVisibleText() {
    setActiveText(props.text[index]);
    await sleep(2000);
    setIndex((index + 1) % props.text.length);
  }

  useEffect(() => {
    updateVisibleText();
  }, [index]);

  return <div className={styles.display}>{activeText}</div>;
}
