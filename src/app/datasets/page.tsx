import Footer from "@/components/Footer";
import Header from "@/components/Header";
import pagesContent from "@/content/pages.json";
import datasetsContent from "@/content/datasets.json";

type DatasetItem = {
  name: string;
  summary: string;
  link: string;
};

type ModalityGroup = {
  key: string;
  label: string;
  description: string;
  datasets: DatasetItem[];
};

export default function DatasetsPage() {
  const modalities = (datasetsContent.modalities || []) as ModalityGroup[];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gray-900 text-gray-300">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">{pagesContent.datasets.title}</h2>
            <p className="text-lg text-gray-400">{pagesContent.datasets.description}</p>
            <p className="mx-auto mt-3 max-w-4xl text-sm text-gray-500">{datasetsContent.intro}</p>
          </div>

          <div className="space-y-8">
            {modalities.map((modality) => (
              <section
                key={modality.key}
                className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8"
              >
                <h3 className="text-2xl font-semibold text-white">{modality.label}</h3>
                <p className="mt-2 text-sm text-slate-400">{modality.description}</p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {modality.datasets.map((dataset) => (
                    <article
                      key={`${modality.key}-${dataset.name}`}
                      className="rounded-xl border border-white/10 bg-slate-950/60 p-5"
                    >
                      <h4 className="text-base font-semibold text-white">{dataset.name}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{dataset.summary}</p>
                      <a
                        href={dataset.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
                      >
                        View dataset
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
