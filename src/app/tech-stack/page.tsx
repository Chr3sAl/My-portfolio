import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";

import type { IconType } from "react-icons";
import { FaJava, FaNodeJs, FaVuejs, FaAws, FaDocker, FaGitAlt } from "react-icons/fa";
import {
  SiAngular,
  SiAntdesign,
  SiAuth0,
  SiBabel,
  SiBitbucket,
  SiBootstrap,
  SiChakraui,
  SiCircleci,
  SiClerk,
  SiCss,
  SiCypress,
  SiDigitalocean,
  SiDjango,
  SiEslint,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFigma,
  SiFlask,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGo,
  SiGraphql,
  SiHeroku,
  SiHtml5,
  SiInsomnia,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiKubernetes,
  SiLaravel,
  SiMaterialdesign,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNpm,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrettier,
  SiPrisma,
  SiPnpm,
  SiPython,
  SiPytest,
  SiWails,
  SiReact,
  SiRedis,
  SiRedux,
  SiRender,
  SiRuby,
  SiSelenium,
  SiSequelize,
  SiSpring,
  SiSqlite,
  SiStorybook,
  SiSvelte,
  SiSwagger,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiWebpack,
  SiYarn,
  SiNestjs,
} from "react-icons/si";
import { TbApi, TbBrandCSharp, TbBrandOauth, TbBrandVscode } from "react-icons/tb";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { LuPackageCheck } from "react-icons/lu";

type TechItem = {
  name: string;
  icon: IconType;
  badge: string;
  text?: string;
};

type Section = {
  title: string;
  items: TechItem[];
};

const sections: Section[] = [
  {
    title: "Languages",
    items: [
      { name: "HTML5", icon: SiHtml5, badge: "bg-orange-100 text-orange-700" },
      { name: "CSS3", icon: SiCss, badge: "bg-blue-100 text-blue-700" },
      { name: "JavaScript", icon: SiJavascript, badge: "bg-yellow-100 text-yellow-800" },
      { name: "TypeScript", icon: SiTypescript, badge: "bg-sky-100 text-sky-700" },
      { name: "Python", icon: SiPython, badge: "bg-indigo-100 text-indigo-700" },
      { name: "Java", icon: FaJava, badge: "bg-red-100 text-red-700" },
      { name: "C#", icon: TbBrandCSharp, badge: "bg-emerald-100 text-emerald-700" },
      { name: "Go", icon: SiGo, badge: "bg-cyan-100 text-cyan-700" },
      { name: "PHP", icon: SiPhp, badge: "bg-violet-100 text-violet-700" },
      { name: "Ruby", icon: SiRuby, badge: "bg-rose-100 text-rose-700" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React.js", icon: SiReact, badge: "bg-cyan-100 text-cyan-700" },
      { name: "Vue.js", icon: FaVuejs, badge: "bg-emerald-100 text-emerald-700" },
      { name: "Angular", icon: SiAngular, badge: "bg-red-100 text-red-700" },
      { name: "Next.js", icon: SiNextdotjs, badge: "bg-slate-100 text-slate-700" },
      { name: "Svelte", icon: SiSvelte, badge: "bg-orange-100 text-orange-700" },
      { name: "Tailwind CSS", icon: SiTailwindcss, badge: "bg-sky-100 text-sky-700" },
      { name: "Bootstrap", icon: SiBootstrap, badge: "bg-violet-100 text-violet-700" },
      { name: "Material UI", icon: SiMaterialdesign, badge: "bg-blue-100 text-blue-700" },
      { name: "Chakra UI", icon: SiChakraui, badge: "bg-teal-100 text-teal-700" },
      { name: "Ant Design", icon: SiAntdesign, badge: "bg-cyan-100 text-cyan-700" },
      { name: "Redux", icon: SiRedux, badge: "bg-purple-100 text-purple-700" },
      { name: "Zustand", icon: LuPackageCheck, badge: "bg-amber-100 text-amber-700" },
      { name: "Recoil", icon: PiBracketsCurlyBold, badge: "bg-slate-100 text-slate-700" },
      { name: "MobX", icon: TbBrandVscode, badge: "bg-orange-100 text-orange-700" },
      { name: "Context API", icon: TbApi, badge: "bg-blue-100 text-blue-700" },
      { name: "Vite", icon: SiVite, badge: "bg-violet-100 text-violet-700" },
      { name: "Webpack", icon: SiWebpack, badge: "bg-sky-100 text-sky-700" },
      { name: "Parcel", icon: LuPackageCheck, badge: "bg-lime-100 text-lime-700" },
      { name: "Babel", icon: SiBabel, badge: "bg-yellow-100 text-yellow-800" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs, badge: "bg-green-100 text-green-700" },
      { name: "Express.js", icon: SiExpress, badge: "bg-slate-100 text-slate-700" },
      { name: "NestJS", icon: SiNestjs, badge: "bg-rose-100 text-rose-700" } as unknown as TechItem,
      { name: "Fastify", icon: LuPackageCheck, badge: "bg-slate-100 text-slate-700" },
      { name: "Django", icon: SiDjango, badge: "bg-green-100 text-green-700" },
      { name: "Flask", icon: SiFlask, badge: "bg-slate-100 text-slate-700" },
      { name: "FastAPI", icon: SiFastapi, badge: "bg-teal-100 text-teal-700" },
      { name: "Spring Boot", icon: SiSpring, badge: "bg-lime-100 text-lime-700" },
      { name: "Laravel", icon: SiLaravel, badge: "bg-red-100 text-red-700" },
      { name: "Ruby on Rails", icon: SiWails, badge: "bg-rose-100 text-rose-700" },
      { name: "ASP.NET Core", icon: TbBrandCSharp, badge: "bg-indigo-100 text-indigo-700" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, badge: "bg-sky-100 text-sky-700" },
      { name: "MySQL", icon: SiMysql, badge: "bg-blue-100 text-blue-700" },
      { name: "SQLite", icon: SiSqlite, badge: "bg-slate-100 text-slate-700" },
      { name: "SQL Server", icon: TbBrandVscode, badge: "bg-red-100 text-red-700" },
      { name: "MongoDB", icon: SiMongodb, badge: "bg-green-100 text-green-700" },
      { name: "Firebase Firestore", icon: SiFirebase, badge: "bg-yellow-100 text-yellow-800" },
      { name: "Redis", icon: SiRedis, badge: "bg-rose-100 text-rose-700" },
      { name: "Cassandra", icon: LuPackageCheck, badge: "bg-indigo-100 text-indigo-700" },
    ],
  },
  {
    title: "APIs & Communication",
    items: [
      { name: "REST API", icon: TbApi, badge: "bg-orange-100 text-orange-700" },
      { name: "GraphQL", icon: SiGraphql, badge: "bg-pink-100 text-pink-700" },
      { name: "gRPC", icon: PiBracketsCurlyBold, badge: "bg-cyan-100 text-cyan-700" },
      { name: "WebSockets", icon: TbApi, badge: "bg-blue-100 text-blue-700" },
      { name: "Postman", icon: SiPostman, badge: "bg-orange-100 text-orange-700" },
      { name: "Insomnia", icon: SiInsomnia, badge: "bg-violet-100 text-violet-700" },
      { name: "Swagger / OpenAPI", icon: SiSwagger, badge: "bg-green-100 text-green-700" },
    ],
  },
  {
    title: "Authentication & Security",
    items: [
      { name: "JWT", icon: PiBracketsCurlyBold, badge: "bg-amber-100 text-amber-700" },
      { name: "OAuth", icon: TbBrandOauth, badge: "bg-blue-100 text-blue-700" },
      { name: "Passport.js", icon: LuPackageCheck, badge: "bg-emerald-100 text-emerald-700" },
      { name: "Auth0", icon: SiAuth0, badge: "bg-slate-100 text-slate-700" },
      { name: "Firebase Auth", icon: SiFirebase, badge: "bg-yellow-100 text-yellow-800" },
      { name: "Clerk", icon: SiClerk, badge: "bg-purple-100 text-purple-700" },
    ],
  },
  {
    title: "DevOps & Deployment",
    items: [
      { name: "AWS", icon: FaAws, badge: "bg-orange-100 text-orange-700" },
      { name: "Google Cloud", icon: LuPackageCheck, badge: "bg-sky-100 text-sky-700" },
      { name: "Microsoft Azure", icon: TbBrandVscode, badge: "bg-blue-100 text-blue-700" },
      { name: "DigitalOcean", icon: SiDigitalocean, badge: "bg-cyan-100 text-cyan-700" },
      { name: "Docker", icon: FaDocker, badge: "bg-blue-100 text-blue-700" },
      { name: "Kubernetes", icon: SiKubernetes, badge: "bg-sky-100 text-sky-700" },
      { name: "GitHub Actions", icon: SiGithub, badge: "bg-slate-100 text-slate-700" },
      { name: "GitLab CI", icon: SiGitlab, badge: "bg-orange-100 text-orange-700" },
      { name: "Jenkins", icon: SiJenkins, badge: "bg-red-100 text-red-700" },
      { name: "CircleCI", icon: SiCircleci, badge: "bg-slate-100 text-slate-700" },
      { name: "Vercel", icon: SiVercel, badge: "bg-slate-100 text-slate-700" },
      { name: "Netlify", icon: SiNetlify, badge: "bg-teal-100 text-teal-700" },
      { name: "Render", icon: SiRender, badge: "bg-violet-100 text-violet-700" },
      { name: "Heroku", icon: SiHeroku, badge: "bg-purple-100 text-purple-700" },
    ],
  },
  {
    title: "Version Control",
    items: [
      { name: "Git", icon: FaGitAlt, badge: "bg-orange-100 text-orange-700" },
      { name: "GitHub", icon: SiGithub, badge: "bg-slate-100 text-slate-700" },
      { name: "GitLab", icon: SiGitlab, badge: "bg-orange-100 text-orange-700" },
      { name: "Bitbucket", icon: SiBitbucket, badge: "bg-blue-100 text-blue-700" },
    ],
  },
  {
    title: "Testing",
    items: [
      { name: "Jest", icon: SiJest, badge: "bg-rose-100 text-rose-700" },
      { name: "Mocha", icon: LuPackageCheck, badge: "bg-amber-100 text-amber-700" },
      { name: "Cypress", icon: SiCypress, badge: "bg-slate-100 text-slate-700" },
      { name: "Selenium", icon: SiSelenium, badge: "bg-lime-100 text-lime-700" },
      { name: "Vitest", icon: SiVitest, badge: "bg-green-100 text-green-700" },
    ],
  },
  {
    title: "Package Managers",
    items: [
      { name: "npm", icon: SiNpm, badge: "bg-red-100 text-red-700" },
      { name: "yarn", icon: SiYarn, badge: "bg-sky-100 text-sky-700" },
      { name: "pnpm", icon: SiPnpm, badge: "bg-orange-100 text-orange-700" },
      { name: "pip", icon: SiPytest, badge: "bg-blue-100 text-blue-700" },
      { name: "Maven / Gradle", icon: LuPackageCheck, badge: "bg-violet-100 text-violet-700" },
    ],
  },
  {
    title: "Popular Full Stack Combinations",
    items: [
      { name: "MERN Stack", icon: SiMongodb, badge: "bg-green-100 text-green-700" },
      { name: "MEAN Stack", icon: SiAngular, badge: "bg-red-100 text-red-700" },
      { name: "PERN Stack", icon: SiPostgresql, badge: "bg-sky-100 text-sky-700" },
      { name: "T3 Stack", icon: SiTrpc, badge: "bg-blue-100 text-blue-700" },
    ],
  },
  {
    title: "Other Useful Tools",
    items: [
      { name: "TypeScript", icon: SiTypescript, badge: "bg-sky-100 text-sky-700" },
      { name: "ESLint", icon: SiEslint, badge: "bg-violet-100 text-violet-700" },
      { name: "Prettier", icon: SiPrettier, badge: "bg-pink-100 text-pink-700" },
      { name: "Prisma", icon: SiPrisma, badge: "bg-slate-100 text-slate-700" },
      { name: "Sequelize", icon: SiSequelize, badge: "bg-blue-100 text-blue-700" },
      { name: "Figma", icon: SiFigma, badge: "bg-rose-100 text-rose-700" },
      { name: "Storybook", icon: SiStorybook, badge: "bg-pink-100 text-pink-700" },
    ],
  },
];

function Badge({ item }: { item: TechItem }) {
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium shadow-sm ${item.badge}`}
    >
      <Icon className="text-base" />
      {item.name}
    </span>
  );
}

export default function TechStackPage() {
  return (
    <PageWrapper>
      <Navbar />

      <section className="px-6 py-12 md:px-10">
        <div className="rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_20px_50px_rgba(148,163,184,0.15)] backdrop-blur md:p-10">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Tech Stack
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            Technologies, frameworks, tools, platforms, and stacks I use or am learning in software development.
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                  {section.title}
                </h2>

                <div className="flex flex-wrap gap-3">
                  {section.items.map((item) => (
                    <Badge key={item.name} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </PageWrapper>
  );
}



