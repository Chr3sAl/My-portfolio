export type BlogPost = {
  slug: string;
  title: string;
  category: "Travel" | "Lifestyle" | "Tech" | "Photography" | "Personal";
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  views: number;
  comments: number;
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "first-client-project-retrospective",
    title: "How I Scoped My First Client Project Without Getting Overwhelmed",
    category: "Tech",
    excerpt:
      "A practical breakdown of how I turned a vague request into tasks, milestones, and a clean handoff.",
    content:
      "When I got my first real project, I made the mistake of coding before planning. I reset by writing user goals, listing constraints, and splitting the work into weekly milestones. That made communication easier and reduced rework. I also kept a short issue log with problems, attempted fixes, and final decisions so I could explain tradeoffs later.",
    image: "/placeholder.jpg",
    date: "March 18, 2026",
    readTime: "6 min read",
    views: 480,
    comments: 21,
    featured: true,
  },
  {
    slug: "debugging-payment-api-timeout",
    title: "Debugging a Payment API Timeout in Production",
    category: "Tech",
    excerpt:
      "The timeout looked random at first. Here is how I traced the root cause and fixed retries safely.",
    content:
      "I started by comparing slow and fast requests, then checked third-party latency, and finally discovered our retry logic was amplifying spikes. We switched to capped exponential backoff and better logging around status codes. Error rates dropped and response times stabilized.",
    image: "/projects/home.png",
    date: "March 14, 2026",
    readTime: "5 min read",
    views: 390,
    comments: 16,
  },
  {
    slug: "lessons-from-my-portfolio-redesign",
    title: "Lessons From Redesigning My Portfolio UI",
    category: "Lifestyle",
    excerpt:
      "What changed when I focused on content hierarchy, spacing, and interaction clarity.",
    content:
      "I removed decorative sections that distracted from core content and aligned spacing to a small scale system. Icons now have clear navigation purpose and consistent states. The redesign feels calmer and easier to scan on both desktop and mobile.",
    image: "/placeholder.jpg",
    date: "March 9, 2026",
    readTime: "4 min read",
    views: 265,
    comments: 9,
  },
  {
    slug: "photowalk-notes-city-lighting",
    title: "Photo Walk Notes: Capturing Better City Lighting",
    category: "Photography",
    excerpt:
      "Three camera habits that improved my low-light shots and story flow.",
    content:
      "I now choose one lighting direction per set, expose for highlights, and compose around reflective surfaces. Those rules keep my edits consistent and reduce noise-heavy frames.",
    image: "/placeholder.jpg",
    date: "March 5, 2026",
    readTime: "3 min read",
    views: 190,
    comments: 7,
  },
  {
    slug: "weekend-travel-reset",
    title: "Weekend Travel Reset After a Heavy Build Week",
    category: "Travel",
    excerpt:
      "Why short trips help me think better and return with stronger implementation ideas.",
    content:
      "I use short weekend trips to review notes away from my desk. Taking distance helps me prioritize backlog tasks and cut scope creep before Monday.",
    image: "/placeholder.jpg",
    date: "February 28, 2026",
    readTime: "3 min read",
    views: 170,
    comments: 5,
  },
  {
    slug: "burnout-checklist-for-students",
    title: "A Burnout Checklist I Use as a CS Student",
    category: "Personal",
    excerpt:
      "Simple signs I watch, and how I adjust study + coding blocks before performance drops.",
    content:
      "I track sleep, concentration windows, and task-switching frequency. If two signs dip for three days, I reduce daily coding hours and focus on review tasks instead of net-new features.",
    image: "/placeholder.jpg",
    date: "February 24, 2026",
    readTime: "4 min read",
    views: 220,
    comments: 11,
  },
];

export const blogCategories = ["Tech", "Lifestyle", "Travel", "Photography", "Personal"] as const;
