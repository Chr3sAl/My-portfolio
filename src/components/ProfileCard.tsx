import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProfileCard() {
  return (
    <section className="relative rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_50px_rgba(148,163,184,0.18)] backdrop-blur md:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Image
            src="/profile.jpg"
            alt="Christian Toky"
            width={144}
            height={144}
            className="rounded-full object-cover ring-4 ring-white shadow-xl"
          />

          <div className="min-w-0">
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
              Christian Toky
            </h2>
            <p className="mt-3 text-xl text-slate-700 md:text-3xl">
              Computer Science Student
            </p>

            <div className="mt-6 h-px w-full bg-slate-200" />

            <div className="mt-5 flex flex-wrap items-center gap-6 md:gap-12">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-orange-400 md:text-5xl">
                  1
                </span>
                <span className="pb-1 text-lg text-slate-700 md:text-2xl">
                  Project
                </span>
              </div>

              <div className="hidden h-12 w-px bg-slate-200 md:block" />

              <Link
                href="/tech-stack"
                className="text-2xl font-semibold text-teal-500 hover:underline md:text-3xl"
              >
                Tech Stack
              </Link>
            </div>
          </div>
        </div>

        <div>
          <Link
            href="/tech-stack"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-500 px-7 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            About Me
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}