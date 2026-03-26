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

Create a `.env` file in the project root:

```env
# PostgreSQL connection string
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# earnrm CRM API key (for contact form integration)
EARNRM_API_KEY=your_earnrm_api_key_here
```

| Variable        | Description                                  | Required |
|-----------------|----------------------------------------------|----------|
| `DATABASE_URL`  | PostgreSQL connection string                 | Yes      |
| `EARNRM_API_KEY`| API key for earnrm CRM lead submission       | Yes      |

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

This project is optimised for deployment on:

- **Vercel** (recommended for Next.js)
- **Docker** / any Node.js hosting platform
- **AWS / GCP / Azure** with standalone output mode

For standalone builds:

```bash
NEXT_OUTPUT_MODE=standalone yarn build
```

Ensure your deployment environment has the required environment variables (`DATABASE_URL`, `EARNRM_API_KEY`) configured.

---

## 📄 Licence

All rights reserved © 2026 aigent.rocks

---

## 🤝 Contributing

This is a private project. For enquiries about custom AI agent development, visit [aigent.rocks](https://aigent.rocks) or reach out via the contact form.

---

**Made in Europe 🇪🇺**
