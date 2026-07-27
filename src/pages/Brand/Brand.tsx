import type { ReactElement } from "react";

import { Icon } from "@/components/Icon/Icon";
import type { IconName } from "@/components/Icon/icons";
import { Logo } from "@/components/Logo/Logo";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import styles from "./Brand.module.css";

const COLORS = [
  { name: "Paper", hex: "#F4F1E9", use: "Primary background" },
  { name: "Ink", hex: "#14130F", use: "Primary text, mark" },
  { name: "Accent", hex: "#A4462C", use: "Links, emphasis, active states" },
  { name: "Ink Soft", hex: "#4A4740", use: "Secondary text" },
  { name: "Paper Dim", hex: "#ECE7D9", use: "Recessed surfaces, cards" },
  { name: "Accent Soft", hex: "#C97E5C", use: "Hover states, tints" },
];

const ICONS: readonly IconName[] = [
  "arrow-right",
  "arrow-up-right",
  "chevron-down",
  "close",
  "menu",
  "mail",
  "phone",
  "location",
  "calendar",
  "download",
  "github",
  "linkedin",
  "play",
  "quote",
  "plus",
  "minus",
  "external-link",
];

export function Brand(): ReactElement {
  usePageTitle("Brand");
  const sectionRef = useScrollReveal<HTMLElement>({ selector: `.${styles.block}`, stagger: 0 });

  return (
    <section ref={sectionRef} className={`wrap ${styles.section}`}>
      <span className="eyebrow">Brand guidelines</span>
      <h1 className={styles.heading}>The pull beneath the surface.</h1>
      <p className={styles.intro}>
        Undertow is built on a single tension. The calm, paper lit surface of a page, and the current
        running underneath it, slow and deliberate, pulling everything toward a center. A spiral mark
        stands in for the current itself, a single unbroken line, drawn inward, never resolving to a hard
        stop. The wordmark sits in a quiet italic serif, like ink settled into paper. This page documents
        the working rules for that identity.
      </p>

      <div className={styles.block}>
        <span className="eyebrow">Logo</span>
        <h2 className={styles.blockHeading}>Construction and lockups</h2>

        <div className={styles.logoRow}>
          <div>
            <div className={styles.logoCard}>
              <Logo size={40} />
            </div>
            <p className={styles.logoCaption}>Horizontal. Primary lockup</p>
          </div>
          <div>
            <div className={`${styles.logoCard} ${styles.logoCardDark}`}>
              <span style={{ color: "var(--color-paper)" }}>
                <Logo size={40} withWordmark={false} />
              </span>
            </div>
            <p className={styles.logoCaption}>Mark alone. Paper on ink</p>
          </div>
        </div>

        <div className={styles.ruleList}>
          <div className={styles.ruleItem}>
            <span className={styles.ruleTitle}>Clear space</span>
            Keep a minimum margin equal to half the mark's width free of type, edges, or other marks on
            every side.
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleTitle}>Minimum size</span>
            Do not render the mark smaller than 16px on screen. Below that, the coil closes visually into
            a dot.
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleTitle}>Misuse</span>
            Never recolor off palette, distort, stretch, pair with another typeface, or add effects and
            shadows to the mark.
          </div>
        </div>
      </div>

      <div className={styles.block}>
        <span className="eyebrow">Color</span>
        <h2 className={styles.blockHeading}>Palette</h2>
        <p className={styles.intro} style={{ marginBottom: "var(--space-6)" }}>
          A warm paper and ink base with a single rust accent, used sparingly as a mark of emphasis rather
          than decoration.
        </p>

        <div className={styles.swatchGrid}>
          {COLORS.map((color) => (
            <div key={color.hex} className={styles.swatch}>
              <div className={styles.swatchColor} style={{ background: color.hex }} />
              <div className={styles.swatchLabel}>
                <div className={styles.swatchName}>{color.name}</div>
                <div className={styles.swatchHex}>{color.hex}</div>
                <div className={styles.swatchUse}>{color.use}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <span className="eyebrow">Typography</span>
        <h2 className={styles.blockHeading}>Typeface system</h2>

        <div className={styles.typeGrid}>
          <div className={styles.typeSpecimen}>
            <span className={styles.typeName}>Display. Cormorant Garamond</span>
            <p className={styles.typeDisplay}>A studio mark for careful, considered work.</p>
          </div>
          <div className={styles.typeSpecimen}>
            <span className={styles.typeName}>Body. Jost</span>
            <p className={styles.typeBody}>
              The current pulls the paper under, slow and unhurried, gathering everything toward a single
              quiet center.
            </p>
          </div>
          <div className={styles.typeSpecimen}>
            <span className={styles.typeName}>Mono. JetBrains Mono</span>
            <p className={styles.typeMono}>ABCDEFGHIJKLM abcdefghijklm 0123456789</p>
          </div>
        </div>
      </div>

      <div className={styles.block}>
        <span className="eyebrow">Iconography</span>
        <h2 className={styles.blockHeading}>Icon pack</h2>
        <p className={styles.intro} style={{ marginBottom: "var(--space-6)" }}>
          Seventeen icons drawn in the same hand as the mark. Uniform stroke, fully rounded caps and
          joins, no fills, no hard corners.
        </p>

        <div className={styles.iconGrid}>
          {ICONS.map((name) => (
            <div key={name} className={styles.iconCell}>
              <Icon name={name} size={22} />
              <span className={styles.iconCellLabel}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
