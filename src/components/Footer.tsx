import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} MSNeuro. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="transition hover:text-white">
            Blog
          </Link>
          <Link href="/resources" className="transition hover:text-white">
            Resources
          </Link>
          <Link href="/opportunities" className="transition hover:text-white">
            Opportunities
          </Link>
        </div>
      </div>
    </footer>
  );
}
