import Image from 'next/image';

import styles from '../styles/projectCard.module.css';

function Project(props) {
  let { title, type, coverPhoto } = props.project;
  let { file, description } = coverPhoto.fields;
  return (
    <div className={styles.container}>
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
        {/* <h3>{date.substring(0, 10)}</h3> */}
      </div>
    </div>
  );
}

export default Project;
