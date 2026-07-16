import type { Metadata } from "next";
import Link from "next/link";
import { CourseExplorer } from "../components/Interactive";

export const metadata: Metadata = {
  title: "训练课程",
  description: "按表达结构、声音呈现、现场影响与商业场景探索声场 VOXFIELD 训练课程。",
};

const tracks = [
  {
    code: "A",
    title: "清晰表达起步",
    duration: "2—3 周",
    copy: "从三分钟发言开始，建立结论先行、重点明确的基本结构。",
  },
  {
    code: "B",
    title: "声音与现场进阶",
    duration: "3—4 周",
    copy: "稳定气息、节奏与动作，在多人场景中保持自然存在感。",
  },
  {
    code: "C",
    title: "商业场景实战",
    duration: "4—6 周",
    copy: "把表达能力带进提案、汇报、问答与重要会议。",
  },
];

export default function CoursesPage() {
  return (
    <main id="main-content">
      <section className="page-hero courses-hero">
        <div className="shell page-hero-grid">
          <div>
            <span className="eyebrow eyebrow-light">COURSE LIBRARY / 课程库</span>
            <h1>把抽象的“会说话”，拆成每天能练的动作。</h1>
          </div>
          <div className="page-hero-side">
            <p>
              每门课程围绕一个明确成果设计。少量方法、真实场景、可以完成的短练习。
            </p>
            <Link className="button button-amber" href="/contact">
              获取学习建议 <span aria-hidden="true">↗</span>
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
              <span className="eyebrow">建议路径</span>
              <h2 id="tracks-title">从当前场景出发，不必从头学起。</h2>
            </div>
            <p>你可以按顺序完成，也可以直接进入最接近当前任务的课程。</p>
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
            <span className="eyebrow">全部课程</span>
            <h2 id="library-title">选择你最想改变的表达环节。</h2>
          </div>
          <CourseExplorer />
        </div>
      </section>

      <section className="mini-cta">
        <div className="shell mini-cta-inner">
          <div>
            <span>还不确定从哪里开始？</span>
            <h2>告诉我们你的下一次重要表达。</h2>
          </div>
          <Link className="button button-dark" href="/contact">
            提交学习目标
          </Link>
        </div>
      </section>
    </main>
  );
}
