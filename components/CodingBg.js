import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import CodingAnimation from './CodingAnimation';
import styles from '../styles/codingBg.module.css';

export default function CodingBg(props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>{props.entry.fields.title}</h1>
      </div>

      <div className={styles.text}>
        <p>{props.entry.fields.content}</p>
      </div>
      <div className={styles.animation}>
        <CodingAnimation />
      </div>
    </div>
  );
}
