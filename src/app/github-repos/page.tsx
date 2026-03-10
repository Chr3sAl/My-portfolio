import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";

export default function GithubReposPage() {
  return (
    <PageWrapper>
      <Navbar />
      <section className="px-6 py-12 md:px-10">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          GitHub Repos
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">
          This page can show your repositories, project links, and code examples.
        </p>

        <div className="mt-10 space-y-6">
          <div className="rounded-[24px] bg-white/80 p-6 shadow-md">
            <h2 className="text-2xl font-semibold">portfolio-website</h2>
            <p className="mt-3 text-slate-600">
              My personal portfolio built with Next.js and Tailwind CSS.
            </p>
          </div>

          <div className="rounded-[24px] bg-white/80 p-6 shadow-md">
            <h2 className="text-2xl font-semibold">todo-app</h2>
            <p className="mt-3 text-slate-600">
              A simple to-do app project for practicing frontend logic.
            </p>
          </div>
        </div>
      </section>
      <BottomNav />
    </PageWrapper>
  );
}