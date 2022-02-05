import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
// import { useState, useEffect, useRef } from 'react';
import styles from '../styles/bio.module.css';

export default function Bio(props) {
  // const [visible, setVisibility] = useState(true);

  const url = buildUrl('portfolio/2020-09-02_02-02-14_490_2_na6xkg.jpg', {
    cloud: {
      cloudName: 'whittingham-io',
    },
    transformations: {
      effect: {
        quality: 1,
      },
      radius: '50',
      background: 'none',
    },
  });
  /* 
  function showContent() {
    setVisibility(!visible);
  } */

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {/* <Typewriter text={props.entry.fields.title} callback={showContent} /> */}
        <h1>{props.entry.fields.title.toUpperCase()}</h1>
      </div>
      <div className={styles.left}>
        <div className={styles.pic}>
          <Image
            src={url}
            alt="Ryan Whittingham"
            layout="fill"
            objectFit="contain"
            objectPosition="top"
            priority
          />
        </div>
      </div>
      <div className={styles.right}>
        <article className={styles.text}>
          <p>{props.entry.fields.content}</p>
        </article>
      </div>
    </section>
  );
}
