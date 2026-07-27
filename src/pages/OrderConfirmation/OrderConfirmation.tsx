import type { ReactElement } from "react";
import { useParams } from "react-router-dom";

import styles from "./OrderConfirmation.module.css";

export function OrderConfirmation(): ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Order #{id}</span>
      <h1 className={styles.heading}>You are in.</h1>
      <p>
        This order was placed in demo mode. No payment was taken. I will reach out by email to confirm
        details and next steps.
      </p>
    </section>
  );
}
