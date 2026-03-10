import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { FaJava } from "react-icons/fa";
import {
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpring,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const iconMap = {
  java: FaJava,
  react: SiReact,
  python: SiPython,
  typescript: SiTypescript,
  postgresql: SiPostgresql,
  spring: SiSpring,
  nextjs: SiNextdotjs,
  vercel: SiVercel,
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <article className="overflow-hidden rounded-[24px] border border-white/70 bg-white/80 shadow-[0_18px_40px_rgba(148,163,184,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(59,130,246,0.18)]">
        <div className={`bg-gradient-to-br ${project.accent} p-6`}>
          <div className="relative h-56 w-full overflow-hidden rounded-[18px] bg-white/40">
            <Image
  src={project.heroImage}
  alt={project.title}
  fill
  className="object-cover object-center"
/>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900">{project.title}</h2>
          <p className="mt-1 text-base font-medium text-slate-700">
            {project.title} | {project.subtitle}
          </p>
          <p className="mt-3 text-lg text-slate-700">{project.shortDescription}</p>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-slate-200 bg-slate-50/70 px-6 py-4">
          {project.builtWith.slice(0, 6).map((tech) => {
            const Icon = iconMap[tech.icon as keyof typeof iconMap];

            return (
              <span
                key={tech.name}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium shadow-sm ${tech.badge}`}
              >
                {Icon ? <Icon className="text-base" /> : null}
                {tech.name}
              </span>
            );
          })}
        </div>
      </article>
    </Link>
  );
}