import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for Voxfield courses, memberships, and speaking-development services.",
};

const sections = [
  { id: "acceptance", label: "Acceptance" },
  { id: "services", label: "Services & Enrollment" },
  { id: "billing", label: "Membership & Billing" },
  { id: "cancellation", label: "Changes & Cancellation" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "disclaimers", label: "Disclaimers & Liability" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <main id="main-content" className="legal-page">
      <section className="legal-hero">
        <div className="shell legal-hero-inner">
          <span className="eyebrow eyebrow-light">LEGAL / VOXFIELD</span>
          <h1>Terms &amp; Conditions</h1>
          <p>
            These terms set out the agreement between you and Voxfield when you use
            our website, courses, resources, and membership services.
          </p>
          <span className="legal-updated">Last updated: July 17, 2026</span>
        </div>
      </section>

      <section className="section legal-section">
        <div className="shell legal-content">
          <aside className="legal-nav" aria-label="Terms sections">
            <strong>On this page</strong>
            {sections.map((section, index) => (
              <a href={"#" + section.id} key={section.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.label}
              </a>
            ))}
          </aside>

          <article className="legal-document">
            <div className="legal-notice">
              <strong>Built for steady progress</strong>
              <p>
                Voxfield provides structured speaking education, practical exercises,
                and learning resources designed to strengthen communication skills.
              </p>
            </div>

            <section id="acceptance">
              <span>01</span>
              <h2>Acceptance of These Terms</h2>
              <p>
                By accessing the website or enrolling in a Voxfield course or
                membership, you agree to these Terms &amp; Conditions and our Privacy
                Policy. If you do not agree, please do not use the services.
              </p>
            </section>

            <section id="services">
              <span>02</span>
              <h2>Services &amp; Enrollment</h2>
              <p>
                Voxfield offers self-paced lessons, guided exercises, live learning
                sessions, downloadable resources, and related speaking-development
                services. Course access, schedules, and included benefits are described
                on the relevant course or membership page.
              </p>
              <p>
                You are responsible for providing accurate enrollment and contact
                information and for keeping your contact details current.
              </p>
            </section>

            <section id="billing">
              <span>03</span>
              <h2>Membership &amp; Billing</h2>
              <p>
                Membership prices and billing periods are shown before enrollment.
                Monthly plans renew each month and annual plans renew each year unless
                cancelled before the next billing date. Applicable taxes or currency
                conversion charges may be added where required.
              </p>
              <p>
                By selecting a paid plan, you authorize the applicable recurring
                charge for the plan and billing cycle you choose.
              </p>
            </section>

            <section id="cancellation">
              <span>04</span>
              <h2>Changes &amp; Cancellation</h2>
              <p>
                You may request a plan change or cancellation before the next renewal
                date by contacting support@voxfield.top. Cancellation stops future
                renewals and does not automatically refund charges already processed,
                except where required by applicable law.
              </p>
            </section>

            <section id="intellectual-property">
              <span>05</span>
              <h2>Intellectual Property</h2>
              <p>
                Voxfield owns or licenses the website design, course materials,
                frameworks, videos, written content, graphics, and brand elements.
                Enrollment grants you a limited, personal, non-transferable right to
                use those materials for your own learning.
              </p>
              <p>
                You may not reproduce, resell, distribute, publish, record, or create
                competing materials from Voxfield content without written permission.
              </p>
            </section>

            <section id="acceptable-use">
              <span>06</span>
              <h2>Acceptable Use</h2>
              <p>
                You must use the website and services lawfully and respectfully. Do
                not share account access, interfere with the service, bypass access
                controls, upload harmful material, scrape protected content, or use
                Voxfield resources to infringe another person’s rights.
              </p>
            </section>

            <section id="disclaimers">
              <span>07</span>
              <h2>Disclaimers &amp; Liability</h2>
              <p>
                Learning outcomes depend on individual practice, participation, and
                circumstances, so Voxfield does not guarantee a particular speaking,
                career, or commercial result. The services are provided with reasonable
                care, but availability may occasionally be interrupted for maintenance
                or factors beyond our control.
              </p>
              <p>
                To the fullest extent permitted by law, Voxfield is not liable for
                indirect, incidental, or consequential loss arising from use of the
                services.
              </p>
            </section>

            <section id="contact">
              <span>08</span>
              <h2>Changes &amp; Contact</h2>
              <p>
                We may update these terms as our services evolve. The date above shows
                the latest version. For questions about these terms, membership, or
                account support, email support@voxfield.top.
              </p>
              <a className="text-link" href="mailto:support@voxfield.top">
                Email Voxfield Support <span aria-hidden="true">↗</span>
              </a>
            </section>

            <div className="legal-related">
              <span>Related document</span>
              <Link href="/privacy">
                Read the Privacy Policy <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
