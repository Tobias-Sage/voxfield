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

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="section section-dark" id="plans" aria-labelledby="plans-title">
      <div className="shell">
        <div className="section-heading section-heading-split light">
          <div>
            <span className="eyebrow eyebrow-light">训练计划</span>
            <h2 id="plans-title">按你的表达频率，选择练习节奏。</h2>
          </div>
          <div className="billing-toggle" role="group" aria-label="计费周期">
            <button
              type="button"
              className={!annual ? "active" : ""}
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
            >
              月付
            </button>
            <button
              type="button"
              className={annual ? "active" : ""}
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
            >
              年付 <span>省 20%</span>
            </button>
          </div>
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => {
            const monthlyEquivalent = Math.round(plan.annual / 12);
            return (
              <article
                className={plan.featured ? "pricing-card featured" : "pricing-card"}
                key={plan.name}
              >
                {plan.featured && <span className="plan-badge">高频表达者推荐</span>}
                <p className="plan-eyebrow">{plan.eyebrow}</p>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price" aria-live="polite">
                  <span>¥</span>
                  <strong>{annual ? monthlyEquivalent : plan.monthly}</strong>
                  <small>/ 月</small>
                </div>
                <p className="billing-note">
                  {annual ? "按年计费 ¥" + plan.annual + "，可随时停止续订" : "按月计费，可随时停止续订"}
                </p>
                <ul className="check-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  className={plan.featured ? "button button-dark" : "button button-outline-dark"}
                  href={"/contact?plan=" + encodeURIComponent(plan.name)}
                >
                  选择该计划
                </Link>
              </article>
            );
          })}
        </div>
        <p className="demo-disclaimer">
          以上价格与权益均为案例演示。按钮不会产生付款，会进入本地咨询页面。
        </p>
      </div>
    </section>
  );
}

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

const courseFilters: Array<"全部" | CourseCategory> = [
  "全部",
  "表达结构",
  "声音呈现",
  "现场影响",
  "商业场景",
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
          <dt>内容</dt>
          <dd>{course.lessons} 节</dd>
        </div>
        <div>
          <dt>时长</dt>
          <dd>{course.duration}</dd>
        </div>
      </dl>
      <div className="course-outcome">
        <span>练习成果</span>
        <strong>{course.outcome}</strong>
      </div>
      <Link href="/contact" aria-label={"咨询课程：" + course.title}>
        查看训练方式 <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}

export function CourseExplorer() {
  const [filter, setFilter] = useState<(typeof courseFilters)[number]>("全部");
  const filteredCourses = useMemo(
    () => courses.filter((course) => filter === "全部" || course.category === filter),
    [filter],
  );

  return (
    <>
      <div className="filter-bar" role="group" aria-label="按课程类型筛选">
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
        当前显示 {filteredCourses.length} 门课程
      </p>
      <div className="course-grid">
        {filteredCourses.map((course, index) => (
          <CourseCard course={course} index={index} key={course.id} />
        ))}
      </div>
    </>
  );
}

const insightFilters: Array<"全部" | Insight["category"]> = [
  "全部",
  "表达方法",
  "声音训练",
  "场景拆解",
];

export function InsightGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<(typeof insightFilters)[number]>("全部");
  const filtered = insights
    .filter((item) => filter === "全部" || item.category === filter)
    .slice(0, limit);

  return (
    <>
      {!limit && (
        <div className="filter-bar insight-filter" role="group" aria-label="按文章类型筛选">
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
              <button
                type="button"
                className="text-link demo-article-link"
                onClick={() => window.alert("文章详情为案例演示，未连接内容后台。")}
              >
                阅读摘要 <span aria-hidden="true">↗</span>
              </button>
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
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormFields, string>> = {};
    if (!fields.name.trim()) nextErrors.name = "请填写姓名";
    if (!fields.email.trim()) {
      nextErrors.email = "请填写联系邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = "请输入有效的邮箱格式";
    }
    if (!fields.goal) nextErrors.goal = "请选择学习目标";
    if (fields.message.trim().length < 10) nextErrors.message = "请至少输入 10 个字";
    if (!consent) setConsentError("请确认你了解这是本地案例演示");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !consent) {
      setSubmitted(false);
      return;
    }
    setFields(initialFields);
    setConsent(false);
    setConsentError("");
    setSubmitted(true);
  };

  return (
    <form className="contact-form" onSubmit={submitForm} noValidate>
      <div className="field-row">
        <div className="field-group">
          <label htmlFor="contact-name">姓名</label>
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
          <label htmlFor="contact-email">联系邮箱</label>
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
        <label htmlFor="contact-goal">学习目标</label>
        <select
          id="contact-goal"
          value={fields.goal}
          onChange={(event) => updateField("goal", event.target.value)}
          aria-invalid={Boolean(errors.goal)}
          aria-describedby={errors.goal ? "contact-goal-error" : undefined}
        >
          <option value="">请选择一个主要目标</option>
          <option value="work">职场汇报更清晰</option>
          <option value="pitch">提升商业提案能力</option>
          <option value="stage">准备公开演讲</option>
          <option value="voice">改善声音与紧张感</option>
        </select>
        {errors.goal && <span id="contact-goal-error">{errors.goal}</span>}
      </div>
      <div className="field-group">
        <label htmlFor="contact-message">想解决的具体问题</label>
        <textarea
          id="contact-message"
          rows={6}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "message-hint"}
          placeholder="例如：汇报时容易讲得太散，希望建立稳定结构……"
        />
        {errors.message ? (
          <span id="contact-message-error">{errors.message}</span>
        ) : (
          <small id="message-hint">至少 10 个字，本页面不会发送真实数据。</small>
        )}
      </div>
      <label className="consent-check">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            setConsentError("");
          }}
          aria-invalid={Boolean(consentError)}
          aria-describedby={consentError ? "consent-error" : undefined}
        />
        <span>我了解这是案例演示，提交内容仅在当前页面校验。</span>
      </label>
      {consentError && <span className="consent-error" id="consent-error">{consentError}</span>}
      <button className="button button-dark button-wide" type="submit">
        提交学习目标
      </button>
      <div className={submitted ? "success-message visible" : "success-message"} role="status">
        <strong>已完成本地演示提交</strong>
        <span>没有数据被发送。你可以继续浏览课程或重新填写。</span>
      </div>
    </form>
  );
}
