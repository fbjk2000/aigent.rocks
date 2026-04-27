# 🎵 aigent.rocks

**AI Agents Working In Perfect Harmony** — A modern landing page showcasing specialised AI agents for sales, marketing, and operations. Built for European SMBs with GDPR compliance and data security at the core.

🌐 **Live:** [aigent.rocks](https://aigent.rocks)

---

## ✨ Features

### AI Agent Orchestra
- **Sales Agents** — Lead Qualifier, Proposal Generator, CRM Updater, Follow-up Manager
- **Marketing Agents** — Content Creator, SEO Optimiser, Campaign Manager, Analytics Reporter
- **Operations Agents** — Document Processor, Workflow Automator, Data Sync Manager, Report Generator

### Script Repository
Six downloadable, ready-to-use AI automation scripts:
- 📧 **Email Inbox Classifier** — AI-powered email categorisation and prioritisation (Python)
- 📝 **Meeting Notes Summariser** — Automated meeting transcript summarisation (Python)
- 📊 **CSV Data Enrichment** — Company data enrichment for contact lists (Python)
- 🧾 **Invoice Data Extractor** — PDF invoice parsing and data extraction (Python)
- 📱 **Social Post Scheduler** — AI content generation and scheduling API (Node.js)
- 🎯 **Lead Scoring Model** — ML-based lead scoring with Gradient Boosting (Python)

### Contact & CRM Integration
- Contact form with [earnrm](https://earnrm.com) CRM integration
- PostgreSQL database for lead storage and backup

### GDPR Compliance
- Privacy Policy page
- Terms of Service page
- Legal Imprint page
- Cookie consent banner

### Design
- Fully responsive dark theme
- Smooth animations with Framer Motion
- Modern UI with Radix UI components and Tailwind CSS

---

## 🛠 Tech Stack

| Category       | Technology                                      |
|----------------|--------------------------------------------------|
| Framework      | [Next.js 14](https://nextjs.org/) (App Router)  |
| Language       | TypeScript                                       |
| Styling        | Tailwind CSS, CSS Variables (HSL)                |
| UI Components  | Radix UI, Lucide React Icons                     |
| Animations     | Framer Motion                                    |
| Database       | PostgreSQL + Prisma ORM                          |
| CRM            | earnrm API integration                           |
| Package Manager| Yarn                                             |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **Yarn** (recommended) or npm
- **PostgreSQL** database (for contact form / lead storage)

### Installation

```bash
# Clone the repository
git clone https://github.com/fbjk2000/aigent.rocks.git
cd aigent.rocks

# Install dependencies
yarn install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in real values.

| Variable           | Description                                                      | Required |
|--------------------|------------------------------------------------------------------|----------|
| `DATABASE_URL`     | PostgreSQL connection string (Supabase, Neon, etc.)              | Yes      |
| `EARNRM_API_KEY`   | API key for earnrm CRM lead submission                           | Yes      |
| `ANTHROPIC_API_KEY`| Anthropic API key — powers The Conductor chat widget             | Yes      |

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed the database
npx prisma db seed
```

### Development

```bash
# Start the development server
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
# Build for production
yarn build

# Start the production server
yarn start
```

---

## 📁 Project Structure

```
aigent.rocks/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # Contact form API (earnrm + DB)
│   ├── imprint/
│   │   └── page.tsx            # Legal imprint page
│   ├── privacy/
│   │   └── page.tsx            # Privacy policy (GDPR)
│   ├── terms/
│   │   └── page.tsx            # Terms of service
│   ├── globals.css             # Global styles & CSS variables
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Main landing page
├── public/
│   ├── scripts/                # Downloadable AI automation scripts
│   │   ├── email_inbox_classifier.py
│   │   ├── meeting_notes_summarizer.py
│   │   ├── csv_data_enrichment.py
│   │   ├── invoice_data_extractor.py
│   │   ├── social_post_scheduler.js
│   │   └── lead_scoring_model.py
│   └── robots.txt
├── scripts/
│   └── safe-seed.ts            # Database seed script
├── prisma/                     # Prisma schema & migrations
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json
└── README.md
```

---

## 🌍 Deployment

This project deploys on **Netlify** via the official `@netlify/plugin-nextjs` plugin. Configuration lives in `netlify.toml`.

### Connecting to Netlify

1. Log into Netlify and click **Add new site → Import from Git**.
2. Select this repository (`fbjk2000/aigent.rocks`) and the `main` branch.
3. Build settings auto-detect from `netlify.toml` (no manual config needed).
4. In **Site configuration → Environment variables**, add:
   - `DATABASE_URL`
   - `EARNRM_API_KEY`
   - `ANTHROPIC_API_KEY`
5. Trigger a deploy. The first build runs `yarn install --immutable && yarn prisma generate && yarn build`.
6. Once green on the auto-assigned `*.netlify.app` URL, point your apex DNS at Netlify (CNAME for `www`, A record + Netlify's load balancer IPs for the apex, or switch to Netlify nameservers).

### LLM provider

The Conductor chat widget calls Anthropic's Messages API (`claude-haiku-4-5-20251001`) directly — see `app/api/chat/route.ts`. Streaming is translated from Anthropic's SSE event format into OpenAI-compatible chunks so the chat UI parser stays unchanged.

### Other deployment targets

The app is portable to Vercel, Docker, or any Node.js host that supports Next.js 14 App Router. Netlify is the chosen target for this site.

---

## 📄 Licence

All rights reserved © 2026 aigent.rocks

---

## 🤝 Contributing

This is a private project. For enquiries about custom AI agent development, visit [aigent.rocks](https://aigent.rocks) or reach out via the contact form.

---

**Made in Europe 🇪🇺**
