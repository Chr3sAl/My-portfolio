import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import PageWrapper from "@/components/PageWrapper";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <Navbar />

      <div className="px-8 py-10">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <BottomNav />
    </PageWrapper>
  );
}