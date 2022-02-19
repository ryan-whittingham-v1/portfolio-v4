import Image from 'next/image';

import styles from '../styles/project.module.css';

export default function Project(props) {
  let { title, date, type, about, techStack, repo, url, images } =
    props.project;

  const hideContent = (e) => {
    e.stopPropagation();
    props.close();
  };

  const preventHide = (e) => {
    e.stopPropagation();
  };

  return (
    <article className={styles.container} onClick={hideContent}>
      <div className={styles.modal} onClick={preventHide}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>{title}</h2>
            <p>{date.substring(0, 10)}</p>
          </div>
          <button className={styles.close} type="button" onClick={hideContent}>
            X
          </button>
        </div>

        <div className={styles.main}>
          <div className={styles.about}>
            <p>{about}</p>
            <div className={styles.links}>
              <div className={styles.demo}>
                <a href={url} target="_blank">
                  Live Demo
                </a>
              </div>
              <div className={styles.repo}>
                <a href={repo} target="_blank">
                  Github Repo
                </a>
              </div>
            </div>
          </div>
          <div className={styles.stack}>
            <h4>TECH STACK</h4>
            <ul>
              {techStack.map((tech, index) => {
                return <li key={index}>{tech}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
