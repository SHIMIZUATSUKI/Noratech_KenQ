// projects/fetchProjects.js
export default async function fetchProjects() {
    try {
      const response = await fetch('http://127.0.0.1:5000/allprojects', { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch projects');
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }