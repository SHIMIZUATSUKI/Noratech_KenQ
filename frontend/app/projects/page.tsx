"use client";

// /projects/page.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonDestructive } from "./components/Button";
import {  ButtonSecondary } from "./components/Button2";

import fetchProjects from './fetchProjects';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchAndSetProjects() {
      const projectData = await fetchProjects();
      setProjects(projectData);
    }

    fetchAndSetProjects();
  }, []);

  return (
    <main>
      <div className="ps-5 pt-5 font-bold text-lg underline"><p>進行中の案件</p></div>
      <div className="grid lg:grid-cols-2 px-4 py-4 gap-4">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.project_title}</CardTitle>
              <CardDescription>{project.project_description || ''}</CardDescription>
            </CardHeader>
            <CardContent>
              {project.project_detail || ''}
            </CardContent>
            <div className="pl-6 flex space-x-4">
              <ButtonDestructive projectId={project.project_id} />
              <ButtonSecondary />
            </div>
            <CardFooter className="flex justify-between">
              {/* Footer content here */}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="ps-5 pt-5 font-bold text-lg underline"><p>募集を終了した案件</p></div>
      <div className="grid lg:grid-cols-2 px-4 py-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>バイオプラスティック素材を利用した梱包材の商品開発</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
          <div className="pl-6 flex space-x-4">
            <ButtonSecondary />
            <ButtonSecondary />
          </div>
          <CardFooter className="flex justify-between">
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

