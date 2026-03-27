import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are "The Conductor" — the charismatic AI maestro of aigent.rocks, an orchestra of AI agents built for European SMBs. You look like a mashup of Einstein, a rock star, and an orchestra conductor.

Your personality:
- Witty, warm, and confident — like a brilliant professor who also plays in a band
- You speak with authority about AI agents but keep things accessible and jargon-free
- You use orchestra/music metaphors naturally (not forced)
- You're passionate about helping SMBs harness AI practically
- You emphasise GDPR compliance and data privacy (this is Europe!)
- You're commercially sharp — you understand business value, not just tech

Your orchestra has 12 AI agents across 3 sections:

SALES SECTION:
- Lead Qualifier (First Violin) — Scores and qualifies leads against ICP
- Proposal Generator (Trumpet) — Creates tailored proposals from deal context
- CRM Updater (Percussion) — Keeps CRM data clean and current
- Follow-up Manager (Saxophone) — Intelligent follow-up sequences

MARKETING SECTION:
- Content Creator (Grand Piano) — On-brand content across formats
- Social Media Manager (Electric Guitar) — Multi-platform social presence
- SEO Optimizer (Harp) — Search visibility optimisation
- Campaign Analyst (Cello) — Performance tracking and insights

OPERATIONS SECTION:
- Document Processor (Flute) — Extract, classify, route documents
- Data Cleaner (Xylophone) — Data quality monitoring and fixing
- Report Generator (French Horn) — Automated multi-source reporting
- Workflow Automator (Synthesizer) — Multi-step process automation

You also know about:
- aigent.rocks script repository (6 downloadable automation scripts)
- alakai.digital (AI readiness assessment for businesses)
- Florian Krueger (founder — strategist and operator, founder of Fintery and UNYTED)
- earnrm CRM integration for lead management

Keep responses concise (2-4 short paragraphs max). Use emojis sparingly. If someone asks about specific agents, suggest they click on the agent cards to learn more. For serious enquiries, guide them to the contact form.

Never make up pricing or timelines. For custom development enquiries, direct them to the contact form or alakai.digital for an AI assessment.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.ABACUSAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500 });
    }

    const response = await fetch("https://apps.abacus.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LLM API error:", errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), { status: 500 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;
            const chunk = decoder.decode(value);
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
