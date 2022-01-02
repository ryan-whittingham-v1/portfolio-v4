import { fetchEntry } from '../../lib/contentful';

export default function Project({ entry }) {
  return <div>{entry.fields.title}</div>;
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const entry = await fetchEntry(params.id);
  // Pass post data to the page via props
  return { props: { entry } };
}
