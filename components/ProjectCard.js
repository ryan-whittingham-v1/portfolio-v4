import Image from 'next/image';
import { useState } from 'react';

import styles from '../styles/projectCard.module.css';
import Project from './Project';

export default function ProjectCard(props) {
  const [details, setDetails] = useState(false);

  let { title, type, coverPhoto } = props.project;
  let { file, description } = coverPhoto.fields;

  const showContent = (e) => {
    e.preventDefault();
    setDetails(!details);
  };

  return (
    <div className={styles.container} onClick={showContent}>
      {details && (
        <Project
          project={props.project}
          close={() => {
            setDetails(!details);
          }}
        />
      )}
      <div className={styles.pic}>
        <Image
          src={`https:${file.url}`}
          alt={description}
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div className={styles.title}>
        <h2>{title}</h2>
        <p>{type}</p>
      </div>
    </div>
  );
}
