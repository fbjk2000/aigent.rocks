import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfService() {
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
          <FileText className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            Last updated: 26 March 2026
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using aigent.rocks ("the Website"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p>
                aigent.rocks provides information about AI agent development services, a repository of scripts, and facilitates contact for custom development enquiries. The Website is operated by Florian Krueger.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Obligations</h2>
              <p>When using our Website, you agree to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide accurate and complete information when submitting enquiries</li>
                <li>Use the Website only for lawful purposes</li>
                <li>Not attempt to gain unauthorised access to the Website or its systems</li>
                <li>Not use the Website to distribute malware or harmful content</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
              <p>
                All content on this Website, including but not limited to text, graphics, logos, code, and scripts, is the property of aigent.rocks or its content suppliers and is protected by international copyright laws.
              </p>
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">4.1 Script Repository</h3>
              <p>
                Scripts provided in our repository are made available under specific licences indicated with each script. Unless otherwise stated, scripts are provided for personal and commercial use with attribution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Custom Development Services</h2>
              <p>
                Custom AI agent development services are subject to separate agreements. Any quotes or proposals provided are:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Valid for 30 days unless otherwise stated</li>
                <li>Subject to scope confirmation before project commencement</li>
                <li>Governed by specific project agreements when applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Disclaimers</h2>
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">6.1 Website Content</h3>
              <p>
                The information on this Website is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or usefulness of any information.
              </p>
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">6.2 Scripts and Code</h3>
              <p>
                Scripts provided in our repository are for informational and educational purposes. They are provided without warranty and should be thoroughly tested before use in production environments.
              </p>
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">6.3 Third-Party Links</h3>
              <p>
                This Website may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, aigent.rocks and its operator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless aigent.rocks and its operator from any claims, damages, losses, or expenses arising from your use of the Website or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modifications</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the European Union and the applicable national laws. Any disputes shall be subject to the exclusive jurisdiction of the courts in the relevant jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-card p-4 rounded-lg mt-4">
                <p>Email: <a href="mailto:legal@aigent.rocks" className="text-primary hover:underline">legal@aigent.rocks</a></p>
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
