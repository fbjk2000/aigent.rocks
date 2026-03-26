import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            Last updated: 26 March 2026
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p>
                aigent.rocks ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website aigent.rocks.
              </p>
              <p className="mt-4">
                We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws in the European Union. By using our website, you consent to the data practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Data Controller</h2>
              <p>
                The data controller responsible for your personal data is:
              </p>
              <div className="bg-card p-4 rounded-lg mt-4">
                <p><strong className="text-foreground">Florian Krueger</strong></p>
                <p>aigent.rocks</p>
                <p>Email: privacy@aigent.rocks</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information We Collect</h2>
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.1 Information You Provide</h3>
              <p>When you use our contact form, we collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Company name (optional)</li>
                <li>Message content</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">3.2 Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages visited and time spent</li>
                <li>Date and time of access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Legal Basis for Processing</h2>
              <p>Under GDPR, we process your personal data based on:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong className="text-foreground">Consent (Article 6(1)(a)):</strong> When you submit the contact form or accept cookies</li>
                <li><strong className="text-foreground">Legitimate Interest (Article 6(1)(f)):</strong> For website security and improvement</li>
                <li><strong className="text-foreground">Contract Performance (Article 6(1)(b)):</strong> When processing is necessary for service provision</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Respond to your enquiries and provide requested services</li>
                <li>Improve our website and services</li>
                <li>Send relevant communications (with your consent)</li>
                <li>Ensure website security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Sharing and Transfers</h2>
              <p>We may share your data with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong className="text-foreground">Service Providers:</strong> Third-party services that help us operate our business (hosting, CRM)</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-4">
                If data is transferred outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) or adequacy decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies</h2>
              <p>
                We use cookies to enhance your browsing experience. You can control cookie preferences through our cookie consent banner. Types of cookies we use:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong className="text-foreground">Essential Cookies:</strong> Necessary for website functionality</li>
                <li><strong className="text-foreground">Analytics Cookies:</strong> Help us understand how visitors use our site (only with consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Contact form submissions are typically retained for 2 years unless you request earlier deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Your Rights Under GDPR</h2>
              <p>You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong className="text-foreground">Right of Access:</strong> Request copies of your personal data</li>
                <li><strong className="text-foreground">Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-foreground">Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong className="text-foreground">Right to Restrict Processing:</strong> Request limitation of processing</li>
                <li><strong className="text-foreground">Right to Data Portability:</strong> Request transfer of your data</li>
                <li><strong className="text-foreground">Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong className="text-foreground">Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at: <a href="mailto:privacy@aigent.rocks" className="text-primary hover:underline">privacy@aigent.rocks</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Supervisory Authority</h2>
              <p>
                If you believe your data protection rights have been violated, you have the right to lodge a complaint with a supervisory authority in the EU Member State of your habitual residence, place of work, or place of the alleged infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-card p-4 rounded-lg mt-4">
                <p>Email: <a href="mailto:privacy@aigent.rocks" className="text-primary hover:underline">privacy@aigent.rocks</a></p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline">← Back to aigent.rocks</Link>
        </div>
      </div>
    </main>
  );
}
