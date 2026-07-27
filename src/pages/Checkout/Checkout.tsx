import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Package } from "@/domain/Package";
import { OrderService } from "@/services/OrderService";
import { PackageService } from "@/services/PackageService";

import styles from "./Checkout.module.css";

const packageService = new PackageService();
const orderService = new OrderService();

type SubmitState = "idle" | "submitting" | "error";

export function Checkout(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  useEffect(() => {
    if (!slug) return;
    packageService.getBySlug(slug).then(setPkg).catch(() => setPkg(null));
  }, [slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!slug) return;
    setState("submitting");
    try {
      const result = await orderService.submit({ packageSlug: slug, clientName: name, clientEmail: email });
      if (result.mode === "stripe" && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      navigate(`/order/${result.orderId}/confirmation`);
    } catch {
      setState("error");
    }
  }

  if (!pkg) return <p className="wrap">Loading.</p>;

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Checkout</span>
      <h1 className={styles.heading}>{pkg.name}</h1>
      <p className={styles.summary}>{pkg.priceDisplay}</p>

      <form onSubmit={handleSubmit} className={styles.row}>
        <label>
          Name
          <input required value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Processing." : "Continue"}
        </button>
        {state === "error" && <p role="alert">Something went wrong. Try again.</p>}
        <p className={styles.notice}>
          Payments are running in demo mode while Stripe is being set up. No card is charged.
        </p>
      </form>
    </section>
  );
}
