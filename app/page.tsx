import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, InsightGrid, PricingSection } from "./components/Interactive";
import { testimonials } from "./data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "VOXFIELD is an English-language speaking academy for structure, vocal control, presence, and business communication.",
};

const capabilities = [
  {
    number: "01",
    title: "Lead With Structure",
    description: "Turn complex material into a path your audience can follow, remember, and act on.",
    detail: "Claim / Evidence / Action",
  },
  {
    number: "02",
    title: "Use a Dynamic Voice",
    description: "Control breath, emphasis, and silence so the important ideas rise naturally.",
    detail: "Breath / Emphasis / Pause",
  },
  {
    number: "03",
    title: "Direct the Room",
    description: "Make eye contact, gestures, and movement support the point instead of distracting from it.",
    detail: "Eye Line / Gesture / Space",
  },
  {
    number: "04",
    title: "Respond With Boundaries",
    description: "Read the intent behind a question and stay clear through challenge and disagreement.",
    detail: "Confirm / Respond / Advance",
  },
];

const learningSteps = [
  {
    step: "Focus",
    title: "Know why you need to speak",
    copy: "Define the audience, situation, and next step before you get lost in content details.",
  },
  {
    step: "Build",
    title: "Organize ideas into a path",
    copy: "Move from conclusion to reasons and evidence along a line the audience never has to guess.",
  },
  {
    step: "Deliver",
    title: "Let voice and body support the point",
    copy: "Use short drills to refine pace, eye line, and movement until your delivery feels stable.",
  },
  {
    step: "Review",
    title: "Turn one experience into lasting skill",
    copy: "Review content and audience response against clear markers, then upgrade the next attempt.",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src="/images/hero-speaker.png" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="shell hero-content">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span /> SPEAKING SKILLS FOR REAL-WORLD MOMENTS
            </p>
            <h1>
              Make every word land
              <em>with clarity.</em>
            </h1>
            <p className="hero-intro">
              Move beyond scripts. Build structure, voice, and presence until strong communication becomes repeatable.
            </p>
            <div className="hero-actions">
              <Link className="button button-amber" href="/courses">
                Explore the Path <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-ghost-light" href="/contact">
                Book a Class
              </Link>
            </div>
          </div>
          <div className="hero-proof">
            <div>
              <strong>4</strong>
              <span>Core skill areas</span>
            </div>
            <div>
              <strong>10<span>min</span></strong>
              <span>Focused practice</span>
            </div>
            <div>
              <strong>28</strong>
              <span>Scenario drills</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>SCROLL TO LEARN</span>
          <i />
        </div>
      </section>

      <section className="statement-strip" aria-label="Brand statement">
        <div className="shell statement-inner">
          <span>VOXFIELD METHOD</span>
          <p>Influential speaking is not about saying more. It is about making what matters understood.</p>
          <i aria-hidden="true">↘</i>
        </div>
      </section>

      <section className="section capabilities-section" aria-labelledby="capabilities-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">Core Training</span>
              <h2 id="capabilities-title">Four dimensions. One reliable speaking system.</h2>
            </div>
            <p>
              From content to delivery, every module targets a skill you can observe, practice, and review.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability-card" key={item.number}>
                <span className="capability-number">{item.number}</span>
                <div className="capability-symbol" aria-hidden="true">
                  <i />
                  <i />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section method-section" aria-labelledby="method-title">
        <div className="shell method-grid">
          <div className="method-intro">
            <span className="eyebrow eyebrow-light">The VOXFIELD Method</span>
            <h2 id="method-title">Do not memorize tricks. Build a speaking process that is your own.</h2>
            <p>
              Every training unit starts with a real work scenario and moves through a short cycle of understand, practice, feedback, and review.
            </p>
            <Link className="text-link light-link" href="/courses">
              View All Courses <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ol className="method-list">
            {learningSteps.map((item, index) => (
              <li key={item.step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{item.step}</small>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section scenario-section" aria-labelledby="scenario-title">
        <div className="shell">
          <div className="section-heading centered">
            <span className="eyebrow">Real Scenarios</span>
            <h2 id="scenario-title">Train for the next conversation that actually matters.</h2>
          </div>
          <div className="scenario-grid">
            <article className="scenario-card large">
              <div className="scenario-label">01 / WORK UPDATE</div>
              <div>
                <h3>Give the judgment before the journey.</h3>
                <p>Help leaders find the conclusion, risk, and next step without digging through background.</p>
              </div>
              <span className="scenario-shape shape-one" aria-hidden="true" />
            </article>
            <article className="scenario-card blue">
              <div className="scenario-label">02 / BUSINESS PITCH</div>
              <div>
                <h3>Enter the client's decision path.</h3>
                <p>Move from problem to value to action, and make the proposal easier to discuss.</p>
              </div>
              <span className="scenario-shape shape-two" aria-hidden="true" />
            </article>
            <article className="scenario-card cream">
              <div className="scenario-label">03 / PUBLIC TALK</div>
              <div>
                <h3>Keep your rhythm in front of unfamiliar faces.</h3>
                <p>Use the opening, pauses, and eye contact to create a real connection.</p>
              </div>
              <span className="scenario-shape shape-three" aria-hidden="true" />
            </article>
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="section testimonial-section" aria-labelledby="voices-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">After the Practice</span>
              <h2 id="voices-title">Better speaking changes more than one presentation.</h2>
            </div>
            <p>These people and comments are original fictional content created for this case-study experience.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <figure className="testimonial-card" key={item.name}>
                <div className="quote-mark" aria-hidden="true">“</div>
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  <span className={"avatar avatar-" + (index + 1)} aria-hidden="true">
                    {item.name.slice(0, 1)}
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section insights-preview" aria-labelledby="insights-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">Speaking Insights</span>
              <h2 id="insights-title">Bring the method into every moment before you speak.</h2>
            </div>
            <Link className="text-link" href="/insights">
              View All Articles <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <InsightGrid limit={3} />
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq-title">
        <div className="shell faq-grid">
          <div className="faq-intro">
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2 id="faq-title">A few things to know before you begin.</h2>
            <p>Still have a question? Share your learning goal on the contact page.</p>
            <Link className="button button-outline-dark" href="/contact">
              Contact Us
            </Link>
          </div>
          <FaqList />
        </div>
      </section>

      <section className="closing-cta">
        <div className="shell closing-cta-inner">
          <div className="closing-orbit" aria-hidden="true">
            <span />
            <i />
          </div>
          <div>
            <span className="eyebrow eyebrow-light">Your next message starts now</span>
            <h2>You do not need to become someone else.<br />You need to become a clearer version of yourself.</h2>
          </div>
          <Link className="button button-amber" href="/contact">
            Book a Class <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
