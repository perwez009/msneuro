import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Section = {
  href: string;
  title: string;
  description: string;
};

const sections: Section[] = [
  {
    href: "/fundamentals",
    title: "Fundamentals",
    description: "Build strong neuroscience foundations with structured concepts and visuals.",
  },
  {
    href: "/preprocessing",
    title: "Preprocessing",
    description: "Learn practical EEG cleaning, filtering, artifact removal, and feature prep.",
  },
  {
    href: "/resources",
    title: "Resources",
    description: "Get curated tools, libraries, papers, and learning material in one place.",
  },
  {
    href: "/datasets",
    title: "Public Datasets",
    description: "Browse open datasets useful for BCI experiments and ML model building.",
  },
  {
    href: "/opportunities",
    title: "Opportunities",
    description: "Discover labs, internships, and research collaborations in neurotech.",
  },
  {
    href: "/blog",
    title: "Blog",
    description: "Read modern, practical posts on neuroscience workflows and project ideas.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-14">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-sky-900/20 md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-sky-300/25 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-200">
              Modern neuroscience learning hub
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Explore neuroscience with a modern React + Tailwind experience.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
              MSNeuro helps students and researchers learn faster with curated modules, practical EEG workflows,
              and a new blog section focused on real-world applications.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="rounded-lg bg-sky-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-400"
              >
                Read the Blog
              </Link>
              <Link
                href="/fundamentals"
                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 transition hover:-translate-y-1 hover:border-sky-300/40 hover:bg-slate-900/70"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{section.description}</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
