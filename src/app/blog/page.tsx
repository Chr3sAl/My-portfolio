"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { BlogPost, blogPosts } from "@/data/blogPosts";
import { loadBlogPosts } from "@/lib/contentStorage";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);

  useEffect(() => {
    setPosts(loadBlogPosts());
  }, []);

  const featuredPost = useMemo(
    () => posts.find((post) => post.featured) ?? posts[0],
    [posts],
  );
  const trendingPosts = posts.slice(0, 4);
  const listPosts = posts.filter((post) => post.slug !== featuredPost?.slug);

  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const categoryCounts = categories.map((category) => ({
    category,
    count: posts.filter((post) => post.category === category).length,
  }));

  if (!featuredPost) return null;

  return (
    <PageWrapper>
      <Navbar />
      <section className="space-y-8 bg-[linear-gradient(145deg,rgba(226,232,240,0.9),rgba(241,245,249,0.94),rgba(191,219,254,0.85))] px-6 py-10 md:px-10">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">Blog & Articles</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-700">
            I share project updates, problems I encounter, and what I learn while building.
          </p>
        </header>

        <section className="rounded-2xl bg-white/90 p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Trending Posts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-xl bg-slate-50 p-2">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={360}
                  height={200}
                  className="h-28 w-full rounded-lg object-cover"
                />
                <h3 className="mt-2 text-sm font-semibold text-slate-800 group-hover:text-sky-600">
                  {post.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{post.date}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <Link href={`/blog/${featuredPost.slug}`} className="block rounded-2xl bg-white/90 p-4 shadow-sm">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                width={900}
                height={420}
                className="h-60 w-full rounded-xl object-cover md:h-72"
              />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-sky-600">
                {featuredPost.category}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">{featuredPost.title}</h2>
              <p className="mt-2 text-slate-600">{featuredPost.excerpt}</p>
              <div className="mt-3 flex gap-4 text-xs text-slate-500">
                <span>{featuredPost.date}</span>
                <span>{featuredPost.views} views</span>
                <span>{featuredPost.comments} comments</span>
              </div>
            </Link>

            <div className="grid gap-4 sm:grid-cols-2">
              {listPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-2xl bg-white/90 p-4 shadow-sm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={420}
                    height={240}
                    className="h-40 w-full rounded-xl object-cover"
                  />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-amber-600">
                    {post.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                  <div className="mt-3 flex gap-4 text-xs text-slate-500">
                    <span>{post.date}</span>
                    <span>{post.views} views</span>
                    <span>{post.comments} comments</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-white/90 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Categories</h3>
              <ul className="mt-3 space-y-2">
                {categoryCounts.map((item) => (
                  <li key={item.category} className="flex items-center justify-between text-sm text-slate-600">
                    <span>{item.category}</span>
                    <span className="font-semibold text-slate-800">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <BottomNav />
    </PageWrapper>
  );
}
