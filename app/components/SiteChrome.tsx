"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/courses", label: "课程" },
  { href: "/insights", label: "表达洞察" },
  { href: "/contact", label: "联系" },
];

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="声场 VOXFIELD 首页">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-copy">
        <strong>声场</strong>
        <small>VOXFIELD</small>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const showDemoNotice = () => {
    setNotice("案例演示暂未连接真实学员账户");
    window.setTimeout(() => setNotice(""), 3200);
  };

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <nav
            id="primary-navigation"
            className={menuOpen ? "primary-nav is-open" : "primary-nav"}
            aria-label="主导航"
          >
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "nav-link active" : "nav-link"}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <button className="nav-login" type="button" onClick={showDemoNotice}>
              学员入口
            </button>
            <Link className="button button-small button-amber" href="/contact">
              预约公开课
            </Link>
          </nav>
          <button
            className={menuOpen ? "menu-button is-open" : "menu-button"}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={notice ? "demo-toast is-visible" : "demo-toast"} role="status">
        {notice}
      </div>
    </>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      setStatus("请输入有效的邮箱地址");
      return;
    }
    setStatus("已记录演示订阅，本案例不会发送数据");
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="shell footer-lead">
        <div>
          <span className="eyebrow eyebrow-light">每周一封表达练习</span>
          <h2>把一次好表达，练成稳定能力。</h2>
        </div>
        <form className="newsletter-form" onSubmit={submitNewsletter} noValidate>
          <label htmlFor="newsletter-email">邮箱地址</label>
          <div>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              aria-describedby="newsletter-status"
              required
            />
            <button className="button button-amber" type="submit">
              获取练习
            </button>
          </div>
          <p id="newsletter-status" className="form-status" aria-live="polite">
            {status || "仅作前端交互演示，不会发送邮件。"}
          </p>
        </form>
      </div>
      <div className="shell footer-grid">
        <div className="footer-brand-block">
          <Brand />
          <p>用结构、声音和现场感，让每一次表达都更有方向。</p>
        </div>
        <div>
          <h3>探索</h3>
          <Link href="/courses">训练课程</Link>
          <Link href="/insights">表达洞察</Link>
          <Link href="/contact">预约咨询</Link>
        </div>
        <div>
          <h3>案例说明</h3>
          <span>虚构品牌与内容</span>
          <span>无真实支付功能</span>
          <span>无数据外传</span>
        </div>
        <div>
          <h3>联系</h3>
          <a href="mailto:hello@voxfield.example">hello@voxfield.example</a>
          <span>周一至周五 09:30—18:00</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 声场 VOXFIELD</span>
        <span>原创案例学习网站</span>
      </div>
    </footer>
  );
}
