import PropTypes from 'prop-types';
import styles from '../styles/typewriter.module.css';
import { useState, useEffect, useRef } from 'react';

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default function Typewriter(props) {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [cursor, setCursor] = useState('|');
  const headingRef = useRef(null);

  let style = styles.text;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function updateVisibleText() {
    if (index <= props.text.length) {
      setTypedText(`${typedText + props.text.charAt(index)}`);
      await sleep(120);
      setIndex(index + 1);

      if (index === props.text.length - 2) {
        setCursor('');
        if (props.callback) {
          props.callback();
        }
      }
    }
  }

  const [scrollTop, setScrollTop] = useState(headingRef.pageYOffset);

  useEffect(() => {
    // subscribe event
    document.addEventListener('scroll', debouncedHandleOnScroll);
    return () => {
      // unsubscribe event
      document.removeEventListener('scroll', debouncedHandleOnScroll);
    };
  }, []);

  const debouncedHandleOnScroll = debounce(function handleScroll() {
    setScrollTop(window.scrollY);
  }, 500);

  useEffect(() => {
    if (scrollTop > 100) {
      updateVisibleText();
    }
  }, [index, scrollTop]);

  return (
    <div className={style}>
      <h1 ref={headingRef}>
        {typedText}
        {cursor}
      </h1>
    </div>
  );
}

Typewriter.propTypes = {
  text: PropTypes.string,
};
