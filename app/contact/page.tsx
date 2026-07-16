import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/Interactive";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Share your presentation, pitch, or workplace communication goal with VOXFIELD through a local demonstration form.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="contact-hero">
        <div className="shell contact-hero-grid">
          <div className="contact-copy">
            <span className="eyebrow eyebrow-light">TALK TO US</span>
            <h1>What do you want to make clearer the next time you speak?</h1>
            <p>
              It might be a work update, a pitch, a public presentation, or simply the wish to feel less nervous when you begin.
            </p>
            <div className="contact-points">
              <div>
                <span>01</span>
                <p>Describe the situation you are preparing for</p>
              </div>
              <div>
                <span>02</span>
                <p>Choose the skill you most want to improve</p>
              </div>
              <div>
                <span>03</span>
                <p>Complete a safe local demo submission</p>
              </div>
            </div>
          </div>
          <div className="contact-form-panel">
            <div className="form-panel-heading">
              <span>Learning Goal Questionnaire</span>
              <small>About 2 minutes</small>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section contact-info-section" aria-labelledby="contact-info-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">Other Ways to Explore</span>
              <h2 id="contact-info-title">Browsing first is fine, too.</h2>
            </div>
            <p>All contact information shown here is fictional case-study content.</p>
          </div>
          <div className="contact-info-grid">
            <article>
              <span>Courses and Paths</span>
              <h3>Find one course for your current situation</h3>
              <p>Filter by structure, voice, presence, or a specific business scenario.</p>
              <Link href="/courses">Browse Courses ↗</Link>
            </article>
            <article>
              <span>Email</span>
              <h3>support@voxfield.top</h3>
              <p>This is a sample address and does not receive real messages.</p>
              <a href="mailto:support@voxfield.top">Open Email App ↗</a>
            </article>
            <article>
              <span>Hours</span>
              <h3>Monday to Friday</h3>
              <p>9:30–18:00. This demo does not provide real customer support.</p>
              <Link href="/insights">Read Speaking Notes ↗</Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
