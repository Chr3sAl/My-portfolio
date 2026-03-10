import BottomNav from "@/components/BottomNav";
import FeatureGrid from "@/components/FeatureGrid";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import ProfileCard from "@/components/ProfileCard";

export default function HomePage() {
  return (
    <PageWrapper>
      <Navbar />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(186,230,253,0.75),rgba(239,246,255,0.88),rgba(219,234,254,0.72))] px-6 pb-10 pt-10 md:px-10 md:pb-14">
        <div className="absolute right-[-80px] top-20 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-[-80px] left-10 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="relative">
          <Hero />
          <ProfileCard />
          <FeatureGrid />
        </div>
      </section>

      <BottomNav />
    </PageWrapper>
  );
}