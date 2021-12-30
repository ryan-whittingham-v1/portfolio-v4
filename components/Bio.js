import styles from '../styles/bio.module.css';
import Pic from '../components/Pic';

export default function Bio(props) {
  return (
    <div className={styles.bio}>
      <h1>{props.bio.fields.title}</h1>
      <p>{props.bio.fields.content}</p>
      <Pic
        publicId={'portfolio/69dd4c4b-047e-4965-b289-e53849985bc1_2_epoybd'}
      />
    </div>
  );
}
