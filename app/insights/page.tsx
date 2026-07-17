import type { Metadata } from "next";
import Link from "next/link";
import { InsightGrid } from "../components/Interactive";

export const metadata: Metadata = {
  title: "Speaking Insights",
  description:
    "Original articles on message structure, vocal training, and communication in real-world scenarios.",
};

export default function InsightsPage() {
  return (
    <main id="main-content">
      <section className="page-hero insight-page-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="eyebrow eyebrow-light">FIELD NOTES</span>
            <h1>Good communication often begins before you speak.</h1>
          </div>
          <div className="page-hero-side">
            <p>
              Short, practical notes on structure, voice, and in-the-room choices—so one experience becomes a method you can reuse.
            </p>
          </div>
        </div>
        <div className="notes-decoration" aria-hidden="true">
          <span>VOICE</span>
          <span>STRUCTURE</span>
          <span>PRESENCE</span>
        </div>
      </section>

      <section className="section featured-note" aria-labelledby="featured-title">
        <div className="shell featured-note-grid">
          <div className="featured-note-art" aria-hidden="true">
            <div />
            <span>01</span>
            <i />
          </div>
          <article>
            <span className="eyebrow">THIS WEEK’S PICK · COMMUNICATION</span>
            <h2 id="featured-title">Before a briefing, write what the audience should remember when they leave.</h2>
            <p>
              Once that sentence is clear, the opening, data, and examples gain a selection rule. Without it, more preparation can simply create more information to navigate.
            </p>
            <div className="article-meta">
              <span>7 min read</span>
              <span>Communication strategy</span>
            </div>
            <Link className="button button-dark" href="#note-list-title">
              View the Method Summary
            </Link>
          </article>
        </div>
      </section>

      <section className="section insight-library" aria-labelledby="note-list-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">All Notes</span>
              <h2 id="note-list-title">Start with one specific communication problem.</h2>
            </div>
            <p>Open any note for a focused method you can apply to your next conversation.</p>
          </div>
          <InsightGrid />
        </div>
      </section>

      <section className="mini-cta mini-cta-dark">
        <div className="shell mini-cta-inner">
          <div>
            <span>Turn reading into practice</span>
            <h2>Choose a course and prepare for your next real speaking moment.</h2>
          </div>
          <Link className="button button-amber" href="/courses">
            Browse Training Courses
          </Link>
        </div>
      </section>
    </main>
  );
}
