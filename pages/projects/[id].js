import { fetchEntries, fetchEntry } from '../../lib/contentful';

export default function Project({ entry }) {
  return <div>{entry.fields.title}</div>;
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const entries = await fetchEntries();

  // Get the paths we want to pre-render based on posts
  const paths = entries.map((entry) => ({
    params: { id: entry.sys.id },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const entry = await fetchEntry(params.id);
  // Pass post data to the page via props
  return { props: { entry } };
}
