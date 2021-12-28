import styles from '../styles/bio.module.css';

export default function Bio(props) {
  console.log(props.bio.fields.body);
  return (
    <div className={styles.bio}>
      <h1>{props.bio.fields.title}</h1>
      <p>{props.bio.fields.content}</p>
    </div>
  );
}
