import Image from 'next/image';

import styles from '../styles/projectCard.module.css';

function Project(props) {
  let { title, type, image } = props.project;
  let { file, description } = image.fields;
  return (
    <div className={styles.container}>
      <div className={styles.pic}>
        <Image
          src={`https:${file.url}`}
          alt={description}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <h2>{title}</h2>
      <p>{type}</p>
      {/* <h3>{date.substring(0, 10)}</h3> */}
    </div>
  );
}

export default Project;
