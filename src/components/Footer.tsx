import Link from "next/link";
import footerContent from "@/content/footer.json";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} MSNeuro. {footerContent.copyrightPrefix}
        </p>
        <div className="flex items-center gap-4">
          {footerContent.links.map((linkItem) => (
            <Link key={linkItem.href} href={linkItem.href} className="transition hover:text-white">
              {linkItem.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
