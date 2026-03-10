import Link from "next/link";
import { Bell, Briefcase, Home, User } from "lucide-react";

export default function BottomNav() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-8 border-t border-slate-200/70 bg-white/75 px-6 py-6 md:justify-around">
      <Link
        href="/"
        className="flex items-center gap-3 text-lg font-medium text-sky-500"
      >
        <Home className="h-7 w-7" />
        Home
      </Link>

      <Link
        href="/blog"
        className="flex items-center gap-3 text-lg font-medium text-slate-600"
      >
        <Bell className="h-7 w-7" />
        Blog
      </Link>

      <Link
        href="/projects"
        className="flex items-center gap-3 text-lg font-medium text-slate-600"
      >
        <Briefcase className="h-7 w-7" />
        Projects
      </Link>
    </footer>
  );
}