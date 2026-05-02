# MSNeuro

MSNeuro is a modern neuroscience website built with **Next.js**, **React**, and **Tailwind CSS**.  
It provides a clean, responsive interface for learning neuroscience topics, exploring resources, and reading blog content.

## Features

- Modern landing page with gradient visual styling
- Responsive navigation and mobile menu
- Structured sections for:
  - Fundamentals
  - Preprocessing
  - Resources
  - Datasets
  - Opportunities
- Blog section with:
  - Blog listing page
  - Dynamic post pages (`/blog/[slug]`)

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open:
   `http://localhost:3000`

## Scripts

- `npm run dev` – start local development server
- `npm run update:opportunities` – refresh neuroscience opportunities from supported job sources
- `npm run build` – create production build
- `npm run start` – run production build locally
- `npm run lint` – run lint checks

## Main Routes

- `/` – Home
- `/fundamentals`
- `/preprocessing`
- `/resources`
- `/datasets`
- `/opportunities`
- `/forum`
- `/blog`
- `/blog/getting-started-with-eeg-preprocessing` (example post)

## Update Website Content (JSON)

You can now update most website text from JSON files in `src/content/`:

- `site.json` – global metadata
- `navigation.json` – header brand + menu links
- `footer.json` – footer text + links
- `home.json` – homepage badge, title, description, CTAs, section cards
- `pages.json` – titles/descriptions for fundamentals, preprocessing, resources, datasets, opportunities, forum
- `opportunities.json` – generated opportunities feed (job source, posting date, apply-by date)
- `blog.json` – blog page labels/headings
- `posts.json` – all blog posts and article content

## Opportunities automation

The opportunities page uses a generated feed from these job sources:
- Remotive
- Neuralink Jobs (Greenhouse)
- NeuroPace Careers (Greenhouse)
- Arbeitnow

Automation entrypoint:
```bash
npm run update:opportunities
```

The build process also refreshes this feed automatically via `prebuild`.

