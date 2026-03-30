import { BlogPost, blogPosts } from "@/data/blogPosts";
import { Project, projects } from "@/data/projects";

type ContentPayload = {
  posts: BlogPost[];
  projects: Project[];
};

const CONTENT_ENDPOINT = "/api/content";

async function fetchContent(): Promise<ContentPayload> {
  try {
    const response = await fetch(CONTENT_ENDPOINT, { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load content");
    const parsed = (await response.json()) as Partial<ContentPayload>;
    return {
      posts: Array.isArray(parsed.posts) ? parsed.posts : blogPosts,
      projects: Array.isArray(parsed.projects) ? parsed.projects : projects,
    };
  } catch {
    return { posts: blogPosts, projects };
  }
}

async function putContent(payload: ContentPayload) {
  const response = await fetch(CONTENT_ENDPOINT, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Could not save content");
  }
}

export async function loadContent(): Promise<ContentPayload> {
  return fetchContent();
}

export async function saveContent(payload: ContentPayload) {
  await putContent(payload);
}

export async function loadBlogPosts(): Promise<BlogPost[]> {
  const content = await fetchContent();
  return content.posts;
}

export async function saveBlogPosts(items: BlogPost[]) {
  const content = await fetchContent();
  await putContent({ ...content, posts: items });
}

export async function loadProjects(): Promise<Project[]> {
  const content = await fetchContent();
  return content.projects;
}

export async function saveProjects(items: Project[]) {
  const content = await fetchContent();
  await putContent({ ...content, projects: items });
}
