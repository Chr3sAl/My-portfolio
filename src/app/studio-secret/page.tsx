"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { BlogPost, blogPosts } from "@/data/blogPosts";
import { Project, projects } from "@/data/projects";
import {
  loadBlogPosts,
  loadProjects,
  saveBlogPosts,
  saveProjects,
} from "@/lib/contentStorage";

const SECRET_PASSCODE = "ctoky-studio";

type Tab = "posts" | "projects";

const defaultPost: BlogPost = {
  slug: "",
  title: "",
  category: "Tech",
  excerpt: "",
  content: "",
  image: "/placeholder.jpg",
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  readTime: "5 min read",
  views: 0,
  comments: 0,
  featured: false,
};

const defaultProject: Project = {
  slug: "",
  title: "",
  subtitle: "",
  shortDescription: "",
  heroImage: "/placeholder.jpg",
  detailImage: "/placeholder.jpg",
  accent: "from-sky-50 to-cyan-50",
  builtWith: [],
  github: "",
  live: "",
  demo: "",
  sections: {},
};

const iconByTech: Record<string, string> = {
  nextjs: "nextjs",
  react: "react",
  typescript: "typescript",
  prisma: "prisma",
  nestjs: "nestjs",
  postgresql: "postgresql",
  java: "java",
  spring: "spring",
  vercel: "vercel",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function StudioSecretPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [tab, setTab] = useState<Tab>("posts");

  const [postList, setPostList] = useState<BlogPost[]>(blogPosts);
  const [projectList, setProjectList] = useState<Project[]>(projects);

  const [editingPostSlug, setEditingPostSlug] = useState<string | null>(null);
  const [editingProjectSlug, setEditingProjectSlug] = useState<string | null>(null);

  const [postForm, setPostForm] = useState<BlogPost>(defaultPost);
  const [projectForm, setProjectForm] = useState<Project>(defaultProject);
  const [techListInput, setTechListInput] = useState("");

  useEffect(() => {
    setPostList(loadBlogPosts());
    setProjectList(loadProjects());
  }, []);

  const postCount = useMemo(() => postList.length, [postList]);
  const projectCount = useMemo(() => projectList.length, [projectList]);

  const unlock = (e: FormEvent) => {
    e.preventDefault();
    if (passcode === SECRET_PASSCODE) {
      setIsUnlocked(true);
      setPasscode("");
      return;
    }
    alert("Wrong passcode");
  };

  const upsertPost = (e: FormEvent) => {
    e.preventDefault();
    const slug = postForm.slug || slugify(postForm.title);
    if (!slug || !postForm.title || !postForm.content) return;

    const item = { ...postForm, slug };
    const next = editingPostSlug
      ? postList.map((post) => (post.slug === editingPostSlug ? item : post))
      : [item, ...postList.filter((post) => post.slug !== slug)];

    setPostList(next);
    saveBlogPosts(next);
    setPostForm(defaultPost);
    setEditingPostSlug(null);
  };

  const upsertProject = (e: FormEvent) => {
    e.preventDefault();
    const slug = projectForm.slug || slugify(projectForm.title);
    if (!slug || !projectForm.title || !projectForm.shortDescription) return;

    const builtWith = techListInput
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => {
        const key = slugify(name);
        return {
          name,
          icon: iconByTech[key] || "react",
          badge: "bg-slate-100 text-slate-700",
        };
      });

    const item = { ...projectForm, slug, builtWith };

    const next = editingProjectSlug
      ? projectList.map((project) => (project.slug === editingProjectSlug ? item : project))
      : [item, ...projectList.filter((project) => project.slug !== slug)];

    setProjectList(next);
    saveProjects(next);
    setProjectForm(defaultProject);
    setTechListInput("");
    setEditingProjectSlug(null);
  };

  const startPostEdit = (post: BlogPost) => {
    setEditingPostSlug(post.slug);
    setPostForm(post);
    setTab("posts");
  };

  const startProjectEdit = (project: Project) => {
    setEditingProjectSlug(project.slug);
    setProjectForm(project);
    setTechListInput(project.builtWith.map((tech) => tech.name).join(", "));
    setTab("projects");
  };

  if (!isUnlocked) {
    return (
      <PageWrapper>
        <Navbar />
        <section className="px-6 py-16 md:px-10">
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">Secret Studio</h1>
            <p className="mt-2 text-sm text-slate-600">Private content manager for posts and projects.</p>
            <form onSubmit={unlock} className="mt-4 space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                placeholder="Enter secret passcode"
              />
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-white" type="submit">
                Unlock
              </button>
            </form>
          </div>
        </section>
        <BottomNav />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Navbar />
      <section className="space-y-6 px-6 py-10 md:px-10">
        <header>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Secret Studio</h1>
          <p className="mt-2 text-slate-600">Manage posts ({postCount}) and projects ({projectCount}) without changing code.</p>
        </header>

        <div className="flex gap-3">
          <button
            onClick={() => setTab("posts")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === "posts" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Posts
          </button>
          <button
            onClick={() => setTab("projects")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === "projects" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Projects
          </button>
        </div>

        {tab === "posts" ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
            <form onSubmit={upsertPost} className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">{editingPostSlug ? "Edit Post" : "Create Post"}</h2>
              <input value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} placeholder="Title" className="w-full rounded-xl border px-3 py-2" />
              <input value={postForm.slug} onChange={(e) => setPostForm({ ...postForm, slug: slugify(e.target.value) })} placeholder="Slug (optional)" className="w-full rounded-xl border px-3 py-2" />
              <input value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value as BlogPost["category"] })} placeholder="Category" className="w-full rounded-xl border px-3 py-2" />
              <input value={postForm.image} onChange={(e) => setPostForm({ ...postForm, image: e.target.value })} placeholder="Image path" className="w-full rounded-xl border px-3 py-2" />
              <textarea value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} placeholder="Excerpt" className="min-h-20 w-full rounded-xl border px-3 py-2" />
              <textarea value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} placeholder="Content" className="min-h-32 w-full rounded-xl border px-3 py-2" />
              <button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 text-white">Save Post</button>
            </form>

            <div className="space-y-2 rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">Existing Posts</h2>
              {postList.map((post) => (
                <button key={post.slug} onClick={() => startPostEdit(post)} className="block w-full rounded-xl border px-3 py-2 text-left hover:bg-slate-50">
                  <p className="font-medium text-slate-900">{post.title}</p>
                  <p className="text-xs text-slate-500">/{post.slug}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
            <form onSubmit={upsertProject} className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">{editingProjectSlug ? "Edit Project" : "Create Project"}</h2>
              <input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Title" className="w-full rounded-xl border px-3 py-2" />
              <input value={projectForm.slug} onChange={(e) => setProjectForm({ ...projectForm, slug: slugify(e.target.value) })} placeholder="Slug (optional)" className="w-full rounded-xl border px-3 py-2" />
              <input value={projectForm.subtitle} onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })} placeholder="Subtitle" className="w-full rounded-xl border px-3 py-2" />
              <input value={projectForm.heroImage} onChange={(e) => setProjectForm({ ...projectForm, heroImage: e.target.value })} placeholder="Hero image path" className="w-full rounded-xl border px-3 py-2" />
              <textarea value={projectForm.shortDescription} onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })} placeholder="Short description" className="min-h-20 w-full rounded-xl border px-3 py-2" />
              <textarea value={techListInput} onChange={(e) => setTechListInput(e.target.value)} placeholder="Tech list (comma separated)" className="min-h-14 w-full rounded-xl border px-3 py-2" />
              <textarea value={projectForm.sections.inspiration || ""} onChange={(e) => setProjectForm({ ...projectForm, sections: { ...projectForm.sections, inspiration: e.target.value } })} placeholder="Inspiration" className="min-h-20 w-full rounded-xl border px-3 py-2" />
              <textarea value={projectForm.sections.whatItDoes || ""} onChange={(e) => setProjectForm({ ...projectForm, sections: { ...projectForm.sections, whatItDoes: e.target.value } })} placeholder="What it does" className="min-h-20 w-full rounded-xl border px-3 py-2" />
              <textarea value={projectForm.sections.howWeBuiltIt || ""} onChange={(e) => setProjectForm({ ...projectForm, sections: { ...projectForm.sections, howWeBuiltIt: e.target.value } })} placeholder="How built" className="min-h-20 w-full rounded-xl border px-3 py-2" />
              <button type="submit" className="rounded-xl bg-sky-600 px-4 py-2 text-white">Save Project</button>
            </form>

            <div className="space-y-2 rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">Existing Projects</h2>
              {projectList.map((project) => (
                <button key={project.slug} onClick={() => startProjectEdit(project)} className="block w-full rounded-xl border px-3 py-2 text-left hover:bg-slate-50">
                  <p className="font-medium text-slate-900">{project.title}</p>
                  <p className="text-xs text-slate-500">/{project.slug}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
      <BottomNav />
    </PageWrapper>
  );
}
