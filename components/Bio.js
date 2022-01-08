import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/bio.module.css';
import Pic from '../components/Pic';
import Typewriter from '../components/TypeWriter';

export default function Bio(props) {
  const [visible, setVisibility] = useState(false);

  const url = buildUrl(
    'portfolio/69dd4c4b-047e-4965-b289-e53849985bc1_2_epoybd.png',
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
    <div className={styles.container}>
      <div className={styles.heading}>
        <Typewriter text={props.entry.fields.title} callback={showContent} />
      </div>
      {visible && (
        <div className={styles.content}>
          <div className={styles.text}>
            <p>{props.entry.fields.content}</p>
          </div>
          <div className={styles.picContainer}>
            <div className={styles.pic}>
              <Image
                src={url}
                alt="Ryan Whittingham"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
