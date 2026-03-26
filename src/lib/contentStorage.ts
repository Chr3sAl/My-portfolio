import { BlogPost, blogPosts } from "@/data/blogPosts";
import { Project, projects } from "@/data/projects";

export const BLOG_STORAGE_KEY = "portfolio-blog-posts";
export const PROJECT_STORAGE_KEY = "portfolio-projects";

export function loadBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") return blogPosts;
  const raw = window.localStorage.getItem(BLOG_STORAGE_KEY);
  if (!raw) return blogPosts;

  try {
    const parsed = JSON.parse(raw) as BlogPost[];
    return Array.isArray(parsed) ? parsed : blogPosts;
  } catch {
    return blogPosts;
  }
}

export function saveBlogPosts(items: BlogPost[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(items));
}

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return projects;
  const raw = window.localStorage.getItem(PROJECT_STORAGE_KEY);
  if (!raw) return projects;

  try {
    const parsed = JSON.parse(raw) as Project[];
    return Array.isArray(parsed) ? parsed : projects;
  } catch {
    return projects;
  }
}

export function saveProjects(items: Project[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(items));
}
