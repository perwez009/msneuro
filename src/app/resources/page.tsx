import Footer from "@/components/Footer";
import Header from "@/components/Header";
import pagesContent from "@/content/pages.json";
import resourcesContent from "@/content/resources.json";

type ResourceItem = {
  name: string;
  summary: string;
  link: string;
  tags?: string[];
};

type ResourceCategory = {
  key: string;
  label: string;
  description: string;
  resources: ResourceItem[];
};

export default function ResourcesPage() {
  const categories = (resourcesContent.categories || []) as ResourceCategory[];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gray-900 text-gray-300">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">{pagesContent.resources.title}</h2>
            <p className="text-lg text-gray-400">{pagesContent.resources.description}</p>
            <p className="mx-auto mt-3 max-w-4xl text-sm text-gray-500">{resourcesContent.intro}</p>
          </div>

          <div className="space-y-8">
            {categories.map((category) => (
              <section key={category.key} className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-white">{category.label}</h3>
                <p className="mt-2 text-sm text-slate-400">{category.description}</p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {category.resources.map((resource) => (
                    <article
                      key={`${category.key}-${resource.name}`}
                      className="rounded-xl border border-white/10 bg-slate-950/60 p-5"
                    >
                      <h4 className="text-base font-semibold text-white">{resource.name}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{resource.summary}</p>
                      {resource.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {resource.tags.map((tag) => (
                            <span
                              key={`${category.key}-${resource.name}-${tag}`}
                              className="rounded-full border border-sky-300/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
                      >
                        Visit resource
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
