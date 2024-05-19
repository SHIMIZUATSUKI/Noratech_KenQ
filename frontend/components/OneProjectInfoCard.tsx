// src/components/OneProjectInfoCard.jsx
export default function OneProjectInfoCard({
    project_title, project_category, project_detail_background,
    project_proposal_researcher, research_field_major_classification,
    client_industry, consultation_method, time_required, reward_fee, deadline_date
  }) {
  
  // 文字列をDateオブジェクトに変換し、toDateStringを使ってフォーマットする
  const formattedDeadline = deadline_date ? new Date(deadline_date).toDateString() : 'No deadline';

  return (
    
    <div className="card bg-white shadow-md rounded-lg p-4 mb-6">
      <h3 className="text-lg font-bold">{project_title}</h3>
      <p>Category: {project_category}</p>
      <p>Background: {project_detail_background}</p>
      <p>Researcher: {project_proposal_researcher}</p>
      <p>Research Field: {research_field_major_classification}</p>
      <p>Industry: {client_industry}</p>
      <p>Consultation Method: {consultation_method}</p>
      <p>Time Required: {time_required} hours</p>
      <p>Reward: ${reward_fee}</p>
      <p>Deadline: {formattedDeadline}</p>
    </div>
  );
}
