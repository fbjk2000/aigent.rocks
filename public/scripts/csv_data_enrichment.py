#!/usr/bin/env python3
"""
CSV Data Enrichment - aigent.rocks
===================================
Enrich your contact lists with company data from public sources using AI.

Complexity: Intermediate
Requirements: pip install openai pandas

Usage:
  1. Set your OPENAI_API_KEY environment variable
  2. Prepare a CSV with at least 'company_name' and 'email' columns
  3. Run: python csv_data_enrichment.py input.csv output.csv
     Or:  python csv_data_enrichment.py  (uses sample data for demo)
  4. The script adds columns: industry, company_size, headquarters, website, description

Licence: MIT - Free for personal and commercial use with attribution to aigent.rocks
"""

import os
import sys
import json
import time
import pandas as pd
from openai import OpenAI

# ── Configuration ───────────────────────────────────────────────────────────
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "your-api-key-here")
client = OpenAI(api_key=OPENAI_API_KEY)

BATCH_SIZE = 5          # Number of companies to enrich per API call
RATE_LIMIT_DELAY = 1.0  # Seconds between API calls to avoid rate limits


def create_sample_csv():
    """Create a sample CSV for demonstration."""
    data = {
        "contact_name": ["Alice Smith", "Bob Johnson", "Clara Martinez", "David Lee", "Eva Müller"],
        "email": ["alice@stripe.com", "bob@shopify.com", "clara@notion.so", "david@figma.com", "eva@celonis.de"],
        "company_name": ["Stripe", "Shopify", "Notion", "Figma", "Celonis"],
        "role": ["VP Engineering", "Product Manager", "Head of Sales", "Designer", "Data Analyst"]
    }
    return pd.DataFrame(data)


def enrich_companies(company_names):
    """Use OpenAI to enrich a batch of company names with public data."""
    prompt = f"""For each company below, provide publicly available information.
Return a JSON array with one object per company. Each object must have these keys:
- company_name (string)
- industry (string)
- estimated_size (string: "1-10", "11-50", "51-200", "201-1000", "1001-5000", "5000+")
- headquarters (string: city, country)
- website (string: URL)
- description (string: one-sentence description)

Companies: {json.dumps(company_names)}

Return ONLY valid JSON, no markdown formatting or explanation."""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1500,
        temperature=0
    )

    try:
        raw = response.choices[0].message.content.strip()
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("\n", 1)[1].rsplit("```", 1)[0]
        return json.loads(raw)
    except (json.JSONDecodeError, IndexError):
        # Return empty enrichment on parse failure
        return [{"company_name": name, "industry": "Unknown", "estimated_size": "Unknown",
                 "headquarters": "Unknown", "website": "Unknown", "description": "Unknown"}
                for name in company_names]


def process_csv(df):
    """Enrich the DataFrame in batches."""
    all_companies = df["company_name"].unique().tolist()
    enrichment_map = {}

    print(f"Enriching {len(all_companies)} unique companies in batches of {BATCH_SIZE}...\n")

    for i in range(0, len(all_companies), BATCH_SIZE):
        batch = all_companies[i:i + BATCH_SIZE]
        print(f"  Batch {i // BATCH_SIZE + 1}: {', '.join(batch)}")

        results = enrich_companies(batch)
        for item in results:
            enrichment_map[item["company_name"]] = item

        if i + BATCH_SIZE < len(all_companies):
            time.sleep(RATE_LIMIT_DELAY)

    # Merge enrichment data into the DataFrame
    enrichment_cols = ["industry", "estimated_size", "headquarters", "website", "description"]
    for col in enrichment_cols:
        df[col] = df["company_name"].map(lambda name: enrichment_map.get(name, {}).get(col, "Unknown"))

    return df


def main():
    print("📊 CSV Data Enrichment - aigent.rocks")
    print("=" * 45)

    # Load or create data
    if len(sys.argv) >= 2 and os.path.exists(sys.argv[1]):
        input_path = sys.argv[1]
        output_path = sys.argv[2] if len(sys.argv) >= 3 else "enriched_output.csv"
        df = pd.read_csv(input_path)
        print(f"\nLoaded {len(df)} rows from: {input_path}")
    else:
        df = create_sample_csv()
        output_path = "enriched_output.csv"
        print("\nUsing sample data (pass a CSV path as argument for your own).")

    # Validate required column
    if "company_name" not in df.columns:
        print("❌ Error: CSV must have a 'company_name' column.")
        sys.exit(1)

    print(f"Columns: {', '.join(df.columns)}")
    print(f"Rows: {len(df)}\n")

    # Enrich
    enriched_df = process_csv(df)

    # Save
    enriched_df.to_csv(output_path, index=False)
    print(f"\n💾 Enriched data saved to: {output_path}")
    print(f"New columns added: industry, estimated_size, headquarters, website, description")

    # Preview
    print("\nPreview of enriched data:")
    print(enriched_df.to_string(index=False, max_colwidth=40))
    print("\nDone! ✅")


if __name__ == "__main__":
    main()
