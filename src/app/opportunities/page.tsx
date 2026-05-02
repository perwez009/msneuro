import Footer from "@/components/Footer";
import Header from "@/components/Header";
import pagesContent from "@/content/pages.json";
import opportunitiesContent from "@/content/opportunities.json";

type Opportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  workModel: string;
  opportunityType: string;
  source: string;
  sourceUrl: string;
  postedDate: string | null;
  applyBy: string | null;
  url: string;
};

function formatDate(dateValue: string | null): string {
  if (!dateValue) {
    return "Not specified";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Not specified";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function getLastUpdatedLabel() {
  const generatedAt = opportunitiesContent.generatedAt;
  const fallback = "Not available";

  if (!generatedAt) return fallback;

  const date = new Date(generatedAt);
  if (Number.isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(date);
}

export default function OpportunitiesPage() {
  const opportunities = (opportunitiesContent.items || []) as Opportunity[];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gray-900 text-gray-300">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {pagesContent.opportunities.title}
            </h2>
            <p className="text-lg text-gray-400">{pagesContent.opportunities.description}</p>
            <p className="mt-3 text-sm text-gray-500">
              Automated feed with internships, full-time, part-time, contract, remote and on-site roles.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-white/10 bg-slate-900/50 p-5 text-sm text-slate-300">
            <p>
              <span className="font-semibold text-white">Last updated:</span> {getLastUpdatedLabel()}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-white">Sources:</span>{" "}
              {(opportunitiesContent.sources || []).join(", ") || "Not available"}
            </p>
          </div>

          {opportunities.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 text-center text-slate-300">
              <p>No opportunities are available right now.</p>
              <p className="mt-2 text-sm text-slate-400">
                Run <code className="rounded bg-slate-800 px-2 py-1">npm run update:opportunities</code> to
                refresh the feed.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {opportunities.map((opportunity) => (
                <article
                  key={opportunity.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-sm transition hover:border-sky-400/30"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{opportunity.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">
                        {opportunity.company} • {opportunity.location}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-sky-300/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
                          {opportunity.opportunityType}
                        </span>
                        <span className="rounded-full border border-indigo-300/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200">
                          {opportunity.workModel}
                        </span>
                      </div>
                    </div>
                    <a
                      href={opportunity.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-400"
                    >
                      Apply
                    </a>
                  </div>

                  <div className="mt-5 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
                    <p>
                      <span className="font-semibold text-white">Job source:</span>{" "}
                      <a href={opportunity.sourceUrl} target="_blank" rel="noreferrer" className="text-sky-300 hover:text-sky-200">
                        {opportunity.source}
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Date of posting:</span>{" "}
                      {formatDate(opportunity.postedDate)}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Last date to apply:</span>{" "}
                      {formatDate(opportunity.applyBy)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
