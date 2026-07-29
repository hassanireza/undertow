import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Package } from "@/domain/Package";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AuthService } from "@/services/AuthService";
import { OrderService } from "@/services/OrderService";
import { PackageService } from "@/services/PackageService";

import styles from "./Checkout.module.css";

const packageService = new PackageService();
const orderService = new OrderService();
const authService = new AuthService();

type SubmitState = "idle" | "submitting" | "error";

export function Checkout(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  usePageTitle(pkg ? `Checkout, ${pkg.name}` : "Checkout");
  const sectionRef = useScrollReveal<HTMLElement>({
    selector: `.${styles.heading}, .${styles.summary}, .${styles.row}`,
    once: true,
    y: 16,
  });

  const isLoggedIn = authService.isAuthenticated();
  const accountEmail = authService.currentEmail();

  useEffect(() => {
    if (!slug) return;
    packageService.getBySlug(slug).then(setPkg).catch(() => setPkg(null));
  }, [slug]);

  useEffect(() => {
    if (isLoggedIn && accountEmail) setEmail(accountEmail);
  }, [isLoggedIn, accountEmail]);

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
      navigate(isLoggedIn ? "/portal" : `/order/${result.orderId}/confirmation`);
    } catch {
      setState("error");
    }
  }

  if (!pkg) return <p className="wrap">Loading.</p>;

  return (
    <section ref={sectionRef} className={`wrap ${styles.section}`}>
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
          <input
            required
            type="email"
            value={email}
            readOnly={isLoggedIn}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Processing." : "Continue"}
        </button>
        {state === "error" && <p role="alert">Something went wrong. Try again.</p>}
        <p className={styles.notice}>
          Payments are running in demo mode while Stripe is being set up. No card is charged.
        </p>
        {!isLoggedIn && (
          <p className={styles.notice}>
            Have an account? <Link to="/portal/login">Sign in</Link> for faster checkout, or{" "}
            <Link to="/portal/register">create one</Link>.
          </p>
        )}
      </form>
    </section>
  );
}
