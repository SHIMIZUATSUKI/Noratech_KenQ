// createMatching.js

const createProject = async ({ project_category, project_title, project_detail_background, project_detail_context }) => {
    const body = JSON.stringify({
      project_title,
      project_category,
      project_detail_background,
      project_detail_context,
    });
  
    const response = await fetch(`http://127.0.0.1:5000/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  
    if (!response.ok) {
      const errorData = await response.json(); // エラーレスポンスの内容を取得
      console.error('Error Response:', errorData);
      throw new Error(`Failed to create project: ${response.status}`);
    }
  
    return response.json();
  };
  
  export default createProject;