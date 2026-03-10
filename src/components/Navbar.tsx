import Image from "next/image";
import Link from "next/link";
import { Bell, Github, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200/70 bg-white/70 px-6 py-5 md:px-10">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-slate-900">
            Christian Toky
          </span>
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
      <div className="flex items-center gap-4 md:gap-5">

        <Bell className="h-5 w-5 text-slate-600" />

        <a
          href="https://github.com/YOUR_GITHUB"
          target="_blank"
          rel="noreferrer"
          className="text-slate-700"
        >
          <Github className="h-5 w-5" />
        </a>

        <Search className="h-5 w-5 text-slate-600" />

        {/* PROFILE IMAGE */}
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={44}
          height={44}
          className="rounded-full object-cover ring-2 ring-white shadow"
        />
      </div>
    </header>
  );
}

