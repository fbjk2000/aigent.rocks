#!/usr/bin/env python3
"""
Lead Scoring Model - aigent.rocks
==================================
Simple ML model to score leads based on historical conversion data.

Complexity: Advanced
Requirements: pip install pandas scikit-learn joblib

Usage:
  1. Run: python lead_scoring_model.py                     (train with sample data)
  2. Run: python lead_scoring_model.py train data.csv      (train with your data)
  3. Run: python lead_scoring_model.py score leads.csv     (score new leads)
  4. The trained model is saved to lead_scoring_model.joblib

Expected CSV columns for training:
  company_size, annual_revenue, industry, source, page_views, email_opens,
  days_since_signup, has_demo_request, converted (target: 0 or 1)

Licence: MIT - Free for personal and commercial use with attribution to aigent.rocks
"""

import os
import sys
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.pipeline import Pipeline
import joblib
import warnings
warnings.filterwarnings('ignore')

# ── Configuration ───────────────────────────────────────────────────────────
MODEL_PATH = "lead_scoring_model.joblib"
ENCODERS_PATH = "lead_scoring_encoders.joblib"
FEATURE_COLS = [
    "company_size", "annual_revenue", "industry_encoded", "source_encoded",
    "page_views", "email_opens", "days_since_signup", "has_demo_request"
]


def generate_sample_data(n_samples=1000):
    """Generate realistic sample lead data for demonstration."""
    np.random.seed(42)

    industries = ["SaaS", "E-commerce", "Finance", "Healthcare", "Manufacturing", "Education", "Consulting"]
    sources = ["organic", "paid_search", "social", "referral", "email_campaign", "webinar", "cold_outreach"]

    data = {
        "company_size": np.random.choice(["1-10", "11-50", "51-200", "201-1000", "1000+"], n_samples,
                                          p=[0.3, 0.25, 0.2, 0.15, 0.1]),
        "annual_revenue": np.random.lognormal(mean=12, sigma=1.5, size=n_samples).astype(int),
        "industry": np.random.choice(industries, n_samples),
        "source": np.random.choice(sources, n_samples, p=[0.2, 0.15, 0.15, 0.15, 0.15, 0.1, 0.1]),
        "page_views": np.random.poisson(lam=8, size=n_samples),
        "email_opens": np.random.poisson(lam=3, size=n_samples),
        "days_since_signup": np.random.exponential(scale=30, size=n_samples).astype(int),
        "has_demo_request": np.random.choice([0, 1], n_samples, p=[0.7, 0.3]),
    }

    df = pd.DataFrame(data)

    # Create a realistic conversion probability based on features
    size_score = df["company_size"].map({"1-10": 0.1, "11-50": 0.2, "51-200": 0.4, "201-1000": 0.6, "1000+": 0.8})
    source_score = df["source"].map({"referral": 0.6, "webinar": 0.5, "organic": 0.3, "paid_search": 0.3,
                                      "email_campaign": 0.25, "social": 0.2, "cold_outreach": 0.1})
    engagement = (df["page_views"] / 20 + df["email_opens"] / 10).clip(0, 1)
    demo_boost = df["has_demo_request"] * 0.3
    recency = (1 - df["days_since_signup"] / df["days_since_signup"].max()).clip(0, 1) * 0.2

    prob = (size_score * 0.25 + source_score * 0.2 + engagement * 0.25 + demo_boost + recency).clip(0, 1)
    df["converted"] = (np.random.random(n_samples) < prob).astype(int)

    return df


def prepare_features(df, encoders=None, fit=False):
    """Encode categorical features and prepare the feature matrix."""
    df = df.copy()

    if encoders is None:
        encoders = {}

    # Encode categorical columns
    for col in ["industry", "source", "company_size"]:
        enc_col = f"{col}_encoded"
        if fit:
            le = LabelEncoder()
            df[enc_col] = le.fit_transform(df[col].astype(str))
            encoders[col] = le
        else:
            le = encoders.get(col)
            if le:
                # Handle unseen labels gracefully
                df[enc_col] = df[col].astype(str).map(
                    lambda x: le.transform([x])[0] if x in le.classes_ else -1
                )
            else:
                df[enc_col] = 0

    # Replace company_size in feature cols with encoded version
    feature_cols = [
        "company_size_encoded", "annual_revenue", "industry_encoded", "source_encoded",
        "page_views", "email_opens", "days_since_signup", "has_demo_request"
    ]

    return df[feature_cols], encoders


def train_model(df):
    """Train the lead scoring model."""
    print("\n🔧 Preparing features...")
    X, encoders = prepare_features(df, fit=True)
    y = df["converted"]

    print(f"   Features: {list(X.columns)}")
    print(f"   Samples: {len(X)} | Converted: {y.sum()} ({y.mean()*100:.1f}%)")

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    # Train model
    print("\n🏋️ Training Gradient Boosting model...")
    model = GradientBoostingClassifier(
        n_estimators=200,
        max_depth=4,
        learning_rate=0.1,
        min_samples_split=10,
        random_state=42
    )
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    print("\n📊 Model Performance:")
    print(f"   AUC-ROC: {roc_auc_score(y_test, y_prob):.4f}")

    # Cross-validation
    cv_scores = cross_val_score(model, X, y, cv=5, scoring='roc_auc')
    print(f"   5-Fold CV AUC: {cv_scores.mean():.4f} (±{cv_scores.std():.4f})")

    print("\n   Classification Report:")
    report = classification_report(y_test, y_pred, target_names=["Not Converted", "Converted"])
    for line in report.split("\n"):
        print(f"   {line}")

    # Feature importance
    importance = pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False)
    print("\n   Feature Importance:")
    for feat, imp in importance.items():
        bar = "█" * int(imp * 40)
        print(f"   {feat:<25} {imp:.3f} {bar}")

    # Save model and encoders
    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoders, ENCODERS_PATH)
    print(f"\n💾 Model saved to: {MODEL_PATH}")
    print(f"💾 Encoders saved to: {ENCODERS_PATH}")

    return model, encoders


def score_leads(df, model=None, encoders=None):
    """Score new leads using the trained model."""
    if model is None:
        if not os.path.exists(MODEL_PATH):
            print("❌ No trained model found. Run training first.")
            sys.exit(1)
        model = joblib.load(MODEL_PATH)
        encoders = joblib.load(ENCODERS_PATH)

    X, _ = prepare_features(df, encoders=encoders, fit=False)
    scores = model.predict_proba(X)[:, 1]

    df = df.copy()
    df["lead_score"] = (scores * 100).round(1)
    df["lead_grade"] = pd.cut(df["lead_score"], bins=[0, 25, 50, 75, 100],
                               labels=["Cold", "Warm", "Hot", "On Fire 🔥"])

    return df


def main():
    print("🎯 Lead Scoring Model - aigent.rocks")
    print("=" * 45)

    mode = sys.argv[1] if len(sys.argv) > 1 else "demo"
    data_path = sys.argv[2] if len(sys.argv) > 2 else None

    if mode == "train":
        if data_path and os.path.exists(data_path):
            df = pd.read_csv(data_path)
            print(f"\nLoaded {len(df)} records from: {data_path}")
        else:
            print("\nNo data file provided, using generated sample data.")
            df = generate_sample_data()
        train_model(df)

    elif mode == "score":
        if data_path and os.path.exists(data_path):
            df = pd.read_csv(data_path)
        else:
            print("\nUsing sample leads for scoring demo.")
            df = generate_sample_data(20)
            df = df.drop(columns=["converted"], errors="ignore")

        scored = score_leads(df)
        output = "scored_leads.csv"
        scored.to_csv(output, index=False)

        print("\n📋 Scored Leads:")
        display_cols = ["company_size", "industry", "source", "page_views", "has_demo_request", "lead_score", "lead_grade"]
        print(scored[display_cols].to_string(index=False))

        print(f"\n💾 Scored leads saved to: {output}")

        # Summary
        print("\n📊 Score Distribution:")
        print(scored["lead_grade"].value_counts().to_string())

    else:  # demo mode
        print("\n── Training Phase ──")
        df = generate_sample_data()
        model, encoders = train_model(df)

        print("\n\n── Scoring Phase ──")
        new_leads = generate_sample_data(10)
        new_leads = new_leads.drop(columns=["converted"])
        scored = score_leads(new_leads, model, encoders)

        print("\n📋 Sample Scored Leads:")
        display_cols = ["company_size", "industry", "source", "page_views", "has_demo_request", "lead_score", "lead_grade"]
        print(scored[display_cols].to_string(index=False))

    print("\nDone! ✅")


if __name__ == "__main__":
    main()
