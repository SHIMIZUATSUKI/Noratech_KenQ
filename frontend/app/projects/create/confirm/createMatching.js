// createMatching.js
const createMatching = async (project_id) => {
    const body = JSON.stringify({
      project_id
    });
  
    const response = await fetch(`http://127.0.0.1:5000/matching?project_id=${project_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  
    if (!response.ok) {
      const errorData = await response.json(); // エラーレスポンスの内容を取得
      console.error('Error Response:', errorData);
      throw new Error(`Failed to create matching: ${response.status}`);
    }
  
    return response.json();
  };
  
export default createMatching;
