import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import styles from '../styles/pic.module.css';

export default function Pic(props) {
  const url = buildUrl(props.publicId, {
    cloud: {
      cloudName: 'whittingham-io',
    },
    transformations: {
      effect: {
        effect: 'blur:1000',
        quality: 1,
      },
    },
  });
  return (
    <div className={styles.container}>
      <Image
        src={url}
        alt="Galaxy"
        layout="fill"
        objectFit="contain"
        objectPosition="top"
      />
    </div>
  );
}
