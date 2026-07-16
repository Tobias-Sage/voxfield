"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="VOXFIELD home">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-copy">
        <strong>VOXFIELD</strong>
        <small>SPEAK WITH IMPACT</small>
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
    setNotice("This case-study demo is not connected to a real student account.");
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
            aria-label="Primary navigation"
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
              Student Login
            </button>
            <Link className="button button-small button-amber" href="/contact">
              Book a Class
            </Link>
          </nav>
          <button
            className={menuOpen ? "menu-button is-open" : "menu-button"}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("Demo signup recorded locally. No data was sent.");
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="shell footer-lead">
        <div>
          <span className="eyebrow eyebrow-light">One speaking drill every week</span>
          <h2>Turn one strong presentation into a repeatable skill.</h2>
        </div>
        <form className="newsletter-form" onSubmit={submitNewsletter} noValidate>
          <label htmlFor="newsletter-email">Email address</label>
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
              Get the Drill
            </button>
          </div>
          <p id="newsletter-status" className="form-status" aria-live="polite">
            {status || "Front-end demo only. No email will be sent."}
          </p>
        </form>
      </div>
      <div className="shell footer-grid">
        <div className="footer-brand-block">
          <Brand />
          <p>Build structure, voice, and presence so every message has direction.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/courses">Training Courses</Link>
          <Link href="/insights">Speaking Insights</Link>
          <Link href="/contact">Book a Consultation</Link>
        </div>
        <div>
          <h3>Demo Notes</h3>
          <span>Fictional brand and content</span>
          <span>No real payment features</span>
          <span>No external data transfer</span>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:hello@voxfield.example">hello@voxfield.example</a>
          <span>Monday to Friday, 9:30–18:00</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 VOXFIELD</span>
        <span>Original case-study website</span>
      </div>
    </footer>
  );
}
