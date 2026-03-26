import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

export default function Imprint() {
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
          <Building2 className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Imprint</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            Information in accordance with legal requirements (Impressum)
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Service Provider</h2>
              <div className="bg-card p-6 rounded-lg">
                <p className="text-foreground font-semibold text-lg">Florian Krueger</p>
                <p className="mt-2">aigent.rocks</p>
                <p className="mt-4">
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:hello@aigent.rocks" className="text-primary hover:underline">hello@aigent.rocks</a>
                </p>
                <p className="mt-2">
                  <strong className="text-foreground">Website:</strong>{" "}
                  <a href="https://aigent.rocks" className="text-primary hover:underline">https://aigent.rocks</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p>
                <strong className="text-foreground">General Enquiries:</strong>{" "}
                <a href="mailto:hello@aigent.rocks" className="text-primary hover:underline">hello@aigent.rocks</a>
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Privacy Enquiries:</strong>{" "}
                <a href="mailto:privacy@aigent.rocks" className="text-primary hover:underline">privacy@aigent.rocks</a>
              </p>
              <p className="mt-2">
                <strong className="text-foreground">Legal Enquiries:</strong>{" "}
                <a href="mailto:legal@aigent.rocks" className="text-primary hover:underline">legal@aigent.rocks</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Related Ventures</h2>
              <p>Florian Krueger is also the founder of:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong className="text-foreground">Fintery</strong> - Digital innovation and business solutions</li>
                <li><strong className="text-foreground">UNYTED</strong> - Ecosystem and platform development</li>
                <li>
                  <strong className="text-foreground">alakai.digital</strong> - AI assessment and planning services{" "}
                  <a href="https://www.alakai.digital" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">(visit site)</a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Responsible for Content</h2>
              <p>
                Responsible for the content of this website in accordance with § 55 Abs. 2 RStV (German Interstate Broadcasting Treaty):
              </p>
              <div className="bg-card p-4 rounded-lg mt-4">
                <p className="text-foreground font-medium">Florian Krueger</p>
                <p>Email: <a href="mailto:hello@aigent.rocks" className="text-primary hover:underline">hello@aigent.rocks</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Dispute Resolution</h2>
              <p>
                The European Commission provides a platform for online dispute resolution (ODR):{" "}
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="mt-4">
                We are not obligated and not willing to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Liability for Content</h2>
              <p>
                As a service provider, we are responsible for our own content on these pages in accordance with general laws. However, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
              </p>
              <p className="mt-4">
                Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming aware of such violations, we will remove this content immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Liability for Links</h2>
              <p>
                Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages.
              </p>
              <p className="mt-4">
                The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognisable at the time of linking. However, a permanent content control of the linked pages is not reasonable without concrete evidence of an infringement. Upon becoming aware of legal violations, we will remove such links immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Copyright</h2>
              <p>
                The content and works created by the site operators on these pages are subject to copyright law. Reproduction, editing, distribution, and any kind of use outside the limits of copyright law require the written consent of the respective author or creator.
              </p>
              <p className="mt-4">
                Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such.
              </p>
              <p className="mt-4">
                Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of legal violations, we will remove such content immediately.
              </p>
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
