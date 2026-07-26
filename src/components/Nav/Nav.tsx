import type { ReactElement } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Nav.module.css";

const LINKS = [
  { to: "/", label: "Undertow" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
];

export function Nav(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <NavLink to="/" className={styles.mark ?? ""} onClick={() => setIsOpen(false)}>
          Undertow
        </NavLink>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>

        <nav className={`${styles.links} ${isOpen ? styles.linksOpen : ""}`} aria-label="Primary">
          {LINKS.slice(1).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
