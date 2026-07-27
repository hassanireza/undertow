import type { ReactElement } from "react";
import { useParams } from "react-router-dom";

import { usePageTitle } from "@/hooks/usePageTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import styles from "./OrderConfirmation.module.css";

export function OrderConfirmation(): ReactElement {
  const { id } = useParams<{ id: string }>();
  usePageTitle("Order confirmed");
  const sectionRef = useScrollReveal<HTMLElement>({
    selector: `.eyebrow, .${styles.heading}, p`,
    once: true,
    y: 16,
  });

  return (
    <section ref={sectionRef} className={`wrap ${styles.section}`}>
      <span className="eyebrow">Order #{id}</span>
      <h1 className={styles.heading}>You are in.</h1>
      <p>
        This order was placed in demo mode. No payment was taken. I will reach out by email to confirm
        details and next steps.
      </p>
    </section>
  );
}
