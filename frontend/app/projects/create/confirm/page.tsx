"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchProjects from "./fetchProjects";
import createMatching from "./createMatching";
import { Button } from '@/components/ui/button';//←ボタンのコンポーネントをimportしてください


interface ProjectData {
  project_category: string;
  project_title: string;
  project_detail_background: string;
  project_detail_context: string;
}

export default function ConfirmPage() {
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URLSearchParamsオブジェクトを生成
    const params = new URLSearchParams(window.location.search);
    const project_id = params.get("project_id");

    if (!project_id) {
      alert("プロジェクトIDがURLに含まれていません。");
      return;
    }

    const fetchAndSetProject = async () => {
      try {
        const projectData = await fetchProjects(project_id);
        setProject(projectData[0]);
        setLoading(false);
      } catch (error) {
        console.error("プロジェクトのフェッチに失敗しました:", error);
        alert("プロジェクトのロードに失敗しました。");
      }
    };

    fetchAndSetProject();
  }, [searchParams]);

  const handleCreateMatching = async () => {
    const params = new URLSearchParams(window.location.search);
    const project_id = params.get("project_id");
    if (!project_id) return;

    try {
      const response = await createMatching(project_id);
      alert("マッチング作成に成功しました: " + response.message);
      router.push("/projects");
    } catch (error) {
      console.error("マッチングの作成に失敗しました:", error);
      alert("マッチングの作成に失敗しました。");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="alert alert-success text-2xl font-bold tracking-tight text-gray-600">
        依頼案件の登録が完了しました
      </div>
      {project ? (
        <div>
          <h3>Project Details</h3>
          <p>Category: {project.project_category}</p>
          <p>Title: {project.project_title}</p>
          <p>Background: {project.project_detail_background}</p>
          <p>Context: {project.project_detail_context}</p>
        </div>
      ) : (
        <p></p>
      )}
      <button onClick={handleCreateMatching}>
        <div className="ml-0 mt-4">
        <Button variant="outline">研究者とのマッチングに進む</Button>
          
        </div>
      </button>
    </div>
  )
}
