import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import CodingAnimation from './CodingAnimation';
import styles from '../styles/codingBg.module.css';

export default function CodingBg(props) {
  const [binary, setBinary] = useState(true);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function translateBinary() {
    await sleep(6000);
    setBinary(!binary);
  }

  useEffect(() => {
    translateBinary();
  }, []);

  console.log(props.entry.fields.content);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>{props.entry.fields.title.toUpperCase()} </h1>
      </div>
      <div className={styles.text}>
        <ReactMarkdown>{props.entry.fields.content}</ReactMarkdown>
      </div>
      <div className={styles.animation}>
        <CodingAnimation />
      </div>
    </div>
  );
}
