import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePageTitle } from "@/hooks/usePageTitle";
import { AuthService } from "@/services/AuthService";

import styles from "./PortalLogin.module.css";

const authService = new AuthService();

type SubmitState = "idle" | "submitting" | "error";

export function PortalLogin(): ReactElement {
  usePageTitle("Portal login");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState("submitting");
    try {
      await authService.login(email, password);
      navigate("/portal");
    } catch {
      setState("error");
    }
  }

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Client portal</span>
      <h1 className={styles.heading}>Sign in.</h1>

      <form onSubmit={handleSubmit} className={styles.row}>
        <label>
          Email
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Signing in." : "Sign in"}
        </button>
        {state === "error" && <p role="alert">Incorrect email or password.</p>}
      </form>
    </section>
  );
}
