import type { ReactElement } from "react";

import styles from "./Footer.module.css";

export function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.row}`}>
        <span>Undertow, {year}</span>
        <span className={styles.credit}>
          Site by{" "}
          <a href="https://hassanireza.github.io/" target="_blank" rel="noreferrer">
            Reza Hassani
          </a>
        </span>
      </div>
    </footer>
  );
}
