"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { BlogPost, blogCategories, blogPosts } from "@/data/blogPosts";
import { Project, projects } from "@/data/projects";
import {
  loadContent,
  saveContent,
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
  date: new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
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

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Could not read image"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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
    loadContent()
      .then(({ posts, projects: savedProjects }) => {
        setPostList(posts);
        setProjectList(savedProjects);
      })
      .catch(() => {
        setPostList(blogPosts);
        setProjectList(projects);
      });
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

  const persistContent = async (nextPosts: BlogPost[], nextProjects: Project[]) => {
    try {
      await saveContent({ posts: nextPosts, projects: nextProjects });
    } catch {
      alert("Unable to save. Please try again.");
    }
  };

  const upsertPost = async (e: FormEvent) => {
    e.preventDefault();
    const slug = postForm.slug || slugify(postForm.title);
    if (!slug || !postForm.title || !postForm.content) return;

    const item = { ...postForm, slug };
    const next = editingPostSlug
      ? postList.map((post) => (post.slug === editingPostSlug ? item : post))
      : [item, ...postList.filter((post) => post.slug !== slug)];

    setPostList(next);
    await persistContent(next, projectList);
    setPostForm(defaultPost);
    setEditingPostSlug(null);
  };

  const upsertProject = async (e: FormEvent) => {
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
      ? projectList.map((project) =>
          project.slug === editingProjectSlug ? item : project,
        )
      : [item, ...projectList.filter((project) => project.slug !== slug)];

    setProjectList(next);
    await persistContent(postList, next);
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

  const deletePost = async (slug: string) => {
    const next = postList.filter((post) => post.slug !== slug);
    setPostList(next);
    await persistContent(next, projectList);
    if (editingPostSlug === slug) {
      setEditingPostSlug(null);
      setPostForm(defaultPost);
    }
  };

  const deleteProject = async (slug: string) => {
    const next = projectList.filter((project) => project.slug !== slug);
    setProjectList(next);
    await persistContent(postList, next);
    if (editingProjectSlug === slug) {
      setEditingProjectSlug(null);
      setProjectForm(defaultProject);
      setTechListInput("");
    }
  };

  const handlePostImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setPostForm((prev) => ({ ...prev, image: dataUrl }));
  };

  const handleProjectImageUpload =
    (field: "heroImage" | "detailImage") =>
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const dataUrl = await fileToDataUrl(file);
      setProjectForm((prev) => ({ ...prev, [field]: dataUrl }));
    };

  if (!isUnlocked) {
    return (
      <PageWrapper>
        <Navbar />
        <section className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_45%),linear-gradient(145deg,#f8fafc,#f1f5f9)] px-6 py-20 md:px-10">
          <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/75 p-8 shadow-[0_30px_60px_rgba(15,23,42,0.12)] backdrop-blur">
            <h1 className="text-3xl font-bold text-slate-900">Secret Studio</h1>
            <p className="mt-2 text-sm text-slate-600">
              Private control center for your posts and projects.
            </p>
            <form onSubmit={unlock} className="mt-6 space-y-4">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-sky-500 transition focus:ring"
                placeholder="Enter secret passcode"
              />
              <button
                className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow-md transition hover:brightness-110"
                type="submit"
              >
                Unlock Studio
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
      <section className="space-y-6 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_42%),linear-gradient(160deg,#f8fafc,#f1f5f9,#e0f2fe)] px-6 py-10 md:px-10">
        <header className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Secret Studio</h1>
          <p className="mt-2 text-slate-600">
            Create, edit, and delete content without changing code.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Content saved here is published through your server API and should appear on all devices viewing this site.
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Posts</p>
              <p className="mt-2 text-3xl font-bold">{postCount}</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 p-4 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-100">Projects</p>
              <p className="mt-2 text-3xl font-bold">{projectCount}</p>
            </div>
          </div>
        </header>

        <div className="flex gap-3 rounded-2xl border border-white/70 bg-white/80 p-2 backdrop-blur">
          <button
            onClick={() => setTab("posts")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              tab === "posts"
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setTab("projects")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              tab === "projects"
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            Projects
          </button>
        </div>

        {tab === "posts" ? (
          <div className="grid gap-6 lg:grid-cols-[1.25fr,1fr]">
            <form
              onSubmit={upsertPost}
              className="space-y-3 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {editingPostSlug ? "Edit Post" : "Create Post"}
              </h2>
              <input
                value={postForm.title}
                onChange={(e) =>
                  setPostForm({ ...postForm, title: e.target.value })
                }
                placeholder="Title"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <input
                value={postForm.slug}
                onChange={(e) =>
                  setPostForm({ ...postForm, slug: slugify(e.target.value) })
                }
                placeholder="Slug (optional)"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <select
                value={postForm.category}
                onChange={(e) =>
                  setPostForm({
                    ...postForm,
                    category: e.target.value as BlogPost["category"],
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              >
                {blogCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Upload featured image
                </label>
                <input type="file" accept="image/*" onChange={handlePostImageUpload} />
                <p className="mt-2 text-xs text-slate-500">
                  You can also paste an image URL below.
                </p>
              </div>
              <input
                value={postForm.image}
                onChange={(e) =>
                  setPostForm({ ...postForm, image: e.target.value })
                }
                placeholder="Image URL or uploaded image data"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <textarea
                value={postForm.excerpt}
                onChange={(e) =>
                  setPostForm({ ...postForm, excerpt: e.target.value })
                }
                placeholder="Excerpt"
                className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <textarea
                value={postForm.content}
                onChange={(e) =>
                  setPostForm({ ...postForm, content: e.target.value })
                }
                placeholder="Content"
                className="min-h-40 w-full rounded-xl border border-slate-200 px-3 py-2"
              />

              {postForm.image && (
                <img
                  src={postForm.image}
                  alt="Post preview"
                  className="h-44 w-full rounded-2xl object-cover"
                />
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white"
                >
                  Save Post
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPostSlug(null);
                    setPostForm(defaultPost);
                  }}
                  className="rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-700"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="space-y-2 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Existing Posts</h2>
              {postList.map((post) => (
                <div
                  key={post.slug}
                  className="rounded-xl border border-slate-200 bg-white p-3"
                >
                  <p className="font-medium text-slate-900">{post.title}</p>
                  <p className="text-xs text-slate-500">/{post.slug}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => startPostEdit(post)}
                      className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post.slug)}
                      className="rounded-lg bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.25fr,1fr]">
            <form
              onSubmit={upsertProject}
              className="space-y-3 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {editingProjectSlug ? "Edit Project" : "Create Project"}
              </h2>
              <input
                value={projectForm.title}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, title: e.target.value })
                }
                placeholder="Title"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <input
                value={projectForm.slug}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, slug: slugify(e.target.value) })
                }
                placeholder="Slug (optional)"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <input
                value={projectForm.subtitle}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, subtitle: e.target.value })
                }
                placeholder="Subtitle"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Upload hero image
                </label>
                <input type="file" accept="image/*" onChange={handleProjectImageUpload("heroImage")} />
              </div>
              <input
                value={projectForm.heroImage}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, heroImage: e.target.value })
                }
                placeholder="Hero image URL"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Upload detail image
                </label>
                <input type="file" accept="image/*" onChange={handleProjectImageUpload("detailImage")} />
              </div>
              <input
                value={projectForm.detailImage}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, detailImage: e.target.value })
                }
                placeholder="Detail image URL"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <textarea
                value={projectForm.shortDescription}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    shortDescription: e.target.value,
                  })
                }
                placeholder="Short description"
                className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <textarea
                value={techListInput}
                onChange={(e) => setTechListInput(e.target.value)}
                placeholder="Tech list (comma separated)"
                className="min-h-14 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <input
                value={projectForm.github || ""}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, github: e.target.value })
                }
                placeholder="GitHub URL"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <input
                value={projectForm.live || ""}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, live: e.target.value })
                }
                placeholder="Live URL"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <textarea
                value={projectForm.sections.inspiration || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    sections: {
                      ...projectForm.sections,
                      inspiration: e.target.value,
                    },
                  })
                }
                placeholder="Inspiration"
                className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <textarea
                value={projectForm.sections.whatItDoes || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    sections: {
                      ...projectForm.sections,
                      whatItDoes: e.target.value,
                    },
                  })
                }
                placeholder="What it does"
                className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2"
              />
              <textarea
                value={projectForm.sections.howWeBuiltIt || ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    sections: {
                      ...projectForm.sections,
                      howWeBuiltIt: e.target.value,
                    },
                  })
                }
                placeholder="How built"
                className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {projectForm.heroImage && (
                  <img
                    src={projectForm.heroImage}
                    alt="Project hero preview"
                    className="h-36 w-full rounded-2xl object-cover"
                  />
                )}
                {(projectForm.detailImage || projectForm.heroImage) && (
                  <img
                    src={projectForm.detailImage || projectForm.heroImage}
                    alt="Project detail preview"
                    className="h-36 w-full rounded-2xl object-cover"
                  />
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white"
                >
                  Save Project
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectSlug(null);
                    setProjectForm(defaultProject);
                    setTechListInput("");
                  }}
                  className="rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-700"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="space-y-2 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Existing Projects
              </h2>
              {projectList.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-xl border border-slate-200 bg-white p-3"
                >
                  <p className="font-medium text-slate-900">{project.title}</p>
                  <p className="text-xs text-slate-500">/{project.slug}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => startProjectEdit(project)}
                      className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project.slug)}
                      className="rounded-lg bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <BottomNav />
    </PageWrapper>
  );
}
