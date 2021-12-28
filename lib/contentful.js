const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
});

export async function fetchProjects() {
  const entries = await client.getEntries({
    content_type: 'project',
  });
  if (entries.items) return entries.items;
}

export async function fetchEntry(id) {
  const entry = await client.getEntry(id);
  if (entry) return entry;
}

export default { fetchProjects, fetchEntry };
