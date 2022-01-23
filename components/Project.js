import Image from 'next/image';

import styles from '../styles/project.module.css';

export default function Project(props) {
  let { title, date, type, about, techStack, repo, url, images } =
    props.project;
  let { file, description } = images[0].fields;

  const hideContent = (e) => {
    e.stopPropagation();
    props.close();
  };

  const preventHide = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.container} onClick={hideContent}>
      <div className={styles.modal} onClick={preventHide}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <button className={styles.close} type="button" onClick={hideContent}>
            X
          </button>
        </div>
        {/* <h3>{type}</h3> */}
        {/* <div className={styles.pic}>
          <Image
            src={`https:${file.url}`}
            alt={description}
            layout="fill"
            objectFit="cover"
            objectPosition="50% 5%"
            priority
          />
        </div> */}

        {/* <p>{date.substring(0, 10)}</p> */}
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
                </a>{' '}
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
    </div>
  );
}
