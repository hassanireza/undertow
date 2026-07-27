import type { ReactElement } from "react";

import { Link } from "react-router-dom";

import { Icon } from "../Icon/Icon";
import styles from "./Footer.module.css";

export function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.row}`}>
        <span>Undertow, {year}</span>
        <Link to="/brand" className={styles.brandLink}>
          Brand
        </Link>
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
