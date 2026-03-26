import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Store lead in local database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company: company || null,
        message,
        source: "aigent.rocks",
      },
    });

    // Attempt to sync with earnrm CRM
    const earnrmApiKey = process.env.EARNRM_API_KEY;
    if (earnrmApiKey) {
      try {
        const earnrmResponse = await fetch("https://earnrm.com/api/v1/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${earnrmApiKey}`,
          },
          body: JSON.stringify({
            name,
            email,
            company,
            notes: message,
            source: "aigent.rocks",
            tags: ["website-lead", "ai-agents"],
          }),
        });

        if (earnrmResponse.ok) {
          await prisma.lead.update({
            where: { id: lead.id },
            data: { syncedToCrm: true },
          });
        }
      } catch (crmError) {
        // Log CRM sync error but don't fail the request
        console.error("Error syncing to earnrm CRM:", crmError);
      }
    }

    return NextResponse.json(
      { success: true, message: "Thank you for your message!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
