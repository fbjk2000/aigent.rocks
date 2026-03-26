#!/usr/bin/env python3
"""
Email Inbox Classifier - aigent.rocks
=====================================
Automatically categorize and prioritise incoming emails using AI.

Complexity: Beginner
Requirements: pip install openai imaplib2

Usage:
  1. Set your environment variables (OPENAI_API_KEY, EMAIL_HOST, EMAIL_USER, EMAIL_PASS)
  2. Run: python email_inbox_classifier.py
  3. The script connects to your inbox, classifies unread emails, and prints results.

Categories: urgent, action_required, informational, newsletter, spam

Licence: MIT - Free for personal and commercial use with attribution to aigent.rocks
"""

import os
import imaplib
import email
from email.header import decode_header
from openai import OpenAI

# ── Configuration ───────────────────────────────────────────────────────────
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "your-api-key-here")
EMAIL_HOST = os.environ.get("EMAIL_HOST", "imap.gmail.com")
EMAIL_USER = os.environ.get("EMAIL_USER", "you@example.com")
EMAIL_PASS = os.environ.get("EMAIL_PASS", "your-app-password")
MAX_EMAILS = 20  # Number of recent unread emails to classify

CATEGORIES = ["urgent", "action_required", "informational", "newsletter", "spam"]

client = OpenAI(api_key=OPENAI_API_KEY)


def connect_to_inbox():
    """Connect to the IMAP server and select the inbox."""
    mail = imaplib.IMAP4_SSL(EMAIL_HOST)
    mail.login(EMAIL_USER, EMAIL_PASS)
    mail.select("inbox")
    return mail


def fetch_unread_emails(mail, max_count=MAX_EMAILS):
    """Fetch unread emails and return a list of (subject, sender, body_preview) tuples."""
    _, message_numbers = mail.search(None, "UNSEEN")
    email_ids = message_numbers[0].split()

    # Take the most recent N emails
    email_ids = email_ids[-max_count:] if len(email_ids) > max_count else email_ids

    emails = []
    for eid in email_ids:
        _, msg_data = mail.fetch(eid, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])

        # Decode subject
        subject, encoding = decode_header(msg["Subject"])[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding or "utf-8", errors="replace")

        sender = msg.get("From", "Unknown")

        # Extract body preview (first 500 chars)
        body = ""
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    body = part.get_payload(decode=True).decode("utf-8", errors="replace")
                    break
        else:
            body = msg.get_payload(decode=True).decode("utf-8", errors="replace")

        emails.append({
            "id": eid.decode(),
            "subject": subject,
            "sender": sender,
            "body_preview": body[:500]
        })

    return emails


def classify_email(subject, sender, body_preview):
    """Use OpenAI to classify a single email into a category."""
    prompt = f"""Classify the following email into exactly one category.
Categories: {', '.join(CATEGORIES)}

From: {sender}
Subject: {subject}
Body preview: {body_preview}

Respond with ONLY the category name, nothing else."""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=20,
        temperature=0
    )

    category = response.choices[0].message.content.strip().lower()
    return category if category in CATEGORIES else "informational"


def main():
    print("📧 Email Inbox Classifier - aigent.rocks")
    print("=" * 45)

    # Connect to inbox
    print("\nConnecting to inbox...")
    mail = connect_to_inbox()

    # Fetch unread emails
    print(f"Fetching up to {MAX_EMAILS} unread emails...")
    emails = fetch_unread_emails(mail)
    print(f"Found {len(emails)} unread email(s).\n")

    if not emails:
        print("No unread emails to classify. You're all caught up! 🎉")
        return

    # Classify each email
    results = {cat: [] for cat in CATEGORIES}

    for em in emails:
        category = classify_email(em["subject"], em["sender"], em["body_preview"])
        results[category].append(em)
        print(f"  [{category.upper():>17}]  {em['subject'][:60]}")

    # Summary
    print("\n" + "=" * 45)
    print("Summary:")
    for cat in CATEGORIES:
        count = len(results[cat])
        if count > 0:
            emoji = {"urgent": "🔴", "action_required": "🟡", "informational": "🔵", "newsletter": "📰", "spam": "🗑️"}
            print(f"  {emoji.get(cat, '•')} {cat}: {count} email(s)")

    mail.logout()
    print("\nDone! ✅")


if __name__ == "__main__":
    main()
