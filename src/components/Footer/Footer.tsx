import type { ReactElement } from "react";

import { Link } from "react-router-dom";

import { Icon } from "../Icon/Icon";
import { Logo } from "../Logo/Logo";
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

export function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.brandColumn}>
          <Logo size={28} />
          <p className={styles.tagline}>
            A studio for the current beneath the surface. Web design and motion graphics.
          </p>
        </div>

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

      <div className={`wrap ${styles.bottomBar}`}>
        <span>Undertow, {year}</span>
        <span className={styles.credit}>
          Site by{" "}
          <a href="https://hassanireza.github.io/" target="_blank" rel="noreferrer">
            Reza Hassani
            <Icon name="arrow-up-right" size={12} className={styles.creditIcon} />
          </a>
        </span>
      </div>
    </footer>
  );
}
