import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { blogPosts } from "@/data/blogPosts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <PageWrapper>
      <Navbar />
      <article className="bg-[linear-gradient(145deg,rgba(226,232,240,0.9),rgba(241,245,249,0.94),rgba(191,219,254,0.85))] px-6 py-12 md:px-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white/90 p-6 shadow-md md:p-10">
          <Link href="/blog" className="text-sm font-medium text-sky-600 hover:underline">
            ← Back to blog
          </Link>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-sky-600">{post.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">{post.title}</h1>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
            <span>{post.views} views</span>
            <span>{post.comments} comments</span>
          </div>

          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={640}
            className="mt-6 h-64 w-full rounded-2xl object-cover md:h-[420px]"
          />

          <p className="mt-8 text-lg leading-8 text-slate-700">{post.content}</p>
        </div>
      </article>
      <BottomNav />
    </PageWrapper>
  );
}
