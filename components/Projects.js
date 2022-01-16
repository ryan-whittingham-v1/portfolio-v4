import styles from '../styles/projects.module.css';
import ProjectCard from './ProjectCard';

export default function Projects(props) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>PROJECTS</h1>
      </div>
      <div className={styles.projects}>
        {props.projects.map((p) => {
          return (
            <ProjectCard
              key={p.date}
              date={p.date}
              image={p?.image?.fields}
              title={p.title}
            />
          );
        })}
      </div>
    </div>
  );
}
