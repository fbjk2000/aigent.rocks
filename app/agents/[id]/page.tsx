import { agents, getAgentById } from "@/lib/agents-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Plug, BarChart3, Lightbulb, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return agents.map((agent) => ({ id: agent.id }));
}

const categoryColors = {
  sales: { bg: "bg-green-500/10", text: "text-green-400", border: "ring-green-500/30" },
  marketing: { bg: "bg-purple-500/10", text: "text-purple-400", border: "ring-purple-500/30" },
  operations: { bg: "bg-blue-500/10", text: "text-blue-400", border: "ring-blue-500/30" },
};

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = getAgentById(params.id);
  if (!agent) return notFound();

  const colors = categoryColors[agent.category];

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gradient-text">aigent.rocks</Link>
          <Link href="/#agents" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Orchestra
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <div className={`relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ${colors.border} shadow-xl shadow-black/30`}>
            <Image
              src={agent.instrumentImage}
              alt={`${agent.instrument} - ${agent.alias}`}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs px-3 py-1 rounded-full ${colors.bg} ${colors.text} font-medium uppercase tracking-wider`}>
                {agent.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {agent.alias} • {agent.instrument}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{agent.name}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{agent.fullDescription}</p>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="gradient-border p-6 mb-12">
          <div className="flex items-start gap-4">
            <BarChart3 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Impact</h3>
              <p className="text-muted-foreground">{agent.metrics}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Capabilities */}
          <div className="gradient-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className={`w-6 h-6 ${colors.text}`} />
              <h3 className="text-2xl font-semibold">Capabilities</h3>
            </div>
            <ul className="space-y-3">
              {agent.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-muted-foreground">
                  <ChevronRight className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-1`} />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div className="gradient-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className={`w-6 h-6 ${colors.text}`} />
              <h3 className="text-2xl font-semibold">Use Cases</h3>
            </div>
            <ul className="space-y-4">
              {agent.useCases.map((uc) => (
                <li key={uc} className="text-muted-foreground bg-secondary/30 p-4 rounded-lg">
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Integrations */}
        <div className="gradient-border p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Plug className={`w-6 h-6 ${colors.text}`} />
            <h3 className="text-2xl font-semibold">Integrations</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {agent.integrations.map((integration) => (
              <span key={integration} className="px-4 py-2 bg-secondary/50 rounded-lg text-sm font-medium">
                {integration}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to deploy the {agent.name}?</h3>
          <p className="text-muted-foreground mb-8">Get a custom implementation tailored to your business needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all text-lg font-medium"
            >
              Request Custom Build
            </Link>
            <Link
              href="/#agents"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-xl hover:bg-secondary transition-all text-lg font-medium"
            >
              Explore More Agents
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
