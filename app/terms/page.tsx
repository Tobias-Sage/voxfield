import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for the fictional VOXFIELD speaking-academy case-study website.",
};

const sections = [
  { id: "about", label: "About This Site" },
  { id: "demo-features", label: "Demo Features" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "changes", label: "Changes" },
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
            These terms explain how this fictional case-study website may be used and
            clarify which features are demonstrations only.
          </p>
          <span className="legal-updated">Last updated: July 16, 2026</span>
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
              <strong>Case-study notice</strong>
              <p>
                VOXFIELD is a fictional brand created for design and development
                practice. This website does not provide a real membership, coaching
                service, payment system, or student account.
              </p>
            </div>

            <section id="about">
              <span>01</span>
              <h2>About This Site</h2>
              <p>
                By accessing this website, you agree to use it as a demonstration
                experience. References to courses, instructors, memberships, pricing,
                testimonials, availability, and outcomes are fictional and do not form
                an offer to sell services.
              </p>
            </section>

            <section id="demo-features">
              <span>02</span>
              <h2>Demo Features</h2>
              <p>
                Interactive controls are included to demonstrate a potential product
                experience. In particular:
              </p>
              <ul>
                <li>Membership and pricing buttons do not initiate a purchase.</li>
                <li>Student-login controls do not create or access an account.</li>
                <li>Contact and newsletter forms validate entries locally in your browser.</li>
                <li>No confirmation email, consultation, or course access will be provided.</li>
              </ul>
            </section>

            <section id="acceptable-use">
              <span>03</span>
              <h2>Acceptable Use</h2>
              <p>
                You may browse and evaluate the site for lawful personal, educational,
                or professional-review purposes. You may not attempt to disrupt the
                service, bypass access controls, probe its infrastructure, introduce
                malicious code, or misrepresent the fictional content as a real
                commercial offering.
              </p>
            </section>

            <section id="intellectual-property">
              <span>04</span>
              <h2>Intellectual Property</h2>
              <p>
                The VOXFIELD name, visual system, original copy, generated imagery, and
                interface design shown on this site were created for this case study.
                Unless applicable law permits otherwise, do not republish or present
                these materials as your own commercial service without permission.
              </p>
            </section>

            <section id="disclaimers">
              <span>05</span>
              <h2>Disclaimers</h2>
              <p>
                The site and its content are provided “as is” for demonstration
                purposes. Speaking exercises and articles are general educational
                examples, not professional, legal, medical, or financial advice. No
                specific result is promised, and uninterrupted availability is not
                guaranteed.
              </p>
            </section>

            <section id="third-party-services">
              <span>06</span>
              <h2>Third-Party Services</h2>
              <p>
                The site may rely on hosting and security infrastructure supplied by
                third parties. Your use of those underlying services may also be
                subject to their applicable terms. The sample email link may open your
                own email application, but the displayed address is not monitored.
              </p>
            </section>

            <section id="changes">
              <span>07</span>
              <h2>Changes to These Terms</h2>
              <p>
                These terms may be revised when the demonstration changes. The date at
                the top of this page identifies the latest published version. Continued
                use after an update means you accept the revised terms.
              </p>
            </section>

            <section id="contact">
              <span>08</span>
              <h2>Contact</h2>
              <p>
                Questions about this case-study website can be raised through the
                demonstration contact page. The sample email address is not a real
                support channel.
              </p>
              <Link className="text-link" href="/contact">
                Open Contact Page <span aria-hidden="true">↗</span>
              </Link>
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
