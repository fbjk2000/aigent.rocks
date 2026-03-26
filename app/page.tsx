"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, Users, TrendingUp, Settings, Zap, Shield, 
  ChevronRight, Download, ExternalLink, Mail, Linkedin,
  Target, PenTool, BarChart3, Search, FileText, Database,
  Calendar, Workflow, MessageSquare, Send, Check, ArrowRight
} from "lucide-react";

const salesAgents = [
  { name: "Lead Qualifier", description: "Automatically scores and qualifies inbound leads based on your ideal customer profile", icon: Target },
  { name: "Proposal Generator", description: "Creates tailored proposals and quotes from templates using deal context", icon: FileText },
  { name: "CRM Updater", description: "Keeps your CRM data clean and updated with every customer interaction", icon: Database },
  { name: "Follow-up Manager", description: "Ensures no lead falls through the cracks with intelligent follow-up sequences", icon: MessageSquare },
];

const marketingAgents = [
  { name: "Content Creator", description: "Generates on-brand blog posts, social content, and marketing copy", icon: PenTool },
  { name: "Social Media Manager", description: "Schedules, posts, and engages across all your social platforms", icon: Users },
  { name: "SEO Optimizer", description: "Analyzes and improves your content for search engine visibility", icon: Search },
  { name: "Campaign Analyst", description: "Tracks campaign performance and provides actionable insights", icon: BarChart3 },
];

const operationsAgents = [
  { name: "Document Processor", description: "Extracts, categorizes, and routes documents automatically", icon: FileText },
  { name: "Data Cleaner", description: "Identifies and fixes data quality issues across your systems", icon: Database },
  { name: "Report Generator", description: "Creates comprehensive reports from multiple data sources on schedule", icon: BarChart3 },
  { name: "Workflow Automator", description: "Connects your tools and automates repetitive multi-step processes", icon: Workflow },
];

const scripts = [
  { name: "Email Inbox Classifier", description: "Automatically categorize and prioritize incoming emails using AI", language: "Python", complexity: "Beginner", file: "/scripts/email_inbox_classifier.py" },
  { name: "Meeting Notes Summarizer", description: "Extract action items and key points from meeting transcripts", language: "Python", complexity: "Beginner", file: "/scripts/meeting_notes_summarizer.py" },
  { name: "CSV Data Enrichment", description: "Enrich your contact lists with company data from public sources", language: "Python", complexity: "Intermediate", file: "/scripts/csv_data_enrichment.py" },
  { name: "Invoice Data Extractor", description: "Parse PDF invoices and extract key fields to structured data", language: "Python", complexity: "Intermediate", file: "/scripts/invoice_data_extractor.py" },
  { name: "Social Post Scheduler", description: "Schedule and manage social media posts across platforms", language: "Node.js", complexity: "Advanced", file: "/scripts/social_post_scheduler.js" },
  { name: "Lead Scoring Model", description: "Simple ML model to score leads based on historical conversion data", language: "Python", complexity: "Advanced", file: "/scripts/lead_scoring_model.py" },
];

function AgentCard({ agent, index }: { agent: { name: string; description: string; icon: any }; index: number }) {
  const Icon = agent.icon;
  return (
    <div 
      className="agent-card gradient-border p-6 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">{agent.name}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{agent.description}</p>
        </div>
      </div>
    </div>
  );
}

function ScriptCard({ script }: { script: typeof scripts[0] }) {
  return (
    <div className="gradient-border p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-semibold text-lg">{script.name}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${
          script.complexity === "Beginner" ? "bg-green-500/20 text-green-400" :
          script.complexity === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
          "bg-red-500/20 text-red-400"
        }`}>
          {script.complexity}
        </span>
      </div>
      <p className="text-muted-foreground text-sm mb-4">{script.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{script.language}</span>
        <a
          href={script.file}
          download
          className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Get Script
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read cookie consent from localStorage after mount to avoid hydration mismatch
    try {
      const stored = localStorage.getItem("cookie-consent");
      if (stored !== null) {
        setCookieConsent(stored === "true");
      }
    } catch {
      // localStorage unavailable (e.g. SSR or private browsing)
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", company: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Cookie Consent Banner - only render on client to avoid hydration mismatch */}
      {mounted && cookieConsent === null && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{" "}
              <Link href="/privacy" className="text-primary hover:underline">Learn more</Link>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setCookieConsent(false); try { localStorage.setItem("cookie-consent", "false"); } catch {} }}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => { setCookieConsent(true); try { localStorage.setItem("cookie-consent", "true"); } catch {} }}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gradient-text">aigent.rocks</Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#agents" className="text-muted-foreground hover:text-foreground transition-colors">Agents</a>
            <a href="#scripts" className="text-muted-foreground hover:text-foreground transition-colors">Scripts</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <a 
            href="https://www.alakai.digital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            AI Assessment <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="hero-glow top-1/4 left-1/4 animate-float" />
        <div className="hero-glow bottom-1/4 right-1/4 animate-float" style={{ animationDelay: "-3s" }} />
        <div className="grid-pattern absolute inset-0 opacity-50" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
            <Bot className="w-4 h-4" />
            <span>Your AI Agent Orchestra</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI Agents Working <br />
            <span className="gradient-text">In Perfect Harmony</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy specialised AI agents for sales, marketing, and operations. 
            Built for European SMBs with GDPR compliance and data security at the core.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#agents" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all text-lg font-medium hover:scale-105"
            >
              Explore Agents <ChevronRight className="w-5 h-5" />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-xl hover:bg-secondary transition-all text-lg font-medium"
            >
              Custom Development
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>Fully Customisable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Agent Orchestra</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialised AI agents designed to handle specific business functions, 
              working together seamlessly to run your operations.
            </p>
          </div>

          {/* Sales Agents */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold">Sales Agents</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {salesAgents.map((agent, index) => (
                <AgentCard key={agent.name} agent={agent} index={index} />
              ))}
            </div>
          </div>

          {/* Marketing Agents */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <PenTool className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold">Marketing Agents</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {marketingAgents.map((agent, index) => (
                <AgentCard key={agent.name} agent={agent} index={index} />
              ))}
            </div>
          </div>

          {/* Operations Agents */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Settings className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold">Operations Agents</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {operationsAgents.map((agent, index) => (
                <AgentCard key={agent.name} agent={agent} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scripts Repository Section */}
      <section id="scripts" className="py-24 px-6 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Script Repository</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready-to-deploy scripts that deliver immediate value. 
              Start automating today with battle-tested solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scripts.map((script) => (
              <ScriptCard key={script.name} script={script} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Need a custom script for your specific use case?</p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              Request Custom Script <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Built by a Practitioner, <span className="gradient-text">Not a Theorist</span></h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Florian Krueger</strong> is a founder, strategist, and operator working at the intersection of AI, data, digital transformation, privacy, and emerging commercial models.
                </p>
                <p>
                  As the founder of <strong className="text-foreground">Fintery</strong> and <strong className="text-foreground">UNYTED</strong>, Florian focuses on building commercially credible solutions that connect digital innovation with real business value.
                </p>
                <p>
                  His work spans AI and data strategy, workflow and transformation support, platform and monetisation design, and the development of ecosystem models that bring products, services, and utility together in a coherent way.
                </p>
                <p>
                  What differentiates Florian is the combination of <strong className="text-foreground">breadth and operational realism</strong>. He is as comfortable shaping high-level strategy as he is translating it into practical systems, execution frameworks, and scalable business models.
                </p>
                <p className="italic border-l-2 border-primary pl-4">
                  "Less interested in hype, more interested in building structures that work."
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <a 
                  href="https://www.linkedin.com/in/florian" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a 
                  href="https://www.alakai.digital" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> alakai.digital
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="gradient-border p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Privacy-First Approach</h4>
                      <p className="text-sm text-muted-foreground">GDPR compliance built into every solution</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Data Expertise</h4>
                      <p className="text-sm text-muted-foreground">Deep understanding of data architecture</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Workflow className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Operational Realism</h4>
                      <p className="text-sm text-muted-foreground">Solutions that work in the real world</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Commercial Focus</h4>
                      <p className="text-sm text-muted-foreground">ROI-driven implementation strategy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Sure Where to Start?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a comprehensive AI readiness assessment and discover 
              how AI agents can transform your business operations.
            </p>
            <a 
              href="https://www.alakai.digital" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all text-lg font-medium hover:scale-105"
            >
              Start AI Assessment <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-card/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Together</h2>
            <p className="text-xl text-muted-foreground">
              Ready to deploy your AI agent orchestra? Get in touch for custom development.
            </p>
          </div>

          {submitted ? (
            <div className="gradient-border p-12 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Message Received!</h3>
              <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="gradient-border p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell us about your project or the agents you need..."
                />
              </div>
              <div className="text-sm text-muted-foreground">
                By submitting this form, you agree to our{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="text-2xl font-bold gradient-text">aigent.rocks</Link>
              <p className="text-muted-foreground mt-4 text-sm">
                AI agents for European SMBs. Built with privacy, security, and compliance at the core.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#agents" className="hover:text-foreground transition-colors">Agents</a></li>
                <li><a href="#scripts" className="hover:text-foreground transition-colors">Scripts</a></li>
                <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/imprint" className="hover:text-foreground transition-colors">Imprint</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://www.linkedin.com/in/florian" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.alakai.digital" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" /> alakai.digital
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@aigent.rocks" className="flex items-center gap-2 hover:text-foreground transition-colors" suppressHydrationWarning>
                    <Mail className="w-4 h-4" />{" "}
                    <span suppressHydrationWarning>hello@aigent.rocks</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 aigent.rocks. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>GDPR Compliant</span>
              </div>
              <span>|</span>
              <span suppressHydrationWarning>Made in Europe 🇪🇺</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
