export default async function updateMatching(formData) {
  
    const updated_matching_id = formData.get("matching_id");
    console.log("Sending ID to Flask:", updated_matching_id);  // デバッグ用




    const body_msg = JSON.stringify({
      matching_id: updated_matching_id
    })
  
    const res = await fetch(`http://127.0.0.1:5000/matching`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body_msg,
    });
    if (!res.ok) {
      throw new Error('Failed to update matching status');
    }
    
  };