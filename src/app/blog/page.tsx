import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import blogContent from "@/content/blog.json";
import postsContent from "@/content/posts.json";

export const metadata: Metadata = {
  title: blogContent.metadata.title,
  description: blogContent.metadata.description,
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-6 pb-16 pt-14">
        <section className="mb-10">
          <p className="text-sm uppercase tracking-wider text-sky-300">{blogContent.tag}</p>
          <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">{blogContent.heading}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{blogContent.intro}</p>
        </section>

        <div className="grid gap-5">
          {postsContent.posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 transition hover:border-sky-300/35 hover:bg-slate-900/80"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="rounded-full bg-sky-400/10 px-3 py-1 text-sky-200">{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-slate-300">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-block text-sm font-medium text-sky-300 transition hover:text-sky-200"
              >
                {blogContent.readMoreLabel} →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
