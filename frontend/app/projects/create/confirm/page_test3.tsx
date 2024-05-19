"use client";
import fetchProjects from "./fetchProjects";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProjectData {
    project_category: string;
    project_title: string;
    project_detail_background: string;
    project_detail_context: string;
}

export default function ConfirmPage() {
    const router = useRouter();
    const project_id = useSearchParams().get("project_id");
    const [project, setProject] = useState<ProjectData | null>(null);

    /* const [project, setProject] = useState(null); */

    useEffect(() => {
        const fetchAndSetProject = async () => {
            const customerData = await fetchProjects(project_id);
            setProject(customerData[0]);
        };
        fetchAndSetProject();
    }, []);

    return (
        <>
            <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
                <div className="alert alert-success p-4 text-center">
                    正常に作成しました
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
                    <p>Loading project details...</p>
                )}
                <button onClick={() => router.push("/projects")}>
                    <div className="btn btn-primary m-4 text-2xl">
                        戻る
                    </div>
                </button>
            </div>
        </>
    )
}