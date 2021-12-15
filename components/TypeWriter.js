import PropTypes from 'prop-types';
import styles from '../styles/typewriter.module.css';
import { useState, useEffect } from 'react';

export default function Typewriter(props) {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [cursor, setCursor] = useState('|');

  let style = styles.text;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function updateVisibleText() {
    if (index <= props.text.length) {
      setTypedText(`${typedText + props.text.charAt(index)}`);

      await sleep(120);
      setIndex(index + 1);
    }
    if (index === props.text.length - 2) {
      setCursor('');
    }
  }

  useEffect(() => {
    updateVisibleText();
  }, [index]);

  return (
    <div className={style}>
      <h1>
        {typedText}
        {cursor}
      </h1>
    </div>
  );
}

Typewriter.propTypes = {
  text: PropTypes.string,
};
