import type { ReactElement } from "react";

import styles from "./Logo.module.css";

const MARK_PATH =
  "M 71.24 65.43 L 72.13 63.80 L 72.90 62.13 L 73.55 60.41 L 74.06 58.66 L 74.45 56.90 L 74.71 55.12 L 74.85 53.34 L 74.85 51.56 L 74.73 49.81 L 74.49 48.07 L 74.12 46.37 L 73.64 44.72 L 73.05 43.11 L 72.35 41.56 L 71.54 40.07 L 70.64 38.65 L 69.64 37.32 L 68.56 36.06 L 67.40 34.90 L 66.18 33.82 L 64.88 32.85 L 63.53 31.98 L 62.13 31.21 L 60.69 30.55 L 59.22 29.99 L 57.73 29.55 L 56.22 29.22 L 54.70 28.99 L 53.18 28.88 L 51.66 28.88 L 50.17 28.98 L 48.69 29.19 L 47.25 29.50 L 45.84 29.91 L 44.48 30.42 L 43.17 31.02 L 41.91 31.70 L 40.72 32.47 L 39.59 33.31 L 38.54 34.22 L 37.56 35.20 L 36.66 36.24 L 35.85 37.33 L 35.13 38.46 L 34.49 39.64 L 33.94 40.84 L 33.49 42.07 L 33.12 43.32 L 32.86 44.58 L 32.68 45.84 L 32.60 47.10 L 32.60 48.36 L 32.70 49.59 L 32.88 50.81 L 33.15 51.99 L 33.50 53.15 L 33.92 54.26 L 34.43 55.33 L 35.00 56.35 L 35.63 57.32 L 36.33 58.23 L 37.08 59.08 L 37.89 59.86 L 38.74 60.58 L 39.63 61.22 L 40.55 61.79 L 41.50 62.29 L 42.48 62.72 L 43.47 63.07 L 44.48 63.34 L 45.48 63.54 L 46.49 63.66 L 47.50 63.70 L 48.49 63.68 L 49.47 63.58 L 50.42 63.42 L 51.35 63.19 L 52.25 62.89 L 53.11 62.54 L 53.94 62.13 L 54.72 61.66 L 55.46 61.15 L 56.15 60.59 L 56.79 59.99 L 57.37 59.35 L 57.90 58.68 L 58.37 57.99 L 58.78 57.27 L 59.14 56.53 L 59.43 55.78 L 59.67 55.02 L 59.84 54.26 L 59.96 53.50 L 60.02 52.74 L 60.02 51.99 L 59.97 51.26 L 59.87 50.54 L 59.71 49.85 L 59.51 49.18 L 59.26 48.53 L 58.97 47.92 L 58.64 47.34 L 58.27 46.80 L 57.87 46.30 L 57.44 45.83 L 56.99 45.41 L 56.51 45.03 L 56.02 44.69 L 55.51 44.40 L 54.99 44.15 L 54.47 43.95 L 53.94 43.79 L 53.41 43.68 L 52.89 43.61 L 52.37 43.58 L 51.86 43.59 L 51.37 43.64 L 50.89 43.73 L 50.44 43.85 L 50.00 44.00";

interface LogoProps {
    withWordmark?: boolean;
    size?: number;
  className?: string | undefined;
}

export function Logo({ withWordmark = true, size = 36, className }: LogoProps): ReactElement {
  return (
    <span className={`${styles.lockup} ${className ?? ""}`}>
      <svg
        className={styles.mark}
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={MARK_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && <span className={styles.word}>Undertow</span>}
    </span>
  );
}
