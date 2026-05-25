import Footer from "@/components/Footer";
import Header from "@/components/Header";
import pagesContent from "@/content/pages.json";
import fundamentalsContent from "@/content/fundamentals.json";

type Pillar = {
  title: string;
  summary: string;
  topics: string[];
};

type Modality = {
  key: string;
  label: string;
  summary: string;
  bestFor: string[];
};

type LearningStep = {
  title: string;
  details: string;
};

export default function FundamentalsPage() {
  const pillars = (fundamentalsContent.pillars || []) as Pillar[];
  const modalities = (fundamentalsContent.modalities || []) as Modality[];
  const learningPath = (fundamentalsContent.learningPath || []) as LearningStep[];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gray-900 text-gray-300">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">{pagesContent.fundamentals.title}</h2>
            <p className="text-lg text-gray-400">{pagesContent.fundamentals.description}</p>
            <p className="mx-auto mt-3 max-w-4xl text-sm text-gray-500">{fundamentalsContent.intro}</p>
          </div>

          <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">Core pillars</h3>
            <p className="mt-2 text-sm text-slate-400">
              Focus on these foundations to connect biology, computation, and behavior.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-xl border border-white/10 bg-slate-950/60 p-5"
                >
                  <h4 className="text-lg font-semibold text-white">{pillar.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{pillar.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {pillar.topics.map((topic) => (
                      <li key={`${pillar.title}-${topic}`} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">Signal modalities</h3>
            <p className="mt-2 text-sm text-slate-400">
              Each modality captures different tradeoffs between temporal and spatial resolution.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {modalities.map((modality) => (
                <article
                  key={modality.key}
                  className="rounded-xl border border-white/10 bg-slate-950/60 p-5"
                >
                  <h4 className="text-lg font-semibold text-white">{modality.label}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{modality.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {modality.bestFor.map((item) => (
                      <span
                        key={`${modality.key}-${item}`}
                        className="rounded-full border border-indigo-300/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">{fundamentalsContent.learningPathHeading}</h3>
            <div className="mt-5 space-y-4">
              {learningPath.map((step, index) => (
                <div key={step.title} className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-sm text-sky-300">Step {index + 1}</p>
                  <h4 className="mt-2 text-lg font-semibold text-white">{step.title}</h4>
                  <p className="mt-2 text-sm text-slate-300">{step.details}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
