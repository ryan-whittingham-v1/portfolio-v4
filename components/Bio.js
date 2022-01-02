import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import styles from '../styles/bio.module.css';
import Pic from '../components/Pic';
import Typewriter from '../components/TypeWriter';

export default function Bio(props) {
  const url = buildUrl(
    'portfolio/69dd4c4b-047e-4965-b289-e53849985bc1_2_epoybd',
    {
      cloud: {
        cloudName: 'whittingham-io',
      },
      transformations: {
        effect: {
          effect: 'blur:1000',
          quality: 1,
        },
      },
    }
  );
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Typewriter text={'npm install bio'} />
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <p>{props.bio.fields.content}</p>
        </div>
        <div className={styles.pic}>
          <Image
            src={url}
            alt="Galaxy"
            layout="fill"
            objectFit="contain"
            objectPosition="top"
          />
          {/* <Pic
            publicId={'portfolio/69dd4c4b-047e-4965-b289-e53849985bc1_2_epoybd'}
          /> */}
        </div>
      </div>
    </div>
  );
}
