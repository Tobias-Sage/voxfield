import type { Metadata } from "next";
import Link from "next/link";
import { CourseExplorer } from "../components/Interactive";

export const metadata: Metadata = {
  title: "Training Courses",
  description:
    "Explore VOXFIELD courses in message structure, vocal delivery, stage presence, and business communication.",
};

const tracks = [
  {
    code: "A",
    title: "Start With Clarity",
    duration: "2–3 weeks",
    copy: "Begin with a three-minute message and build the habit of leading with a clear conclusion.",
  },
  {
    code: "B",
    title: "Voice and Presence",
    duration: "3–4 weeks",
    copy: "Stabilize breath, pace, and movement so you can stay natural in front of a group.",
  },
  {
    code: "C",
    title: "Business Communication",
    duration: "4–6 weeks",
    copy: "Apply your speaking system to pitches, updates, Q&A sessions, and important meetings.",
  },
];

export default function CoursesPage() {
  return (
    <main id="main-content">
      <section className="page-hero courses-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="eyebrow eyebrow-light">COURSE LIBRARY</span>
            <h1>Turn “speak with confidence” into actions you can practice every day.</h1>
          </div>
          <div className="page-hero-side">
            <p>
              Each course is designed around one clear outcome: practical methods, realistic scenarios, and focused exercises you can finish.
            </p>
            <Link className="button button-amber" href="/contact">
              Get a Learning Recommendation <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="page-hero-decoration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="section learning-track-section" aria-labelledby="tracks-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">Suggested Paths</span>
              <h2 id="tracks-title">Start with your current challenge, not chapter one.</h2>
            </div>
            <p>Follow a complete path or jump directly into the course closest to your next task.</p>
          </div>
          <div className="track-grid">
            {tracks.map((track) => (
              <article key={track.code}>
                <span>{track.code}</span>
                <small>{track.duration}</small>
                <h3>{track.title}</h3>
                <p>{track.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section course-library" aria-labelledby="library-title">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">All Courses</span>
            <h2 id="library-title">Choose the part of your communication you want to change.</h2>
          </div>
          <CourseExplorer />
        </div>
      </section>

      <section className="mini-cta">
        <div className="shell mini-cta-inner">
          <div>
            <span>Not sure where to begin?</span>
            <h2>Tell us about your next important speaking moment.</h2>
          </div>
          <Link className="button button-dark" href="/contact">
            Share Your Goal
          </Link>
        </div>
      </section>
    </main>
  );
}
