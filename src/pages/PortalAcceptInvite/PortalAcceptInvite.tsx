import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { usePageTitle } from "@/hooks/usePageTitle";
import { AuthService } from "@/services/AuthService";

import styles from "../PortalLogin/PortalLogin.module.css";

const authService = new AuthService();

type SubmitState = "idle" | "submitting" | "error";

export function PortalAcceptInvite(): ReactElement {
  usePageTitle("Set your password");
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!token) return;
    setState("submitting");
    try {
      await authService.acceptInvite(token, password);
      navigate("/portal");
    } catch {
      setState("error");
    }
  }

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Welcome</span>
      <h1 className={styles.heading}>Set your password.</h1>

      <form onSubmit={handleSubmit} className={styles.row}>
        <label>
          Password
          <input
            required
            minLength={8}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Setting up." : "Set password and sign in"}
        </button>
        {state === "error" && <p role="alert">This link is invalid or has expired.</p>}
      </form>
    </section>
  );
}
