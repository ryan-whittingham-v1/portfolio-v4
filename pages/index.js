import { fetchProjects, fetchEntry } from '../lib/contentful';
import { useRef, useEffect } from 'react';
import * as smoothscroll from 'smoothscroll-polyfill';
import styles from '../styles/index.module.css';
import Header from '../components/Header';
import Bio from '../components/Bio';
import Projects from '../components/Projects';

export default function Home({ projects, entry }) {
  const bioRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <div className={styles.container}>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
      <Header targetRef={bioRef} />
      <div ref={bioRef}>
        <Bio bio={entry} />
      </div>
      <div ref={projectsRef}>
        <Projects projects={projects} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const projectRes = await fetchProjects();
  const projects = await projectRes.map((p) => {
    return p.fields;
  });

  const entry = await fetchEntry('5VeHKn0R9UjdxT0gKAPQh0');

  return {
    props: {
      projects,
      entry,
    },
  };
}
