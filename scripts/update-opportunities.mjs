import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, "..", "src", "content", "opportunities.json");

const MAX_ITEMS = 200;
const MAX_ARBEITNOW_PAGES = 5;
const REQUEST_TIMEOUT_MS = 20000;

const NEURO_KEYWORDS = [
  "neuro",
  "neuroscience",
  "neurotech",
  "brain",
  "cognitive",
  "neural",
  "eeg",
  "fmri",
  "meg",
  "bci",
  "neuroimaging",
  "neurology",
  "neuroprosthetic",
];

function stripHtml(text = "") {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toIso(value) {
  if (typeof value === "number") {
    const date = new Date(value * 1000);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function withTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeout));
}

async function fetchJson(url) {
  const response = await withTimeout(url, {
    headers: { "User-Agent": "msneuro-opportunities-bot/1.0" },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }

  return response.json();
}

function isRelevant(text) {
  const normalized = text.toLowerCase();
  return NEURO_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function normalizeWorkModel(remoteFlag, location = "") {
  if (typeof remoteFlag === "boolean") {
    return remoteFlag ? "Remote" : "On-site";
  }

  const normalized = location.toLowerCase();
  if (normalized.includes("remote")) {
    return "Remote";
  }
  if (normalized.includes("hybrid")) {
    return "Hybrid";
  }

  return location ? "On-site" : "Unspecified";
}

function normalizeOpportunityType(typeInput = "") {
  const normalized = String(typeInput).toLowerCase();

  if (normalized.includes("intern")) return "Internship";
  if (normalized.includes("full")) return "Full-time";
  if (normalized.includes("part")) return "Part-time";
  if (normalized.includes("contract")) return "Contract";
  if (normalized.includes("temp")) return "Temporary";
  if (normalized.includes("fellow")) return "Fellowship";
  if (normalized.includes("volunteer")) return "Volunteer";

  return typeInput ? typeInput : "Unspecified";
}

function stableId(source, url, title, company) {
  const raw = `${source}|${url}|${title}|${company}`.toLowerCase();
  return Buffer.from(raw).toString("base64url");
}

async function getRemotiveJobs() {
  const payload = await fetchJson("https://remotive.com/api/remote-jobs?search=neuroscience");
  const jobs = Array.isArray(payload?.jobs) ? payload.jobs : [];

  return jobs
    .filter((job) => {
      const text = `${job.title ?? ""} ${stripHtml(job.description ?? "")} ${(job.tags ?? []).join(" ")}`;
      return isRelevant(text);
    })
    .map((job) => ({
      id: stableId("remotive", job.url, job.title, job.company_name),
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location || "Remote",
      workModel: normalizeWorkModel(true, job.candidate_required_location || ""),
      opportunityType: normalizeOpportunityType(job.job_type),
      source: "Remotive",
      sourceUrl: "https://remotive.com",
      postedDate: toIso(job.publication_date),
      applyBy: null,
      url: job.url,
    }));
}

function getMetaValue(metadata, key) {
  if (!Array.isArray(metadata)) return "";
  const found = metadata.find((entry) => entry?.name === key);
  return found?.value ?? "";
}

async function getGreenhouseBoardJobs(boardToken, sourceLabel, sourceUrl) {
  const payload = await fetchJson(`https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs`);
  const jobs = Array.isArray(payload?.jobs) ? payload.jobs : [];

  return jobs
    .filter((job) => {
      const dept = getMetaValue(job.metadata, "Job Board Department Name");
      const text = `${job.title ?? ""} ${dept} ${job.location?.name ?? ""} ${job.company_name ?? ""}`;
      return isRelevant(text);
    })
    .map((job) => {
      const employmentType = getMetaValue(job.metadata, "Employment Type");
      const location = job.location?.name || "Unspecified";

      return {
        id: stableId(sourceLabel, job.absolute_url, job.title, job.company_name),
        title: job.title,
        company: job.company_name || sourceLabel,
        location,
        workModel: normalizeWorkModel(undefined, location),
        opportunityType: normalizeOpportunityType(employmentType),
        source: sourceLabel,
        sourceUrl,
        postedDate: toIso(job.first_published ?? job.updated_at),
        applyBy: null,
        url: job.absolute_url,
      };
    });
}

async function getArbeitnowJobs() {
  const aggregated = [];

  for (let page = 1; page <= MAX_ARBEITNOW_PAGES; page += 1) {
    const payload = await fetchJson(`https://www.arbeitnow.com/api/job-board-api?page=${page}`);
    const jobs = Array.isArray(payload?.data) ? payload.data : [];

    if (jobs.length === 0) {
      break;
    }

    const relevant = jobs
      .filter((job) => {
        const text = `${job.title ?? ""} ${stripHtml(job.description ?? "")} ${(job.tags ?? []).join(" ")}`;
        return isRelevant(text);
      })
      .map((job) => ({
        id: stableId("arbeitnow", job.url, job.title, job.company_name),
        title: job.title,
        company: job.company_name,
        location: job.location || "Unspecified",
        workModel: normalizeWorkModel(job.remote, job.location || ""),
        opportunityType: normalizeOpportunityType(Array.isArray(job.job_types) ? job.job_types.join(", ") : ""),
        source: "Arbeitnow",
        sourceUrl: "https://www.arbeitnow.com",
        postedDate: toIso(job.created_at),
        applyBy: null,
        url: job.url,
      }));

    aggregated.push(...relevant);
  }

  return aggregated;
}

function dedupeAndSort(items) {
  const byUrl = new Map();
  for (const item of items) {
    if (!item?.url) continue;
    if (!byUrl.has(item.url)) {
      byUrl.set(item.url, item);
    }
  }

  return [...byUrl.values()]
    .sort((a, b) => {
      const aTime = a.postedDate ? new Date(a.postedDate).getTime() : 0;
      const bTime = b.postedDate ? new Date(b.postedDate).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, MAX_ITEMS);
}

async function readExistingItems() {
  try {
    const raw = await readFile(outputPath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

async function main() {
  const sourceErrors = [];
  const aggregated = [];

  const sources = [
    {
      name: "Remotive",
      fetcher: getRemotiveJobs,
    },
    {
      name: "Neuralink Jobs",
      fetcher: () =>
        getGreenhouseBoardJobs(
          "neuralink",
          "Neuralink Jobs",
          "https://boards.greenhouse.io/neuralink",
        ),
    },
    {
      name: "NeuroPace Careers",
      fetcher: () =>
        getGreenhouseBoardJobs(
          "neuropace",
          "NeuroPace Careers",
          "https://boards.greenhouse.io/neuropace",
        ),
    },
    {
      name: "Arbeitnow",
      fetcher: getArbeitnowJobs,
    },
  ];

  for (const source of sources) {
    try {
      const rows = await source.fetcher();
      aggregated.push(...rows);
      console.log(`Fetched ${rows.length} opportunities from ${source.name}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      sourceErrors.push({ source: source.name, error: message });
      console.error(`Failed fetching ${source.name}: ${message}`);
    }
  }

  let items = dedupeAndSort(aggregated);
  if (items.length === 0) {
    items = await readExistingItems();
    console.warn("No opportunities fetched. Keeping existing opportunities.json data.");
  }

  const output = {
    generatedAt: new Date().toISOString(),
    sources: sources.map((source) => source.name),
    notes: sourceErrors.length > 0 ? sourceErrors : undefined,
    items,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Saved ${items.length} opportunities to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
