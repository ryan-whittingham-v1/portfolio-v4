import Head from 'next/head';
import { fetchEntries } from '../lib/contentful';
import ProjectCard from '../components/ProjectCard';
import styles from '../styles/home.module.css';
import Typewriter from '../components/TypeWriter';
import AlternatingDisplay from '../components/AlternatingDisplay';
import Scene from '../components/Scene';
import { useRef } from 'react';

export default function Home({ projects }) {
  const mainRef = useRef(null);
  const scrollToMain = () =>
    mainRef.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className={styles.container}>
      <Head>
        <title>Ryan Whittingham</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Scene />
      <section id="1">
        <header className={styles.header}>
          <h1>
            <Typewriter text="Ryan Whittingham" />
          </h1>
          <h2 className={styles.description}>
            <AlternatingDisplay
              text={['Dad', 'Web Developer', 'Designer', 'Maker']}
            />
          </h2>

          <div className={styles.arrow}>
            <button onClick={scrollToMain}>▼</button>
          </div>
        </header>
      </section>
      <section ref={mainRef}>
        <main>
          <section className={styles.projects}>
            <p>Projects</p>
            <div>
              {projects.map((p) => {
                return (
                  <ProjectCard
                    key={p.date}
                    date={p.date}
                    image={p.image.fields}
                    title={p.title}
                  />
                );
              })}
            </div>
          </section>
        </main>
      </section>

      <footer></footer>

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
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetchEntries();
  const projects = await res.map((p) => {
    return p.fields;
  });

  return {
    props: {
      projects,
    },
  };
}
