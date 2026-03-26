import Image from "next/image";
import Link from "next/link";
import { Bell, Github, Search } from "lucide-react";

const iconButtonClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200/70 bg-white/70 px-6 py-5 md:px-10">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-slate-900">Christian Toky</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-lg font-medium text-slate-700 hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            href="/projects"
            className="text-lg font-medium text-slate-700 hover:text-slate-900"
          >
            Projects
          </Link>

          <Link
            href="/tech-stack"
            className="text-lg font-medium text-slate-700 hover:text-slate-900"
          >
            Tech Stack
          </Link>
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-3">
        <Link
          href="/blog"
          aria-label="Open blog updates"
          title="Blog updates"
          className={iconButtonClass}
        >
          <Bell className="h-5 w-5" />
        </Link>

        <a
          href="https://github.com/Chr3sAl"
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitHub"
          title="GitHub"
          className={iconButtonClass}
        >
          <Github className="h-5 w-5" />
        </a>

        <Link
          href="/projects"
          aria-label="Search projects"
          title="Search projects"
          className={iconButtonClass}
        >
          <Search className="h-5 w-5" />
        </Link>

        {/* PROFILE IMAGE */}
        <Link
          href="/contact"
          aria-label="Open contact profile"
          title="Open profile"
          className="ml-1 inline-flex"
        >
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={44}
            height={44}
            className="rounded-full object-cover ring-2 ring-white shadow transition hover:opacity-90"
          />
        </Link>
      </div>
    </header>
  );
}
