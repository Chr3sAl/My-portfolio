import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";

export default function ContactPage() {
  return (
    <PageWrapper>
      <Navbar />
      <section className="px-6 py-12 md:px-10">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">
          Feel free to reach out for collaboration, projects, or internship opportunities.
        </p>

        <div className="mt-10 max-w-2xl rounded-[24px] bg-white/80 p-8 shadow-md">
          <div className="space-y-4 text-lg text-slate-700">
            <p>
              <span className="font-semibold">Name:</span> Christian Toky
            </p>
            <p>
              <span className="font-semibold">Email:</span> your@email.com
            </p>
            <p>
              <span className="font-semibold">GitHub:</span> github.com/yourusername
            </p>
            <p>
              <span className="font-semibold">LinkedIn:</span> linkedin.com/in/yourname
            </p>
          </div>
        </div>
      </section>
      <BottomNav />
    </PageWrapper>
  );
}