import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

import { AuthService } from "@/services/AuthService";

import { Icon } from "../Icon/Icon";
import { Logo } from "../Logo/Logo";
import styles from "./Nav.module.css";

const authService = new AuthService();

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
  { to: "/brand", label: "Brand" },
];

export class FocusTrap {
  constructor(private readonly container: HTMLElement) {}

  private focusableElements(): HTMLElement[] {
    return Array.from(
      this.container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Tab") return;
    const elements = this.focusableElements();
    if (elements.length === 0) return;

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  focusFirst(): void {
    this.focusableElements()[0]?.focus();
  }
}

export function Nav(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const trapRef = useRef<FocusTrap | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      trapRef.current = new FocusTrap(panel);

      const links = panel.querySelectorAll(`.${styles.menuLink}`);
      gsap.set(panel, { display: "flex" });
      gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        links,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.1, ease: "power3.out" },
      );

      trapRef.current.focusFirst();
      document.addEventListener("keydown", trapRef.current.handleKeyDown);

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "";
        if (trapRef.current) document.removeEventListener("keydown", trapRef.current.handleKeyDown);
        document.removeEventListener("keydown", handleEscape);
      };
    }

    gsap.to(panel, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => gsap.set(panel, { display: "none" }),
    });
    toggleRef.current?.focus();
    return undefined;
  }, [isOpen]);

  const menuPanel = (
    <div
      id="mobile-menu"
      ref={panelRef}
      className={styles.menuPanel}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <nav className={styles.menuNav} aria-label="Mobile primary">
        {LINKS.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.menuLinkActive : ""}`}
          >
            <span className={styles.menuLinkIndex}>{String(i + 1).padStart(2, "0")}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.menuFooter}>
        {isLoggedIn ? (
          <>
            <NavLink to="/portal" className={styles.menuContact ?? ""}>
              My portal
            </NavLink>
            <button
              type="button"
              className={styles.menuContact}
              onClick={() => {
                authService.logout();
                setIsOpen(false);
                navigate("/");
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <NavLink to="/portal/login" className={styles.menuContact ?? ""}>
            Client login
          </NavLink>
        )}
      </div>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <NavLink to="/" className={styles.mark ?? ""}>
          <Logo />
        </NavLink>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Icon name={isOpen ? "close" : "menu"} size={22} />
        </button>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {createPortal(menuPanel, document.body)}
    </header>
  );
}
