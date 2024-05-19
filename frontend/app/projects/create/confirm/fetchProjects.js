export default async function fetchProjects(id) {
  const res = await fetch(`http://127.0.0.1:5000/projects?project_id=${id}`, {cache: "no-cache"});
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

