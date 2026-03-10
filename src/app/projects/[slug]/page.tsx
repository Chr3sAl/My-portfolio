import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { getProjectBySlug, projects } from "@/data/projects";
import { FaJava } from "react-icons/fa";

import {
  SiNextdotjs,
  SiPostgresql,
  SiTypescript,
  SiPrisma,
  SiNestjs,
  SiSpring,
  SiReact,
  SiVercel
} from "react-icons/si";

const iconMap = {
  java: FaJava,
  react: SiReact,
  typescript: SiTypescript,
  postgresql: SiPostgresql,
  spring: SiSpring,
  nextjs: SiNextdotjs,
  vercel: SiVercel,
  prisma: SiPrisma,
  nestjs: SiNestjs
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageWrapper>
      <Navbar />

      <section className="px-6 py-12 md:px-10">
        <div className="rounded-[32px] border border-white/70 bg-white/75 shadow-[0_20px_50px_rgba(148,163,184,0.15)] backdrop-blur">
          <div className="rounded-t-[32px] bg-[linear-gradient(135deg,#dbeafe,#eff6ff,#e0f2fe)] px-6 py-12 md:px-10">
            <div className="mx-auto max-w-5xl">
              <Link
                href="/projects"
                className="text-sm font-semibold text-sky-600 hover:underline"
              >
                ← Back to Projects
              </Link>

              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-4xl font-bold text-slate-900 md:text-6xl">
                  {project.title}
                </h1>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-teal-600 hover:shadow-lg"
                  >
                    Visit
                  </a>
                )}
              </div>

              <p className="mt-3 text-xl text-slate-700">
                {project.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.builtWith.map((tech) => {
                  const Icon = iconMap[tech.icon as keyof typeof iconMap];

                  return (
                    <span
                      key={tech.name}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm ${tech.badge}`}
                    >
                      {Icon ? <Icon className="text-base" /> : null}
                      {tech.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
            <div className="relative mb-10 h-[320px] w-full overflow-hidden rounded-[24px] bg-slate-50 shadow-md md:h-[460px]">
              <Image
                src={project.detailImage || project.heroImage}
                alt={project.title}
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-10">
              {project.sections.inspiration && (
                <section>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Inspiration
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    {project.sections.inspiration}
                  </p>
                </section>
              )}

              {project.sections.whatItDoes && (
                <section>
                  <h2 className="text-3xl font-bold text-slate-900">
                    What it does
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    {project.sections.whatItDoes}
                  </p>
                </section>
              )}

              {project.sections.howWeBuiltIt && (
                <section>
                  <h2 className="text-3xl font-bold text-slate-900">
                    How we built it
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    {project.sections.howWeBuiltIt}
                  </p>
                </section>
              )}

              {project.sections.challenges && (
                <section>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Challenges we ran into
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    {project.sections.challenges}
                  </p>
                </section>
              )}

              {project.sections.accomplishments && (
                <section>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Accomplishments that we&apos;re proud of
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    {project.sections.accomplishments}
                  </p>
                </section>
              )}

              {project.sections.whatWeLearned && (
                <section>
                  <h2 className="text-3xl font-bold text-slate-900">
                    What we learned
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    {project.sections.whatWeLearned}
                  </p>
                </section>
              )}

              {project.sections.nextSteps && (
                <section>
                  <h2 className="text-3xl font-bold text-slate-900">
                    What&apos;s next for {project.title}
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-700">
                    {project.sections.nextSteps}
                  </p>
                </section>
              )}

              <section>
                <h2 className="text-3xl font-bold text-slate-900">
                  Built With
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {project.builtWith.map((tech) => {
                    const Icon = iconMap[tech.icon as keyof typeof iconMap];

                    return (
                      <span
                        key={tech.name}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm ${tech.badge}`}
                      >
                        {Icon ? <Icon className="text-base" /> : null}
                        {tech.name}
                      </span>
                    );
                  })}
                </div>
              </section>

              {(project.github || project.demo) && (
                <section>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Try it out
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                      >
                        GitHub Repo
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-sky-200 bg-white px-6 py-3 font-semibold text-sky-700 shadow-sm transition hover:bg-sky-50"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </PageWrapper>
  );
}