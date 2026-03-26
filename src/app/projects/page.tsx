"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import PageWrapper from "@/components/PageWrapper";
import ProjectCard from "@/components/ProjectCard";
import { Project, projects as defaultProjects } from "@/data/projects";
import { loadProjects } from "@/lib/contentStorage";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  return (
    <PageWrapper>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="mb-8 text-4xl font-bold">Projects</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <BottomNav />
    </PageWrapper>
  );
}
