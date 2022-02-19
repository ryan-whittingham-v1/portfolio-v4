import { fetchProjects, fetchEntry } from '../lib/contentful';
import { useRef, useEffect } from 'react';
import * as smoothscroll from 'smoothscroll-polyfill';
import styles from '../styles/index.module.css';
import Header from '../components/Header';
import Bio from '../components/Bio';
import CodingBg from '../components/CodingBg';
import Projects from '../components/Projects';
import WhyCode from '../components/WhyCode';

export default function Home({ projects, bio, coding, tools }) {
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
        <Bio entry={bio} />
      </div>
      <div>
        <CodingBg entry={tools} />
      </div>
      <div ref={projectsRef}>
        <Projects projects={projects} />
      </div>
      <div>
        <WhyCode entry={coding} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const projectRes = await fetchProjects();
  const projects = await projectRes.map((p) => {
    return p;
  });

  const bio = await fetchEntry('6rE4buGYB4xCRhmUfwjnde');
  const coding = await fetchEntry('5VeHKn0R9UjdxT0gKAPQh0');
  const tools = await fetchEntry('7ujOdgL5TF1N96LMEMyaUL');

  return {
    props: {
      projects,
      bio,
      coding,
      tools,
    },
  };
}
