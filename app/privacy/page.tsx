import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the fictional VOXFIELD speaking-academy case-study website.",
};

const sections = [
  { id: "scope", label: "Scope" },
  { id: "information-entered", label: "Information You Enter" },
  { id: "technical-data", label: "Technical Data" },
  { id: "cookies", label: "Cookies & Storage" },
  { id: "accounts-payments", label: "Accounts & Payments" },
  { id: "retention", label: "Retention" },
  { id: "external-actions", label: "External Actions" },
  { id: "choices", label: "Your Choices" },
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
            This policy describes how information is handled when you explore this
            fictional, front-end case-study website.
          </p>
          <span className="legal-updated">Last updated: July 16, 2026</span>
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
              <strong>Privacy at a glance</strong>
              <p>
                VOXFIELD does not operate a customer database. The contact and
                newsletter forms are local demonstrations and do not send the
                information you type to VOXFIELD.
              </p>
            </div>

            <section id="scope">
              <span>01</span>
              <h2>Scope</h2>
              <p>
                This policy applies to the VOXFIELD case-study website and its
                demonstration pages. It does not describe a real academy, membership
                platform, instructor service, or customer relationship.
              </p>
            </section>

            <section id="information-entered">
              <span>02</span>
              <h2>Information You Enter</h2>
              <p>
                The contact form asks for a name, email address, learning goal, and
                message. The newsletter field asks for an email address. These entries
                are checked in your browser to display validation or success feedback.
                The site does not intentionally transmit, save, email, or add them to
                a marketing list.
              </p>
              <p>
                Refreshing the page clears the demonstration form state. Please do not
                enter sensitive personal, financial, health, or confidential business
                information.
              </p>
            </section>

            <section id="technical-data">
              <span>03</span>
              <h2>Technical Data</h2>
              <p>
                Like most hosted websites, the infrastructure used to deliver and
                secure this site may process standard request information such as IP
                address, browser type, device information, request time, and requested
                page. VOXFIELD does not use this case study to build individual
                profiles from that information.
              </p>
            </section>

            <section id="cookies">
              <span>04</span>
              <h2>Cookies &amp; Browser Storage</h2>
              <p>
                The VOXFIELD interface does not intentionally set advertising,
                analytics, or preference cookies and does not use browser storage for
                form submissions. The hosting or access-control service may use
                technically necessary mechanisms to deliver the site securely and
                confirm authorized access.
              </p>
            </section>

            <section id="accounts-payments">
              <span>05</span>
              <h2>Accounts &amp; Payments</h2>
              <p>
                There is no VOXFIELD student account, authentication database, payment
                processor, or subscription system. Login, plan, and purchase controls
                are visual demonstrations only, so the site does not collect passwords
                or payment-card details.
              </p>
            </section>

            <section id="retention">
              <span>06</span>
              <h2>Retention</h2>
              <p>
                Because form entries are not submitted to VOXFIELD, VOXFIELD does not
                retain them. Hosting providers may retain limited operational or
                security logs according to their own policies and legitimate service
                requirements.
              </p>
            </section>

            <section id="external-actions">
              <span>07</span>
              <h2>External Actions</h2>
              <p>
                Most navigation stays within the site. Selecting the sample email
                address may open your device’s email application. Anything you choose
                to send through that application is handled by your email provider,
                not by this website.
              </p>
            </section>

            <section id="choices">
              <span>08</span>
              <h2>Your Choices</h2>
              <p>
                You can use the main content without completing either form. You may
                clear a field before submission, leave the page, or refresh it to
                remove the current local form state. You can also manage browser and
                device privacy settings directly.
              </p>
            </section>

            <section id="changes-contact">
              <span>09</span>
              <h2>Changes &amp; Contact</h2>
              <p>
                This policy may change as the case study evolves. The date above shows
                the latest published version. Questions can be raised through the
                demonstration contact page; the displayed sample email address is not
                monitored.
              </p>
              <Link className="text-link" href="/contact">
                Open Contact Page <span aria-hidden="true">↗</span>
              </Link>
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
