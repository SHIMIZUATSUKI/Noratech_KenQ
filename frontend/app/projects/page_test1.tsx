"use client";
// pages/page.jsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import fetchProjects from './fetchProjects.js';
import OneProjectInfoCard from '../../components/OneProjectInfoCard.jsx';

export default function Page() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchAndSetProjects() {
      try {
        const projectData = await fetchProjects();
        setProjects(projectData);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    }

    fetchAndSetProjects();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {projects.map((project, index) => (
        <OneProjectInfoCard key={index} {...project} />
      ))}
    </div>
  );
}
