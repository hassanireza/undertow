import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ApiError } from "@/api/ApiError";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AuthService } from "@/services/AuthService";

import styles from "../PortalLogin/PortalLogin.module.css";

const authService = new AuthService();

type SubmitState = "idle" | "submitting" | "success" | "error";

function extractErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.body && typeof error.body === "object") {
    const body = error.body as Record<string, unknown>;
    const firstKey = Object.keys(body)[0];
    const firstValue = firstKey ? body[firstKey] : undefined;
    if (Array.isArray(firstValue) && typeof firstValue[0] === "string") {
      return firstValue[0];
    }
  }
  return "Something went wrong. Try again.";
}

export function PortalRegister(): ReactElement {
  usePageTitle("Create your account");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState("submitting");
    try {
      await authService.register(email, password);
      setState("success");
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <section className={`wrap ${styles.section}`}>
        <span className="eyebrow">Account requested</span>
        <h1 className={styles.heading}>Thanks. Your request is in.</h1>
        <p>
          We review new accounts before activating them. Once approved, you can sign in with the email
          and password you just set.
        </p>
      </section>
    );
  }

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Client portal</span>
      <h1 className={styles.heading}>Create your account.</h1>

      <form onSubmit={handleSubmit} className={styles.row}>
        <label>
          Email
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password, at least 10 characters
          <input
            required
            minLength={10}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Creating account." : "Create account"}
        </button>
        {state === "error" && <p role="alert">{errorMessage}</p>}
      </form>

      <p>
        Already have an account? <Link to="/portal/login">Sign in</Link>
      </p>
    </section>
  );
}
