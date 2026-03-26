#!/usr/bin/env python3
"""
Meeting Notes Summariser - aigent.rocks
========================================
Extract action items and key points from meeting transcripts using AI.

Complexity: Beginner
Requirements: pip install openai

Usage:
  1. Set your OPENAI_API_KEY environment variable
  2. Run: python meeting_notes_summarizer.py <transcript_file.txt>
     Or:  python meeting_notes_summarizer.py  (uses sample text for demo)
  3. The script outputs a structured summary with key decisions, action items, and deadlines.

Licence: MIT - Free for personal and commercial use with attribution to aigent.rocks
"""

import os
import sys
from openai import OpenAI

# ── Configuration ───────────────────────────────────────────────────────────
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "your-api-key-here")
client = OpenAI(api_key=OPENAI_API_KEY)

SAMPLE_TRANSCRIPT = """
Meeting: Q1 Marketing Review
Date: 2026-03-20
Attendees: Sarah (Marketing Lead), James (Content), Priya (Analytics), Tom (Design)

Sarah: Thanks for joining everyone. Let's review Q1 performance and plan for Q2.
Our website traffic is up 23% this quarter, which is great.

Priya: Yes, most of that growth came from organic search. The blog posts James
has been publishing are ranking well. Paid campaigns had a 12% lower CPA than
last quarter.

James: We published 18 blog posts this quarter. I think we should increase to
24 next quarter and focus more on video content.

Tom: I can help with video thumbnails and graphics. I'll need the topics list
by end of next week to plan the design pipeline.

Sarah: Good. James, can you get the Q2 content calendar to Tom by Friday 27th March?

James: Absolutely, I'll have it ready.

Priya: One concern - our email open rates dropped from 28% to 22%. We should
A/B test subject lines more aggressively.

Sarah: Agreed. Priya, can you set up an A/B testing framework by the 3rd of April?
Also, Tom, we need the new landing page designs for the spring campaign by 10th April.

Tom: No problem, I'll prioritise that.

Sarah: Great meeting everyone. Let's reconvene in two weeks.
"""


def load_transcript(filepath=None):
    """Load transcript from file or use sample."""
    if filepath and os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    return SAMPLE_TRANSCRIPT


def summarise_meeting(transcript):
    """Use OpenAI to produce a structured meeting summary."""
    prompt = f"""You are a professional meeting summariser. Analyse the following meeting
transcript and produce a structured summary with these sections:

1. **Meeting Overview** - One paragraph summary
2. **Key Decisions** - Bullet list of decisions made
3. **Action Items** - Table with columns: Owner | Task | Deadline
4. **Discussion Highlights** - Key points discussed
5. **Concerns Raised** - Any risks or issues mentioned

Transcript:
{transcript}

Provide a clear, professional summary in Markdown format."""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1500,
        temperature=0.3
    )

    return response.choices[0].message.content


def save_summary(summary, output_path="meeting_summary.md"):
    """Save the summary to a Markdown file."""
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(summary)
    return output_path


def main():
    print("📝 Meeting Notes Summariser - aigent.rocks")
    print("=" * 45)

    # Load transcript
    filepath = sys.argv[1] if len(sys.argv) > 1 else None
    transcript = load_transcript(filepath)

    if filepath:
        print(f"\nLoaded transcript from: {filepath}")
    else:
        print("\nUsing sample transcript (pass a file path as argument for your own).")

    print(f"Transcript length: {len(transcript)} characters")
    print("\nGenerating summary...\n")

    # Generate summary
    summary = summarise_meeting(transcript)
    print(summary)

    # Save to file
    output_path = save_summary(summary)
    print(f"\n\n💾 Summary saved to: {output_path}")
    print("Done! ✅")


if __name__ == "__main__":
    main()
