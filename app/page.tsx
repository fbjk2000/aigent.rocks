"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Bot, TrendingUp, Settings, Zap, Shield, 
  ChevronRight, Download, ExternalLink, Mail, Linkedin,
  PenTool, Send, Check, ArrowRight, Database, Workflow,
  MessageSquare as MsgIcon, Cog, Rocket, BarChart3, Plug, Play
} from "lucide-react";
import { agents, getAgentsByCategory, type AgentDetail } from "@/lib/agents-data";
import ChatWidget from "@/components/chat-widget";

const scripts = [
  { name: "Email Inbox Classifier", description: "Automatically categorize and prioritize incoming emails using AI", language: "Python", complexity: "Beginner", file: "/scripts/email_inbox_classifier.py" },
  { name: "Meeting Notes Summarizer", description: "Extract action items and key points from meeting transcripts", language: "Python", complexity: "Beginner", file: "/scripts/meeting_notes_summarizer.py" },
  { name: "CSV Data Enrichment", description: "Enrich your contact lists with company data from public sources", language: "Python", complexity: "Intermediate", file: "/scripts/csv_data_enrichment.py" },
  { name: "Invoice Data Extractor", description: "Parse PDF invoices and extract key fields to structured data", language: "Python", complexity: "Intermediate", file: "/scripts/invoice_data_extractor.py" },
  { name: "Social Post Scheduler", description: "Schedule and manage social media posts across platforms", language: "Node.js", complexity: "Advanced", file: "/scripts/social_post_scheduler.js" },
  { name: "Lead Scoring Model", description: "Simple ML model to score leads based on historical conversion data", language: "Python", complexity: "Advanced", file: "/scripts/lead_scoring_model.py" },
];

function AgentCard({ agent, index }: { agent: AgentDetail; index: number }) {
  return (
    <Link href={`/agents/${agent.id}`}>
      <div 
        className="agent-card gradient-border p-5 transition-all duration-300 cursor-pointer group"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-border group-hover:ring-primary/40 transition-all shadow-lg shadow-black/20">
            <Image
              src={agent.instrumentImage}
              alt={`${agent.instrument} - ${agent.alias}`}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-lg leading-tight">{agent.name}</h4>
              <span className="text-[11px] text-muted-foreground/70 italic">{agent.alias}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{agent.shortDescription}</p>
            <span className="inline-flex items-center gap-1 text-primary text-xs mt-3 font-medium group-hover:gap-2 transition-all">
              Learn more <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ScriptCard({ script }: { script: typeof scripts[0] }) {
  return (
    <div className="gradient-border p-6 hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg leading-tight">{script.name}</h4>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ml-3 ${
          script.complexity === "Beginner" ? "bg-green-500/15 text-green-400 border border-green-500/20" :
          script.complexity === "Intermediate" ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" :
          "bg-red-500/15 text-red-400 border border-red-500/20"
        }`}>
          {script.complexity}
        </span>
      </div>
      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{script.description}</p>
      <div className="flex justify-between items-center pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground bg-secondary/80 px-2.5 py-1 rounded-md font-mono">{script.language}</span>
        <a
          href={script.file}
          download
          className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors group-hover:gap-2.5"
        >
          <Download className="w-4 h-4" />
          Get Script
        </a>
      </div>
    </div>
  );
}

const howItWorksSteps = [
  {
    number: "01",
    icon: MsgIcon,
    title: "Define Your Need",
    subtitle: "Tell us what to automate",
    description: "Start with a simple conversation. Describe your repetitive tasks, bottlenecks, or growth goals. We map your processes and identify where AI agents can have the highest impact — no technical knowledge required.",
    color: "from-blue-500 to-cyan-500",
    details: ["Process audit & mapping", "Pain point identification", "ROI estimation per agent", "GDPR impact assessment"],
  },
  {
    number: "02",
    icon: Cog,
    title: "Configure Your Agents",
    subtitle: "We tune the orchestra",
    description: "Based on your needs, we select and configure the right agents from our orchestra. Each agent is tailored to your tech stack, data sources, and business rules. We handle the integrations — CRM, email, databases, APIs.",
    color: "from-purple-500 to-pink-500",
    details: ["Agent selection & customisation", "Integration with your tools", "Business rule configuration", "Data pipeline setup"],
  },
  {
    number: "03",
    icon: Play,
    title: "Test & Validate",
    subtitle: "Rehearsal before the concert",
    description: "Every agent runs in a sandbox first. You see real outputs on your real data — but nothing touches production until you approve. We iterate together until everything sounds pitch-perfect.",
    color: "from-amber-500 to-orange-500",
    details: ["Sandbox environment testing", "Real data, safe execution", "Output quality review", "Feedback-driven tuning"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Go Live & Scale",
    subtitle: "The performance begins",
    description: "Flip the switch. Your agents run autonomously, 24/7, with full monitoring and alerting. As your business grows, add more agents to the orchestra. Scale from a solo to a full symphony — on your terms.",
    color: "from-emerald-500 to-teal-500",
    details: ["Production deployment", "24/7 monitoring & alerts", "Performance dashboards", "Scale agents as you grow"],
  },
];

function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-step-index"));
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => new Set(prev).add(idx));
            setActiveStep((prev) => (prev === null || idx > prev ? idx : prev));
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    const stepEls = sectionRef.current?.querySelectorAll("[data-step-index]");
    stepEls?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeStep !== null) {
      setProgressWidth(((activeStep + 1) / howItWorksSteps.length) * 100);
    }
  }, [activeStep]);

  return (
    <section id="how-it-works" className="py-24 px-6 bg-card/50 overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Workflow className="w-4 h-4" />
            From Idea to Production
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How Your <span className="gradient-text">AI Orchestra</span> Comes to Life
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four steps from &ldquo;we should automate this&rdquo; to agents working 24/7.
            No PhD required — just a clear goal.
          </p>
        </div>

        {/* Animated Visual Pipeline */}
        <div className="relative mb-20">
          {/* Progress bar (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-border rounded-full z-0">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {howItWorksSteps.map((step, idx) => {
              const isVisible = visibleSteps.has(idx);
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  data-step-index={idx}
                  className="flex flex-col items-center text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(40px)",
                    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s`,
                  }}
                >
                  {/* Animated icon circle */}
                  <div className="relative mb-6">
                    {/* Pulsing ring */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20`}
                      style={{
                        animation: isVisible ? `pulse 2s ease-in-out ${idx * 0.3}s infinite` : "none",
                        transform: "scale(1.3)",
                      }}
                    />
                    {/* Icon container */}
                    <div
                      className={`relative w-[120px] h-[120px] rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                      style={{
                        boxShadow: isVisible ? `0 0 40px rgba(139, 92, 246, 0.3)` : "none",
                        transition: "box-shadow 0.5s ease",
                      }}
                    >
                      <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground italic mb-3">{step.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Connecting arrows (desktop) */}
          <div className="hidden md:flex absolute top-[60px] left-[10%] right-[10%] justify-between z-20 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{
                  position: "absolute",
                  left: `${(i + 1) * 33.33 - 4}%`,
                  opacity: visibleSteps.has(i + 1) ? 1 : 0,
                  transition: `opacity 0.5s ease ${(i + 1) * 0.2}s`,
                }}
              >
                <ArrowRight className="w-5 h-5 text-primary animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Step Descriptions */}
        <div className="space-y-12">
          {howItWorksSteps.map((step, idx) => {
            const isVisible = visibleSteps.has(idx);
            const Icon = step.icon;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                data-step-index={idx}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateX(0)"
                    : `translateX(${isEven ? "-60px" : "60px"})`,
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s`,
                }}
              >
                {/* Text side */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step {step.number}</span>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                          transition: `all 0.5s ease ${0.3 + dIdx * 0.1}s`,
                        }}
                      >
                        <Check className={`w-4 h-4 flex-shrink-0 bg-gradient-to-r ${step.color} bg-clip-text`} style={{ color: idx === 0 ? "#3b82f6" : idx === 1 ? "#a855f7" : idx === 2 ? "#f59e0b" : "#10b981" }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual side — animated mini illustration */}
                <div className="flex-1 flex justify-center">
                  <div
                    className={`relative w-full max-w-[320px] h-[220px] rounded-2xl bg-gradient-to-br ${step.color} p-[1px]`}
                  >
                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center overflow-hidden">
                      <StepVisual stepIndex={idx} isVisible={isVisible} color={step.color} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepVisual({ stepIndex, isVisible, color }: { stepIndex: number; isVisible: boolean; color: string }) {
  if (stepIndex === 0) {
    // Chat bubbles appearing
    const bubbles = [
      { text: "We spend 4h/week on invoices", delay: 0.2, align: "left" as const },
      { text: "Lead follow-ups slip through", delay: 0.6, align: "right" as const },
      { text: "Reports take forever", delay: 1.0, align: "left" as const },
    ];
    return (
      <div className="w-full p-4 space-y-3">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className={`flex ${b.align === "right" ? "justify-end" : "justify-start"}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
              transition: `all 0.5s ease ${b.delay}s`,
            }}
          >
            <div
              className={`px-3 py-2 rounded-xl text-xs max-w-[80%] ${
                b.align === "right"
                  ? "bg-blue-500/20 text-blue-300 rounded-br-sm"
                  : "bg-card text-muted-foreground rounded-bl-sm border border-border"
              }`}
            >
              {b.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stepIndex === 1) {
    // Gear/cog connecting to nodes
    const nodes = [
      { label: "CRM", x: 15, y: 20 },
      { label: "Email", x: 75, y: 15 },
      { label: "DB", x: 20, y: 75 },
      { label: "API", x: 80, y: 80 },
    ];
    return (
      <div className="relative w-full h-full">
        {/* Center cog */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: isVisible ? "spin 8s linear infinite" : "none",
          }}
        >
          <Cog className="w-10 h-10 text-purple-400" />
        </div>
        {/* Nodes */}
        {nodes.map((node, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translate(-50%, -50%) ${isVisible ? "scale(1)" : "scale(0)"}`,
              opacity: isVisible ? 1 : 0,
              transition: `all 0.5s ease ${0.3 + i * 0.15}s`,
            }}
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <span className="text-[10px] font-bold text-purple-300">{node.label}</span>
            </div>
          </div>
        ))}
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: isVisible ? 0.3 : 0, transition: "opacity 1s ease 0.5s" }}>
          {nodes.map((node, i) => (
            <line key={i} x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`} stroke="rgb(168, 85, 247)" strokeWidth="1" strokeDasharray="4 4">
              {isVisible && <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />}
            </line>
          ))}
        </svg>
      </div>
    );
  }

  if (stepIndex === 2) {
    // Checklist items appearing with ticks
    const items = [
      { text: "Invoice extraction accuracy", status: "98.5%", delay: 0.3 },
      { text: "Lead scoring precision", status: "94.2%", delay: 0.6 },
      { text: "Email classification", status: "99.1%", delay: 0.9 },
    ];
    return (
      <div className="w-full p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2" style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}>
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs text-amber-400 font-medium">Sandbox Environment</span>
        </div>
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              transition: `all 0.5s ease ${item.delay}s`,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full border-2 border-amber-500/50 flex items-center justify-center"
                style={{
                  backgroundColor: isVisible ? "rgba(245, 158, 11, 0.2)" : "transparent",
                  transition: `background-color 0.3s ease ${item.delay + 0.3}s`,
                }}
              >
                <Check
                  className="w-3 h-3 text-amber-400"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0)",
                    transition: `all 0.3s ease ${item.delay + 0.3}s`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{item.text}</span>
            </div>
            <span
              className="text-xs font-bold text-amber-400"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.3s ease ${item.delay + 0.5}s`,
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Step 4 — dashboard with live metrics
  const bars = [60, 85, 45, 92, 73, 88, 95];
  return (
    <div className="w-full p-5">
      <div className="flex items-center justify-between mb-3" style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <span className="text-xs font-medium text-emerald-400">Live Dashboard</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400">Active</span>
        </div>
      </div>
      <div className="flex items-end gap-2 h-[120px]">
        {bars.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end">
            <div
              className="w-full rounded-t-sm bg-gradient-to-t from-emerald-600 to-teal-400"
              style={{
                height: isVisible ? `${height}%` : "0%",
                transition: `height 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.1}s`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-muted-foreground">Mon</span>
        <span className="text-[10px] text-muted-foreground">Sun</span>
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
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border py-4 px-6 z-[60]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pr-20 sm:pr-24">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{" "}
              <Link href="/privacy" className="text-primary hover:underline">Learn more</Link>
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => { setCookieConsent(false); try { localStorage.setItem("cookie-consent", "false"); } catch {} }}
                className="px-5 py-2 text-sm border border-border rounded-xl hover:bg-secondary transition-all"
              >
                Decline
              </button>
              <button
                onClick={() => { setCookieConsent(true); try { localStorage.setItem("cookie-consent", "true"); } catch {} }}
                className="px-5 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-medium"
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
          <div className="hidden md:flex items-center gap-6">
            <a href="#agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Agents</a>
            <a href="#scripts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Scripts</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <a 
            href="https://www.alakai.digital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm font-medium hover:shadow-lg hover:shadow-primary/20"
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
              <span className="text-sm text-muted-foreground ml-2">The Revenue Section</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {getAgentsByCategory("sales").map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} index={index} />
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
              <span className="text-sm text-muted-foreground ml-2">The Amplification Section</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {getAgentsByCategory("marketing").map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} index={index} />
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
              <span className="text-sm text-muted-foreground ml-2">The Foundation Section</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {getAgentsByCategory("operations").map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} index={index} />
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
              <div className="flex gap-3 mt-8">
                <a 
                  href="https://www.linkedin.com/in/florian" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl hover:bg-secondary hover:border-primary/30 transition-all text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a 
                  href="https://www.alakai.digital" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl hover:bg-secondary hover:border-primary/30 transition-all text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" /> alakai.digital
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="gradient-border p-8 md:p-10">
                <div className="space-y-7">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Privacy-First Approach</h4>
                      <p className="text-sm text-muted-foreground">GDPR compliance built into every solution</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Database className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Data Expertise</h4>
                      <p className="text-sm text-muted-foreground">Deep understanding of data architecture</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Workflow className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Operational Realism</h4>
                      <p className="text-sm text-muted-foreground">Solutions that work in the real world</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
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

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-10 md:p-14 text-center relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Sure Where to Start?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
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
            <form onSubmit={handleSubmit} className="gradient-border p-8 md:p-10 space-y-6">
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
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-medium hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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

      {/* Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <Link href="/" className="text-2xl font-bold gradient-text">aigent.rocks</Link>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                AI agents for European SMBs. Built with privacy, security, and compliance at the core.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#agents" className="hover:text-foreground transition-colors">Agents</a></li>
                <li><a href="#scripts" className="hover:text-foreground transition-colors">Scripts</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
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
          <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground/80">
              © 2026{" "}
              <a href="https://fintery.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline underline-offset-2 decoration-muted-foreground/30">
                Fintery Ltd.
              </a>{" "}
              · All rights reserved · aigent.rocks is a Fintery Ltd. property.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground/80">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary/70" />
                <span>GDPR Compliant</span>
              </div>
              <span className="text-border">·</span>
              <span suppressHydrationWarning>Made in Europe 🇪🇺</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
