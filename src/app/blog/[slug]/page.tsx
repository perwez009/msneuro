import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { posts } from "../posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Article not found | MSNeuro Blog" };
  }

  return {
    title: `${post.title} | MSNeuro Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-14">
        <Link href="/blog" className="text-sm text-sky-300 transition hover:text-sky-200">
          ← Back to blog
        </Link>
        <article className="mt-6 rounded-2xl border border-white/10 bg-slate-900/50 p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="rounded-full bg-sky-400/10 px-3 py-1 text-sky-200">{post.category}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-slate-300">{post.excerpt}</p>
          <div className="mt-8 space-y-5 text-slate-200">
            {post.content.map((paragraph, index) => (
              <p key={index} className="leading-7">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
