import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styles from '../styles/alternatingDisplay.module.css';

export default function AlternatingDisplay(props) {
  const [activeText, setActiveText] = useState(props.text[0]);
  const [index, setIndex] = useState(0);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function updateVisibleText() {
    setActiveText(props.text[index]);
    await sleep(2500);
    setIndex((index + 1) % props.text.length);
  }

  useEffect(() => {
    updateVisibleText();
  }, [index]);

  return <div className={styles.display}>{activeText}</div>;
}

AlternatingDisplay.propTypes = {
  text: PropTypes.string,
};
