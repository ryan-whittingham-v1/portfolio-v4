import styles from '../styles/scrollTo.module.css';

export default function ScrollTo(props) {
  const scrollToRef = () =>
    props.targetRef.current.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className={styles.arrow}>
      <button onClick={scrollToRef}>▼</button>
    </div>
  );
}
