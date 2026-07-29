import type { FormEvent, ReactElement } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import { NewsletterService } from "@/services/NewsletterService";

import { Icon } from "../Icon/Icon";
import styles from "./Footer.module.css";

const NAVIGATE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
  { to: "/brand", label: "Brand" },
];

const ELSEWHERE_LINKS = [
  { href: "mailto:hello@undertow.dev", label: "Email", icon: "mail" as const, external: false },
  { href: "https://github.com/hassanireza", label: "GitHub", icon: "github" as const, external: true },
];

const newsletterService = new NewsletterService();

type SubscribeState = "idle" | "submitting" | "success" | "error";

export function Footer(): ReactElement {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubscribeState>("idle");

  async function handleSubscribe(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState("submitting");
    try {
      await newsletterService.subscribe(email);
      setState("success");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.top}`}>
        <div className={styles.signupColumn}>
          <span className={styles.columnHeading}>Stay in the current</span>
          <h2 className={styles.signupHeading}>Notes on design, sent occasionally.</h2>

          {state === "success" ? (
            <p className={styles.signupSuccess}>You are on the list.</p>
          ) : (
            <form onSubmit={handleSubscribe} className={styles.signupForm} aria-label="Newsletter signup">
              <label className={styles.signupLabel} htmlFor="footer-email">
                Email
              </label>
              <div className={styles.signupRow}>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.signupInput}
                />
                <button type="submit" disabled={state === "submitting"} className={styles.signupButton}>
                  {state === "submitting" ? "Joining." : "Subscribe"}
                </button>
              </div>
              {state === "error" && <p className={styles.signupError}>Something went wrong. Try again.</p>}
            </form>
          )}
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.column}>
            <span className={styles.columnHeading}>Navigate</span>
            <nav className={styles.linkList} aria-label="Footer navigation">
              {NAVIGATE_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.column}>
            <span className={styles.columnHeading}>Elsewhere</span>
            <div className={styles.linkList}>
              {ELSEWHERE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.footerLink}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                >
                  <Icon name={link.icon} size={14} className={styles.linkIcon} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`wrap ${styles.bottomBar}`}>
        <span>Undertow, {year}</span>
        <Link to="/portal/login" className={styles.brandLink}>
          Client login
        </Link>
      </div>
    </footer>
  );
}
