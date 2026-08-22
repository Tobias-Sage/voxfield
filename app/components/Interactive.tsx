"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  Course,
  CourseCategory,
  courses,
  faqs,
  Insight,
  insights,
  plans,
} from "../data";

const formatPrice = (price: number) => price.toFixed(2);

export function PricingSection() {
  // 不再需要月度/年度切换，直接渲染两个套餐
  return (
    <section className="section section-dark" id="plans" aria-labelledby="plans-title">
      <div className="shell">
        <div className="section-heading section-heading-split light">
          <div>
            <span className="eyebrow eyebrow-light">Training Plans</span>
            <h2 id="plans-title">Choose your preferred payment schedule.</h2>
          </div>
          {/* 切换按钮已移除 */}
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => {
            // 根据套餐名称判断是月付还是年付，显示不同价格
            const isAnnual = plan.name.includes("Annual");
            const price = isAnnual ? plan.annual : plan.monthly;
            const label = isAnnual ? "/ year" : "/ month";
            return (
              <article
                className={plan.featured ? "pricing-card featured" : "pricing-card"}
                key={plan.name}
              >
                {plan.featured && <span className="plan-badge">Best value</span>}
                <p className="plan-eyebrow">{plan.eyebrow}</p>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price" aria-live="polite">
                  <span>$</span>
                  <strong>{formatPrice(price)}</strong>
                  <small>{label}</small>
                </div>
                <p className="billing-note">
                  {isAnnual
                    ? `Billed annually at $${formatPrice(plan.annual)}. Cancel renewal anytime.`
                    : `Billed monthly at $${formatPrice(plan.monthly)}. Cancel renewal anytime.`}
                </p>
                <ul className="check-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={plan.featured ? "button button-dark" : "button button-outline-dark"}
                  onClick={async () => {
                    try {
                      const searchParams = new URLSearchParams(window.location.search);
                      const clickId = searchParams.get('click_id') || '';
                      const amount = isAnnual ? plan.annual : plan.monthly;
                      const response = await fetch("/api/payment/initiate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          planName: plan.name,
                          isAnnual: isAnnual,
                          amount: amount,
                          currency: "USD",
                          userEmail: "",
                          clickId: clickId,
                        }),
                      });
                      const result = await response.json();
                      if (result.success && result.paymentUrl) {
                        window.location.href = result.paymentUrl;
                      } else {
                        alert("Failed to initiate payment. Please try again.");
                      }
                    } catch (error) {
                      console.error("Payment initiation error:", error);
                      alert("Something went wrong. Please try again.");
                    }
                  }}
                >
                  Choose This Plan
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 以下所有其他函数（FaqList, CourseCard, CourseExplorer, InsightGrid, ContactForm）
// 保持原样，与你的文件一致，为了完整性，这些函数必须保留。
// 由于你之前已经有完整的文件，此处不再重复列出，但实际替换时请确保它们都在。
// 为了保险，我提供完整的文件内容（包含所有函数）如下：
// ========== 以下为完整文件内容 ==========

export function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const answerId = "faq-answer-" + index;
        return (
          <article className={open ? "faq-item is-open" : "faq-item"} key={faq.question}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{faq.question}</span>
                <i aria-hidden="true">{open ? "−" : "+"}</i>
              </button>
            </h3>
            <div id={answerId} className="faq-answer" hidden={!open}>
              <p>{faq.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const courseFilters: Array<"All" | CourseCategory> = [
  "All",
  "Structure",
  "Voice",
  "Presence",
  "Business",
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <article className="course-card">
      <div className="course-card-topline">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{course.level}</span>
      </div>
      <p className="card-kicker">{course.category}</p>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <dl className="course-meta">
        <div>
          <dt>Lessons</dt>
          <dd>{course.lessons}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{course.duration}</dd>
        </div>
      </dl>
      <div className="course-outcome">
        <span>Practice Outcome</span>
        <strong>{course.outcome}</strong>
      </div>
      <Link href="/contact" aria-label={"Ask about " + course.title}>
        View Training Details <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}

export function CourseExplorer() {
  const [filter, setFilter] = useState<(typeof courseFilters)[number]>("All");
  const filteredCourses = useMemo(
    () => courses.filter((course) => filter === "All" || course.category === filter),
    [filter],
  );

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter by course category">
        {courseFilters.map((item) => (
          <button
            type="button"
            key={item}
            className={filter === item ? "active" : ""}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        Showing {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
      </p>
      <div className="course-grid">
        {filteredCourses.map((course, index) => (
          <CourseCard course={course} index={index} key={course.id} />
        ))}
      </div>
    </>
  );
}

const insightFilters: Array<"All" | Insight["category"]> = [
  "All",
  "Communication",
  "Voice Training",
  "Scenario Breakdown",
];

export function InsightGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<(typeof insightFilters)[number]>("All");
  const filtered = insights
    .filter((item) => filter === "All" || item.category === filter)
    .slice(0, limit);

  return (
    <>
      {!limit && (
        <div className="filter-bar insight-filter" role="group" aria-label="Filter by article category">
          {insightFilters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className="insight-grid">
        {filtered.map((item, index) => (
          <article className="insight-card" key={item.id}>
            <div className={"insight-visual " + item.accent} aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
              <i />
            </div>
            <div className="insight-body">
              <div>
                <span>{item.category}</span>
                <span>{item.readTime}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <details className="insight-summary">
                <summary className="text-link">
                  Read Summary <span aria-hidden="true">+</span>
                </summary>
                <p>{item.summary}</p>
              </details>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

type FormFields = {
  name: string;
  email: string;
  goal: string;
  message: string;
};

const initialFields: FormFields = {
  name: "",
  email: "",
  goal: "",
  message: "",
};

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormFields, string>> = {};
    if (!fields.name.trim()) nextErrors.name = "Please enter your name.";
    if (!fields.email.trim()) {
      nextErrors.email = "Please enter your contact email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!fields.goal) nextErrors.goal = "Please choose a learning goal.";
    if (fields.message.trim().length < 10) nextErrors.message = "Please enter at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }
    setFields(initialFields);
    setSubmitted(true);
  };

  return (
    <form className="contact-form" onSubmit={submitForm} noValidate>
      <div className="field-row">
        <div className="field-group">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            autoComplete="name"
          />
          {errors.name && <span id="contact-name-error">{errors.name}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="contact-email">Contact Email</label>
          <input
            id="contact-email"
            type="email"
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && <span id="contact-email-error">{errors.email}</span>}
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="contact-goal">Learning Goal</label>
        <select
          id="contact-goal"
          value={fields.goal}
          onChange={(event) => updateField("goal", event.target.value)}
          aria-invalid={Boolean(errors.goal)}
          aria-describedby={errors.goal ? "contact-goal-error" : undefined}
        >
          <option value="">Choose one primary goal</option>
          <option value="work">Give clearer workplace updates</option>
          <option value="pitch">Build stronger business pitches</option>
          <option value="stage">Prepare for public speaking</option>
          <option value="voice">Improve voice and manage nerves</option>
        </select>
        {errors.goal && <span id="contact-goal-error">{errors.goal}</span>}
      </div>
      <div className="field-group">
        <label htmlFor="contact-message">What would you like to improve?</label>
        <textarea
          id="contact-message"
          rows={6}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "message-hint"}
          placeholder="For example: My updates feel scattered, and I want a reliable structure."
        />
        {errors.message ? (
          <span id="contact-message-error">{errors.message}</span>
        ) : (
          <small id="message-hint">Add a few details so we can recommend the right starting point.</small>
        )}
      </div>
      <button className="button button-dark button-wide" type="submit">
        Submit My Goal
      </button>
      <div className={submitted ? "success-message visible" : "success-message"} role="status">
        <strong>Thank you — we’ve received your learning goals.</strong>
        <span>The Voxfield team will follow up at the email address you provided.</span>
      </div>
    </form>
  );
}
