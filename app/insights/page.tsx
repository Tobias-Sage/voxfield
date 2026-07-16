import type { Metadata } from "next";
import Link from "next/link";
import { InsightGrid } from "../components/Interactive";

export const metadata: Metadata = {
  title: "表达洞察",
  description: "关于表达结构、声音训练和真实沟通场景的原创方法文章。",
};

export default function InsightsPage() {
  return (
    <main id="main-content">
      <section className="page-hero insight-page-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="eyebrow eyebrow-light">FIELD NOTES / 表达现场笔记</span>
            <h1>好表达，常常发生在开口之前。</h1>
          </div>
          <div className="page-hero-side">
            <p>
              用短文章拆解结构、声音与现场选择，把一次经验变成下一次可复用的方法。
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
            <span className="eyebrow">本周精选 · 表达方法</span>
            <h2 id="featured-title">准备一场汇报时，先写“听众离开时应该记住什么”。</h2>
            <p>
              当这个句子足够清楚，开场、数据和案例才有选择标准。否则，准备越充分，听众越可能迷失在信息里。
            </p>
            <div className="article-meta">
              <span>7 分钟阅读</span>
              <span>案例文章</span>
            </div>
            <Link className="button button-dark" href="#note-list-title">
              查看方法摘要
            </Link>
          </article>
        </div>
      </section>

      <section className="section insight-library" aria-labelledby="note-list-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">全部笔记</span>
              <h2 id="note-list-title">从一个具体问题开始。</h2>
            </div>
            <p>文章详情按钮为本地演示，不会加载或请求外部内容。</p>
          </div>
          <InsightGrid />
        </div>
      </section>

      <section className="mini-cta mini-cta-dark">
        <div className="shell mini-cta-inner">
          <div>
            <span>把阅读变成练习</span>
            <h2>选择一门课，完成下一次真实表达。</h2>
          </div>
          <Link className="button button-amber" href="/courses">
            浏览训练课程
          </Link>
        </div>
      </section>
    </main>
  );
}
