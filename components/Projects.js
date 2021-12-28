import styles from '../styles/projects.module.css';
import ProjectCard from './ProjectCard';

export default function Projects(props) {
  return (
    <div className={styles.projects}>
      <p>Projects</p>
      <div>
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
