import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/Interactive";

export const metadata: Metadata = {
  title: "联系我们",
  description: "提交你的演讲、汇报或商业表达目标，体验声场 VOXFIELD 本地咨询表单。",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="contact-hero">
        <div className="shell contact-hero-grid">
          <div className="contact-copy">
            <span className="eyebrow eyebrow-light">TALK TO US / 联系</span>
            <h1>告诉我们，下一次你想把什么讲清楚。</h1>
            <p>
              可以是一场汇报、一次提案、一次公开分享，或只是希望自己不再一开口就紧张。
            </p>
            <div className="contact-points">
              <div>
                <span>01</span>
                <p>描述你即将面对的场景</p>
              </div>
              <div>
                <span>02</span>
                <p>选择最想改善的能力</p>
              </div>
              <div>
                <span>03</span>
                <p>完成一次本地演示提交</p>
              </div>
            </div>
          </div>
          <div className="contact-form-panel">
            <div className="form-panel-heading">
              <span>学习目标问卷</span>
              <small>约 2 分钟</small>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section contact-info-section" aria-labelledby="contact-info-title">
        <div className="shell">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">其他方式</span>
              <h2 id="contact-info-title">先浏览，也可以。</h2>
            </div>
            <p>所有联系信息均为案例网站的演示内容。</p>
          </div>
          <div className="contact-info-grid">
            <article>
              <span>课程与路径</span>
              <h3>从当前场景找到一门课</h3>
              <p>按表达结构、声音、现场或商业场景筛选课程。</p>
              <Link href="/courses">浏览课程 ↗</Link>
            </article>
            <article>
              <span>电子邮箱</span>
              <h3>hello@voxfield.example</h3>
              <p>示例邮箱地址，不接收真实邮件。</p>
              <a href="mailto:hello@voxfield.example">打开邮件应用 ↗</a>
            </article>
            <article>
              <span>工作时间</span>
              <h3>周一至周五</h3>
              <p>09:30—18:00，案例中不提供真实客服。</p>
              <Link href="/insights">阅读表达笔记 ↗</Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
