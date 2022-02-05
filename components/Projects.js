import styles from '../styles/projects.module.css';
import ProjectCard from './ProjectCard';

export default function Projects(props) {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <h1>PROJECTS</h1>
      </div>
      <div className={styles.projects}>
        {props.projects.map((p) => {
          return <ProjectCard project={p.fields} key={p.sys.id} />;
        })}
      </div>
    </section>
  );
}
