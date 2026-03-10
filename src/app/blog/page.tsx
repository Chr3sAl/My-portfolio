import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";

export default function BlogPage() {
  return (
    <PageWrapper>
      <Navbar />
      <section className="px-6 py-12 md:px-10">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          Blog & Articles
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">
          This page is for your notes, articles, project writeups, and technical learning.
        </p>

        <div className="mt-10 space-y-6">
          <div className="rounded-[24px] bg-white/80 p-6 shadow-md">
            <h2 className="text-2xl font-semibold">
              How I Built My First Portfolio with Next.js
            </h2>
            <p className="mt-3 text-slate-600">
              A simple writeup about building a portfolio step by step.
            </p>
          </div>

          <div className="rounded-[24px] bg-white/80 p-6 shadow-md">
            <h2 className="text-2xl font-semibold">
              What I Learned from TypeScript as a Beginner
            </h2>
            <p className="mt-3 text-slate-600">
              Notes and lessons from learning typed JavaScript.
            </p>
          </div>
        </div>
      </section>
      <BottomNav />
    </PageWrapper>
  );
}