import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Voxfield collects, uses, protects, and manages personal information.",
};

const sections = [
  { id: "information", label: "Information We Collect" },
  { id: "use", label: "How We Use Information" },
  { id: "cookies", label: "Cookies & Technology" },
  { id: "providers", label: "Service Providers" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Security" },
  { id: "choices", label: "Your Choices" },
  { id: "children", label: "Children’s Privacy" },
  { id: "changes-contact", label: "Changes & Contact" },
];

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page">
      <section className="legal-hero legal-hero-blue">
        <div className="shell legal-hero-inner">
          <span className="eyebrow eyebrow-light">PRIVACY / VOXFIELD</span>
          <h1>Privacy Policy</h1>
          <p>
            This policy explains how Voxfield handles personal information when you
            explore our website, contact our team, or use our learning services.
          </p>
          <span className="legal-updated">Last updated: July 17, 2026</span>
        </div>
      </section>

      <section className="section legal-section">
        <div className="shell legal-content">
          <aside className="legal-nav" aria-label="Privacy policy sections">
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
              <strong>Privacy with purpose</strong>
              <p>
                Voxfield uses personal information to provide learning services,
                respond to questions, and improve the experience we offer.
              </p>
            </div>

            <section id="information">
              <span>01</span>
              <h2>Information We Collect</h2>
              <p>
                We may collect information you provide directly, including your name,
                email address, learning goals, messages, course interests, membership
                details, and communication preferences.
              </p>
              <p>
                We may also receive standard technical information when you visit the
                website, such as IP address, browser type, device information, viewed
                pages, referring page, and request time.
              </p>
            </section>

            <section id="use">
              <span>02</span>
              <h2>How We Use Information</h2>
              <p>We use information to:</p>
              <ul>
                <li>respond to enquiries and recommend suitable learning paths;</li>
                <li>manage course access, membership, and customer support;</li>
                <li>send requested drills, updates, and service communications;</li>
                <li>maintain, secure, and improve the website and learning experience;</li>
                <li>meet legal, accounting, and operational requirements.</li>
              </ul>
            </section>

            <section id="cookies">
              <span>03</span>
              <h2>Cookies &amp; Similar Technology</h2>
              <p>
                Voxfield and its service providers may use cookies or similar
                technologies that are necessary for security, preferences, performance,
                and access to learning services. You can manage available cookie
                controls through your browser settings.
              </p>
            </section>

            <section id="providers">
              <span>04</span>
              <h2>Service Providers</h2>
              <p>
                We may share information with trusted providers that support website
                hosting, communications, analytics, customer service, payments, and
                security. They may use information only to perform services for
                Voxfield and must protect it appropriately.
              </p>
              <p>
                We do not sell personal information or share it for unrelated
                third-party marketing.
              </p>
            </section>

            <section id="retention">
              <span>05</span>
              <h2>Data Retention</h2>
              <p>
                We retain personal information only for as long as needed to provide
                services, maintain records, resolve disputes, enforce agreements, and
                meet legal obligations. Retention periods depend on the type of
                information and why it was collected.
              </p>
            </section>

            <section id="security">
              <span>06</span>
              <h2>Security</h2>
              <p>
                We use reasonable administrative, technical, and organizational
                safeguards to protect information from unauthorized access, loss,
                alteration, or disclosure. No online system can guarantee absolute
                security, so please use care when sharing information online.
              </p>
            </section>

            <section id="choices">
              <span>07</span>
              <h2>Your Choices</h2>
              <p>
                You may ask to access, correct, or delete personal information, object
                to certain uses, or withdraw communication preferences where applicable.
                You can unsubscribe from marketing messages using the link provided or
                by emailing support@voxfield.top.
              </p>
            </section>

            <section id="children">
              <span>08</span>
              <h2>Children’s Privacy</h2>
              <p>
                Voxfield services are intended for adults and professional learners.
                We do not knowingly collect personal information from children under
                the age required for independent consent in their location.
              </p>
            </section>

            <section id="changes-contact">
              <span>09</span>
              <h2>Changes &amp; Contact</h2>
              <p>
                We may update this policy as our services or privacy practices change.
                The date above identifies the latest version. For privacy questions or
                requests, email support@voxfield.top.
              </p>
              <a className="text-link" href="mailto:support@voxfield.top">
                Email Voxfield Support <span aria-hidden="true">↗</span>
              </a>
            </section>

            <div className="legal-related">
              <span>Related document</span>
              <Link href="/terms">
                Read the Terms &amp; Conditions <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
