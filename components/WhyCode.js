import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/whyCode.module.css';
import Typewriter from '../components/TypeWriter';

export default function Bio(props) {
  const [visible, setVisibility] = useState(false);

  const url = buildUrl(
    'portfolio/florian-olivo-4hbJ-eymZ1o-unsplash-3_xtmfxw.png',
    {
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
    }
  );

  function showContent() {
    setVisibility(!visible);
  }

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <Typewriter text={props.entry.fields.title} callback={showContent} />
        {/* <h1>{props.entry.fields.title.toUpperCase()}</h1> */}
      </div>

      {visible && (
        <>
          <div className={styles.left}>
            <div className={styles.pic}>
              <Image
                src={url}
                alt="Computer screen with code"
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
        </>
      )}
    </section>
  );
}
