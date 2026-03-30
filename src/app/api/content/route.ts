import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { projects, Project } from "@/data/projects";

type ContentPayload = {
  posts: BlogPost[];
  projects: Project[];
};

const STORAGE_FILE = path.join(process.cwd(), "data", "content.json");

const defaultContent: ContentPayload = {
  posts: blogPosts,
  projects,
};

async function readContent(): Promise<ContentPayload> {
  try {
    const raw = await fs.readFile(STORAGE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<ContentPayload>;
    return {
      posts: Array.isArray(parsed.posts) ? parsed.posts : defaultContent.posts,
      projects: Array.isArray(parsed.projects)
        ? parsed.projects
        : defaultContent.projects,
    };
  } catch {
    return defaultContent;
  }
}

async function writeContent(content: ContentPayload) {
  const dir = path.dirname(STORAGE_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(STORAGE_FILE, JSON.stringify(content, null, 2), "utf-8");
}

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  try {
    const current = await readContent();
    const body = (await request.json()) as Partial<ContentPayload>;
    const next: ContentPayload = {
      posts: Array.isArray(body.posts) ? body.posts : current.posts,
      projects: Array.isArray(body.projects) ? body.projects : current.projects,
    };
    await writeContent(next);
    return NextResponse.json(next);
  } catch {
    return NextResponse.json(
      { message: "Invalid content payload" },
      { status: 400 },
    );
  }
}
