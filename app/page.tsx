import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, InsightGrid, PricingSection } from "./components/Interactive";
import { testimonials } from "./data";

export const metadata: Metadata = {
  title: "首页",
  description:
    "声场 VOXFIELD 中文演讲训练平台，覆盖表达结构、声音呈现、现场影响与商业场景。",
};

const capabilities = [
  {
    number: "01",
    title: "结构先行",
    description: "把复杂内容压缩成听众能跟随、能记住、能行动的表达路径。",
    detail: "主张 / 证据 / 行动",
  },
  {
    number: "02",
    title: "声音有层次",
    description: "用气息、重音和停顿稳定节奏，让关键信息自然浮现。",
    detail: "气息 / 重音 / 停顿",
  },
  {
    number: "03",
    title: "现场有方向",
    description: "让视线、手势和空间移动服务于观点，而不是制造干扰。",
    detail: "视线 / 手势 / 空间",
  },
  {
    number: "04",
    title: "回应有边界",
    description: "识别问题意图，在追问、质疑与不同意见中保持清晰可信。",
    detail: "确认 / 回应 / 推进",
  },
];

const learningSteps = [
  {
    step: "定位",
    title: "先判断你为什么要说",
    copy: "明确听众、场景和希望推动的下一步，避免一开始就掉进内容细节。",
  },
  {
    step: "构建",
    title: "把想法组织成路径",
    copy: "从结论、理由到证据，建立一条听众不需要猜测的逻辑线。",
  },
  {
    step: "呈现",
    title: "让声音和身体支持观点",
    copy: "通过短时练习调整节奏、视线与动作，形成稳定的表达状态。",
  },
  {
    step: "复盘",
    title: "把一次经验沉淀成能力",
    copy: "用明确指标复盘内容与现场反馈，持续升级下一次表达。",
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
              <span /> 中文表达训练平台
            </p>
            <h1>
              让每一次表达，
              <em>都有清晰的力量。</em>
            </h1>
            <p className="hero-intro">
              不堆砌话术，从结构、声音与现场感开始，把“偶尔讲得好”练成稳定能力。
            </p>
            <div className="hero-actions">
              <Link className="button button-amber" href="/courses">
                查看训练路径 <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button-ghost-light" href="/contact">
                预约公开课
              </Link>
            </div>
          </div>
          <div className="hero-proof">
            <div>
              <strong>4</strong>
              <span>核心能力维度</span>
            </div>
            <div>
              <strong>10<span>min</span></strong>
              <span>单次刻意练习</span>
            </div>
            <div>
              <strong>28</strong>
              <span>场景训练任务</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>SCROLL TO LEARN</span>
          <i />
        </div>
      </section>

      <section className="statement-strip" aria-label="品牌主张">
        <div className="shell statement-inner">
          <span>VOXFIELD METHOD</span>
          <p>真正有影响力的表达，不是说得更多，而是让重要的事被听懂。</p>
          <i aria-hidden="true">↘</i>
        </div>
      </section>

      <section className="section capabilities-section" aria-labelledby="capabilities-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">核心训练</span>
              <h2 id="capabilities-title">四个维度，搭起稳定表达系统。</h2>
            </div>
            <p>
              从内容到现场，每个模块都对应一个可观察、可练习、可复盘的能力目标。
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
            <span className="eyebrow eyebrow-light">VOXFIELD 训练法</span>
            <h2 id="method-title">不是背一套技巧，而是建立一条自己的表达路径。</h2>
            <p>
              每个训练单元都从真实工作场景出发，完成一次“理解—练习—反馈—复盘”的短循环。
            </p>
            <Link className="text-link light-link" href="/courses">
              查看完整课程 <span aria-hidden="true">↗</span>
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
            <span className="eyebrow">真实场景</span>
            <h2 id="scenario-title">学的不是“演讲”，是下一次就要发生的表达。</h2>
          </div>
          <div className="scenario-grid">
            <article className="scenario-card large">
              <div className="scenario-label">01 / 工作汇报</div>
              <div>
                <h3>先给判断，再讲过程。</h3>
                <p>让上级快速抓住结论、风险和下一步，而不是在背景里寻找重点。</p>
              </div>
              <span className="scenario-shape shape-one" aria-hidden="true" />
            </article>
            <article className="scenario-card blue">
              <div className="scenario-label">02 / 商业提案</div>
              <div>
                <h3>让方案进入客户的决策路径。</h3>
                <p>从问题、价值到行动，把信息组织成可讨论的决定。</p>
              </div>
              <span className="scenario-shape shape-two" aria-hidden="true" />
            </article>
            <article className="scenario-card cream">
              <div className="scenario-label">03 / 公开分享</div>
              <div>
                <h3>在陌生目光前，仍然保持自己的节奏。</h3>
                <p>用开场、停顿与视线建立真实连接。</p>
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
              <span className="eyebrow">练习之后</span>
              <h2 id="voices-title">表达改变的，不只是一场发言。</h2>
            </div>
            <p>以下人物与反馈为案例网站的原创虚构内容，用于呈现产品体验。</p>
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
              <span className="eyebrow">表达洞察</span>
              <h2 id="insights-title">把方法带进每一次开口之前。</h2>
            </div>
            <Link className="text-link" href="/insights">
              查看全部文章 <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <InsightGrid limit={3} />
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq-title">
        <div className="shell faq-grid">
          <div className="faq-intro">
            <span className="eyebrow">常见问题</span>
            <h2 id="faq-title">开始之前，你可能想知道。</h2>
            <p>没有找到你的问题？可以通过联系页提交学习目标。</p>
            <Link className="button button-outline-dark" href="/contact">
              联系我们
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
            <span className="eyebrow eyebrow-light">下一次表达，从现在开始</span>
            <h2>你不需要成为另一个人，<br />只需要更清晰地成为自己。</h2>
          </div>
          <Link className="button button-amber" href="/contact">
            预约一次公开课 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
