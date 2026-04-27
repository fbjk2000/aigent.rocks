export interface AgentDetail {
  id: string;
  name: string;
  alias: string;
  instrument: string;
  instrumentImage: string;
  category: "sales" | "marketing" | "operations";
  shortDescription: string;
  fullDescription: string;
  capabilities: string[];
  useCases: string[];
  integrations: string[];
  metrics: string;
}

export const agents: AgentDetail[] = [
  // ========= SALES AGENTS =========
  {
    id: "lead-qualifier",
    name: "Lead Qualifier",
    alias: "First Violin",
    instrument: "Violin",
    instrumentImage: "/agent-images/lead-qualifier-violin.jpg",
    category: "sales",
    shortDescription: "Automatically scores and qualifies inbound leads based on your ideal customer profile",
    fullDescription: "The Lead Qualifier is the First Violin of your sales orchestra — setting the tone and leading the melody. It ingests leads from any source (web forms, LinkedIn, email, CRM imports), analyses them against your Ideal Customer Profile using configurable scoring models, and routes qualified prospects directly to the right salesperson. No more manual triage. No more missed opportunities.",
    capabilities: [
      "Multi-source lead ingestion (web forms, APIs, CSV, CRM sync)",
      "Configurable ICP scoring with weighted criteria",
      "Automatic enrichment from public data sources",
      "Real-time lead routing to sales team members",
      "Lead behaviour tracking and intent signals",
      "Duplicate detection and merge recommendations"
    ],
    useCases: [
      "An SMB receiving 200+ leads/month can reduce manual qualification time by 80%",
      "B2B SaaS companies can prioritise enterprise-fit leads over tyre-kickers",
      "Service firms can route leads by geography, budget, or industry automatically"
    ],
    integrations: ["HubSpot", "Salesforce", "Pipedrive", "earnrm", "Zapier", "Webhooks"],
    metrics: "Typically reduces lead response time from hours to minutes, increasing conversion rates by 25-40%."
  },
  {
    id: "proposal-generator",
    name: "Proposal Generator",
    alias: "Trumpet",
    instrument: "Trumpet",
    instrumentImage: "/agent-images/proposal-generator-trumpet.jpg",
    category: "sales",
    shortDescription: "Creates tailored proposals and quotes from templates using deal context",
    fullDescription: "The Trumpet announces your offer with clarity and confidence. This agent takes deal context — budget, requirements, timeline, stakeholder roles — and produces polished, on-brand proposals in minutes. It pulls from your template library, adjusts pricing models, inserts relevant case studies, and even adapts tone for different industries. Your sales team spends less time in Word and more time closing.",
    capabilities: [
      "Dynamic template selection based on deal attributes",
      "Automatic pricing calculation with discount rules",
      "Case study and testimonial insertion by industry",
      "Multi-format output (PDF, DOCX, HTML)",
      "Version tracking and approval workflows",
      "Multilingual proposal generation (EN, DE, FR, ES)"
    ],
    useCases: [
      "Consulting firms can generate bespoke proposals in 10 minutes instead of 3 hours",
      "Agencies can produce branded pitch decks with relevant portfolio examples",
      "Tech companies can auto-generate SOWs from discovery call notes"
    ],
    integrations: ["Google Docs", "Microsoft 365", "Notion", "PandaDoc", "CRM systems"],
    metrics: "Reduces proposal creation time by 75% and improves win rates by personalising every document."
  },
  {
    id: "crm-updater",
    name: "CRM Updater",
    alias: "Percussion",
    instrument: "Drums",
    instrumentImage: "/agent-images/crm-updater-drums.jpg",
    category: "sales",
    shortDescription: "Keeps your CRM data clean and updated with every customer interaction",
    fullDescription: "The Percussion section keeps the rhythm — steady, reliable, always on beat. This agent listens to every customer touchpoint (emails, calls, meetings, chat) and automatically updates your CRM records. No more 'I forgot to log it' moments. It captures interaction summaries, updates deal stages, tags contacts with new context, and flags stale records that need attention.",
    capabilities: [
      "Automatic interaction logging from email and calendar",
      "Deal stage progression based on detected signals",
      "Contact enrichment and de-duplication",
      "Stale pipeline alerts and health scoring",
      "Custom field population from unstructured data",
      "Activity timeline reconstruction"
    ],
    useCases: [
      "Sales teams can reclaim 5+ hours/week lost to manual CRM data entry",
      "Managers get accurate pipeline data without chasing reps for updates",
      "Customer success teams maintain complete relationship histories automatically"
    ],
    integrations: ["Salesforce", "HubSpot", "Pipedrive", "earnrm", "Gmail", "Outlook", "Calendly"],
    metrics: "Improves CRM data accuracy by 90% and saves each salesperson 5+ hours per week."
  },
  {
    id: "follow-up-manager",
    name: "Follow-up Manager",
    alias: "Saxophone",
    instrument: "Saxophone",
    instrumentImage: "/agent-images/follow-up-manager-saxophone.jpg",
    category: "sales",
    shortDescription: "Ensures no lead falls through the cracks with intelligent follow-up sequences",
    fullDescription: "The Saxophone plays smooth, persistent, impossible-to-ignore melodies. This agent monitors your entire pipeline and ensures every prospect gets timely, contextual follow-ups. It drafts personalised emails based on previous interactions, detects optimal send times, escalates unresponsive leads, and knows when to pause sequences to avoid over-contact. The result: nothing falls through the cracks.",
    capabilities: [
      "AI-drafted follow-up emails with personalisation",
      "Optimal send-time detection per contact",
      "Multi-channel sequencing (email, LinkedIn, SMS)",
      "Automatic escalation for high-value stale deals",
      "Sentiment analysis on reply tone",
      "Sequence pause/resume based on engagement signals"
    ],
    useCases: [
      "Sales teams can maintain 3x more active conversations without additional headcount",
      "Recruiters can nurture candidate pipelines at scale",
      "Account managers can automate renewal and upsell touchpoints"
    ],
    integrations: ["Gmail", "Outlook", "LinkedIn Sales Navigator", "Salesloft", "Outreach"],
    metrics: "Increases reply rates by 35% and ensures 100% follow-up coverage across your pipeline."
  },

  // ========= MARKETING AGENTS =========
  {
    id: "content-creator",
    name: "Content Creator",
    alias: "Grand Piano",
    instrument: "Piano",
    instrumentImage: "/agent-images/content-creator-piano.jpg",
    category: "marketing",
    shortDescription: "Generates on-brand blog posts, social content, and marketing copy",
    fullDescription: "The Grand Piano is the centrepiece of the orchestra — versatile, expressive, and capable of carrying the entire performance. This agent generates high-quality content across formats: blog articles, social media posts, email campaigns, landing page copy, and ad text. It learns your brand voice, maintains consistency, and produces content that resonates with your specific audience segments.",
    capabilities: [
      "Long-form blog post generation with SEO optimisation",
      "Social media content calendars with platform-specific formatting",
      "Email campaign copywriting with A/B variants",
      "Landing page copy generation",
      "Brand voice learning and consistency enforcement",
      "Content repurposing across formats"
    ],
    useCases: [
      "Marketing teams can produce 10x more content without increasing headcount",
      "Startups can maintain a professional content presence from day one",
      "Agencies can scale content production across multiple client brands"
    ],
    integrations: ["WordPress", "Ghost", "Webflow", "Buffer", "Mailchimp", "HubSpot"],
    metrics: "Produces publication-ready content 8x faster than manual writing, with consistent brand voice."
  },
  {
    id: "social-media-manager",
    name: "Social Media Manager",
    alias: "Electric Guitar",
    instrument: "Electric Guitar",
    instrumentImage: "/agent-images/social-media-manager-guitar.jpg",
    category: "marketing",
    shortDescription: "Schedules, posts, and engages across all your social platforms",
    fullDescription: "The Electric Guitar brings energy, edge, and amplification. This agent manages your entire social media presence — scheduling posts at optimal times, generating engaging captions, responding to comments and DMs with brand-appropriate tone, monitoring mentions, and tracking engagement trends. It turns your social channels from a chore into a growth engine.",
    capabilities: [
      "Multi-platform scheduling (LinkedIn, X, Instagram, Facebook)",
      "AI-generated captions and hashtag optimisation",
      "Automated comment response with brand-voice matching",
      "Social listening and mention monitoring",
      "Engagement analytics and trend detection",
      "Competitor activity tracking"
    ],
    useCases: [
      "SMBs can maintain active social presence with just 30 minutes/week of oversight",
      "B2B companies can build thought leadership with consistent LinkedIn engagement",
      "E-commerce brands can drive traffic with automated product showcases"
    ],
    integrations: ["Buffer", "Hootsuite", "LinkedIn API", "Meta Business Suite", "Canva"],
    metrics: "Increases social engagement by 60% while reducing time spent on social management by 85%."
  },
  {
    id: "seo-optimizer",
    name: "SEO Optimizer",
    alias: "Harp",
    instrument: "Harp",
    instrumentImage: "/agent-images/seo-optimizer-harp.jpg",
    category: "marketing",
    shortDescription: "Analyses and improves your content for search engine visibility",
    fullDescription: "The Harp weaves intricate, beautiful patterns that draw people in. This agent continuously analyses your website and content for SEO opportunities — identifying keyword gaps, optimising meta descriptions, suggesting internal linking strategies, monitoring rankings, and producing actionable reports. It ensures your content doesn't just exist, but gets found.",
    capabilities: [
      "Keyword research and opportunity identification",
      "On-page SEO analysis and recommendations",
      "Meta description and title tag optimisation",
      "Internal linking strategy suggestions",
      "Ranking monitoring and trend analysis",
      "Competitor keyword gap analysis"
    ],
    useCases: [
      "Content teams can optimise existing articles to capture 40% more organic traffic",
      "E-commerce sites can improve product page visibility across hundreds of SKUs",
      "Service businesses can dominate local search results"
    ],
    integrations: ["Google Search Console", "Ahrefs", "SEMrush", "WordPress", "Webflow"],
    metrics: "Typically drives a 40-60% increase in organic traffic within 3-6 months of implementation."
  },
  {
    id: "campaign-analyst",
    name: "Campaign Analyst",
    alias: "Cello",
    instrument: "Cello",
    instrumentImage: "/agent-images/campaign-analyst-cello.jpg",
    category: "marketing",
    shortDescription: "Tracks campaign performance and provides actionable insights",
    fullDescription: "The Cello provides depth, warmth, and grounding — the analytical backbone of the marketing section. This agent connects to all your marketing channels, aggregates performance data, identifies what's working and what's not, and delivers clear, actionable recommendations. No more spreadsheet gymnastics. Just insights you can act on immediately.",
    capabilities: [
      "Multi-channel performance dashboarding",
      "Attribution modelling across touchpoints",
      "Anomaly detection and alert system",
      "A/B test analysis with statistical significance",
      "Budget allocation recommendations",
      "Automated weekly/monthly performance reports"
    ],
    useCases: [
      "Marketing managers can make data-driven budget decisions in minutes, not days",
      "Growth teams can identify winning channels and double down quickly",
      "Agencies can produce client reports automatically with actionable commentary"
    ],
    integrations: ["Google Analytics", "Google Ads", "Meta Ads", "LinkedIn Ads", "Mailchimp"],
    metrics: "Reduces reporting time by 90% and improves marketing ROI by 20-30% through better allocation."
  },

  // ========= OPERATIONS AGENTS =========
  {
    id: "document-processor",
    name: "Document Processor",
    alias: "Flute",
    instrument: "Flute",
    instrumentImage: "/agent-images/document-processor-flute.jpg",
    category: "operations",
    shortDescription: "Extracts, categorises, and routes documents automatically",
    fullDescription: "The Flute is precise, clear, and elegantly efficient. This agent handles the document deluge — extracting key data from PDFs, images, and scans, categorising documents by type, routing them to the right team or system, and maintaining a searchable archive. From invoices to contracts to compliance paperwork, it turns document chaos into structured, actionable data.",
    capabilities: [
      "OCR and intelligent data extraction from any document format",
      "Automatic document classification and tagging",
      "Smart routing to teams, folders, or workflows",
      "Key field extraction (dates, amounts, parties, clauses)",
      "Searchable document archive with full-text indexing",
      "Compliance document tracking and expiry alerts"
    ],
    useCases: [
      "Finance teams can process invoices 10x faster with automatic data extraction",
      "Legal departments can classify and route contracts without manual sorting",
      "HR can onboard employees with automated document collection and verification"
    ],
    integrations: ["Google Drive", "SharePoint", "Dropbox", "DocuSign", "SAP", "Xero"],
    metrics: "Processes documents 10x faster than manual handling with 95%+ extraction accuracy."
  },
  {
    id: "data-cleaner",
    name: "Data Cleaner",
    alias: "Xylophone",
    instrument: "Xylophone",
    instrumentImage: "/agent-images/data-cleaner-xylophone.jpg",
    category: "operations",
    shortDescription: "Identifies and fixes data quality issues across your systems",
    fullDescription: "The Xylophone brings clarity through precise, distinct notes — each one clean and purposeful. This agent continuously monitors your data across systems, identifying duplicates, inconsistencies, missing values, and format errors. It proposes corrections, applies rules-based fixes, and produces data quality reports. Clean data isn't glamorous, but it's the foundation everything else depends on.",
    capabilities: [
      "Duplicate detection and intelligent merge suggestions",
      "Format standardisation (addresses, phone numbers, names)",
      "Missing value identification and smart fill recommendations",
      "Cross-system consistency checking",
      "Data quality scoring and trend monitoring",
      "Automated cleansing rules with approval workflows"
    ],
    useCases: [
      "CRM databases can be cleaned from 60% to 95%+ accuracy in days",
      "E-commerce platforms can standardise product data across thousands of SKUs",
      "Finance teams can reconcile data across multiple systems automatically"
    ],
    integrations: ["Any SQL/NoSQL database", "Airtable", "Google Sheets", "Excel", "REST APIs"],
    metrics: "Improves data quality scores from 60% to 95%+ and reduces data-related errors by 80%."
  },
  {
    id: "report-generator",
    name: "Report Generator",
    alias: "French Horn",
    instrument: "French Horn",
    instrumentImage: "/agent-images/report-generator-french-horn.jpg",
    category: "operations",
    shortDescription: "Creates comprehensive reports from multiple data sources on schedule",
    fullDescription: "The French Horn delivers rich, authoritative sound that commands attention. This agent connects to your data sources, compiles insights, and produces professional reports — financial summaries, operational dashboards, board packs, compliance reports — on any schedule you define. Each report includes narrative commentary, not just numbers, so stakeholders understand the 'so what'.",
    capabilities: [
      "Multi-source data aggregation and transformation",
      "Automated narrative generation with contextual insights",
      "Scheduled report delivery (daily, weekly, monthly)",
      "Dynamic chart and visualisation generation",
      "Custom template design and branding",
      "Historical comparison and trend analysis"
    ],
    useCases: [
      "CFOs can receive weekly financial summaries without analyst involvement",
      "Operations managers can get daily KPI dashboards automatically",
      "Board members can receive quarterly packs with narrative insights"
    ],
    integrations: ["Google Sheets", "Excel", "PostgreSQL", "BigQuery", "Tableau", "Power BI"],
    metrics: "Saves 15+ hours per month on report preparation and ensures 100% on-time delivery."
  },
  {
    id: "workflow-automator",
    name: "Workflow Automator",
    alias: "Synthesizer",
    instrument: "Synthesizer",
    instrumentImage: "/agent-images/workflow-automator-synthesizer.jpg",
    category: "operations",
    shortDescription: "Connects your tools and automates repetitive multi-step processes",
    fullDescription: "The Synthesizer is the most versatile instrument in the orchestra — capable of producing any sound, bridging any section. This agent connects your disparate tools and systems, automating complex multi-step workflows that previously required manual intervention. From employee onboarding to order fulfilment to approval chains, it orchestrates processes end-to-end.",
    capabilities: [
      "Visual workflow builder with drag-and-drop logic",
      "Conditional branching and decision trees",
      "Multi-system integration orchestration",
      "Error handling and retry mechanisms",
      "Workflow monitoring and bottleneck detection",
      "Audit trail and compliance logging"
    ],
    useCases: [
      "HR can automate the entire employee onboarding process across 10+ systems",
      "Finance can automate invoice approval chains with conditional routing",
      "Operations can orchestrate order fulfilment from payment to delivery notification"
    ],
    integrations: ["Zapier", "Make", "n8n", "Slack", "Microsoft Teams", "Any REST API"],
    metrics: "Automates 60-80% of repetitive operational tasks, freeing teams for strategic work."
  }
];

export const conductorAvatar = "/agent-images/conductor-avatar.jpg";

export function getAgentById(id: string): AgentDetail | undefined {
  return agents.find(a => a.id === id);
}

export function getAgentsByCategory(category: AgentDetail["category"]): AgentDetail[] {
  return agents.filter(a => a.category === category);
}
