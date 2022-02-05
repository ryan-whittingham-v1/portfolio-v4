import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import CodingAnimation from './CodingAnimation';
import styles from '../styles/codingBg.module.css';

export default function CodingBg(props) {
  /* const [binary, setBinary] = useState(true);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function translateBinary() {
    await sleep(6000);
    setBinary(!binary);
  }

  useEffect(() => {
    translateBinary();
  }, []); */

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <h1>{props.entry.fields.title.toUpperCase()} </h1>
      </div>
      <article className={styles.text}>
        <ReactMarkdown>{props.entry.fields.content}</ReactMarkdown>
      </article>
      <aside className={styles.animation}>
        <CodingAnimation />
      </aside>
    </section>
  );
}
