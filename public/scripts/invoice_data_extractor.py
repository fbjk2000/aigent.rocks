#!/usr/bin/env python3
"""
Invoice Data Extractor - aigent.rocks
======================================
Parse PDF invoices and extract key fields to structured data using AI.

Complexity: Intermediate
Requirements: pip install openai pymupdf pandas

Usage:
  1. Set your OPENAI_API_KEY environment variable
  2. Run: python invoice_data_extractor.py invoice.pdf
     Or:  python invoice_data_extractor.py ./invoices/     (process a folder)
     Or:  python invoice_data_extractor.py                 (demo with sample text)
  3. Extracted data is saved to invoices_extracted.csv

Extracted fields: invoice_number, date, due_date, vendor_name, vendor_address,
                  client_name, subtotal, tax_amount, total_amount, currency, line_items

Licence: MIT - Free for personal and commercial use with attribution to aigent.rocks
"""

import os
import sys
import json
import glob
import pandas as pd
from openai import OpenAI

# ── Configuration ───────────────────────────────────────────────────────────
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "your-api-key-here")
client = OpenAI(api_key=OPENAI_API_KEY)

SAMPLE_INVOICE_TEXT = """
INVOICE

Invoice Number: INV-2026-0342
Date: 15 March 2026
Due Date: 14 April 2026

From:
  Acme Digital Services GmbH
  Friedrichstraße 123
  10117 Berlin, Germany
  VAT: DE123456789

Bill To:
  TechStart Ltd
  45 Innovation Way
  London EC2A 4NE, United Kingdom

Description                          Qty    Unit Price    Amount
-----------------------------------------------------------------
AI Consulting - Strategy Session      2     €1,500.00    €3,000.00
Custom Agent Development             40hrs   €150.00     €6,000.00
Monthly Hosting & Maintenance         1     €500.00      €500.00
Data Pipeline Setup                   1     €2,000.00    €2,000.00
-----------------------------------------------------------------
                                          Subtotal:    €11,500.00
                                          VAT (19%):    €2,185.00
                                          TOTAL:       €13,685.00

Payment Terms: Bank transfer within 30 days
IBAN: DE89 3704 0044 0532 0130 00
"""


def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file using PyMuPDF."""
    try:
        import fitz  # PyMuPDF
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text
    except ImportError:
        print("⚠️  PyMuPDF not installed. Install with: pip install pymupdf")
        print("   Falling back to sample invoice text for demo.")
        return None


def extract_invoice_data(text):
    """Use OpenAI to extract structured data from invoice text."""
    prompt = f"""Extract all key data from this invoice text and return as JSON.
The JSON must have these fields:
- invoice_number (string)
- date (string, ISO format YYYY-MM-DD)
- due_date (string, ISO format YYYY-MM-DD)
- vendor_name (string)
- vendor_address (string)
- client_name (string)
- client_address (string)
- currency (string, 3-letter code e.g. EUR, GBP, USD)
- line_items (array of objects with: description, quantity, unit_price, amount)
- subtotal (number)
- tax_rate (string, e.g. "19%")
- tax_amount (number)
- total_amount (number)
- payment_terms (string)

Invoice text:
{text}

Return ONLY valid JSON, no markdown formatting."""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=2000,
        temperature=0
    )

    raw = response.choices[0].message.content.strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0]

    return json.loads(raw)


def process_invoice(source):
    """Process a single invoice (PDF path or raw text)."""
    if os.path.isfile(source) and source.lower().endswith(".pdf"):
        print(f"  📄 Reading PDF: {source}")
        text = extract_text_from_pdf(source)
        if text is None:
            return None
    else:
        text = source

    data = extract_invoice_data(text)
    return data


def main():
    print("🧾 Invoice Data Extractor - aigent.rocks")
    print("=" * 45)

    invoices_data = []

    if len(sys.argv) >= 2:
        path = sys.argv[1]
        if os.path.isdir(path):
            # Process all PDFs in a directory
            pdf_files = sorted(glob.glob(os.path.join(path, "*.pdf")))
            print(f"\nFound {len(pdf_files)} PDF(s) in {path}")
            for pdf in pdf_files:
                data = process_invoice(pdf)
                if data:
                    invoices_data.append(data)
        elif os.path.isfile(path):
            data = process_invoice(path)
            if data:
                invoices_data.append(data)
        else:
            print(f"❌ Path not found: {path}")
            sys.exit(1)
    else:
        # Demo mode with sample text
        print("\nUsing sample invoice (pass a PDF path or folder as argument for your own).")
        data = process_invoice(SAMPLE_INVOICE_TEXT)
        if data:
            invoices_data.append(data)

    if not invoices_data:
        print("No invoices processed.")
        return

    # Display results
    for inv in invoices_data:
        print(f"\n{'─' * 50}")
        print(f"  Invoice:  {inv.get('invoice_number', 'N/A')}")
        print(f"  Vendor:   {inv.get('vendor_name', 'N/A')}")
        print(f"  Client:   {inv.get('client_name', 'N/A')}")
        print(f"  Date:     {inv.get('date', 'N/A')}")
        print(f"  Due:      {inv.get('due_date', 'N/A')}")
        print(f"  Total:    {inv.get('currency', '')} {inv.get('total_amount', 'N/A')}")
        line_items = inv.get("line_items", [])
        if line_items:
            print(f"  Items:    {len(line_items)} line item(s)")

    # Save to CSV (flattened)
    output_path = "invoices_extracted.csv"
    flat_data = []
    for inv in invoices_data:
        row = {k: v for k, v in inv.items() if k != "line_items"}
        row["line_items_count"] = len(inv.get("line_items", []))
        row["line_items_json"] = json.dumps(inv.get("line_items", []))
        flat_data.append(row)

    df = pd.DataFrame(flat_data)
    df.to_csv(output_path, index=False)
    print(f"\n💾 Extracted data saved to: {output_path}")
    print("Done! ✅")


if __name__ == "__main__":
    main()
