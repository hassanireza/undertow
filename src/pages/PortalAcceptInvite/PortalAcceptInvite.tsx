import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ApiError } from "@/api/ApiError";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AuthService } from "@/services/AuthService";

import styles from "../PortalLogin/PortalLogin.module.css";

const authService = new AuthService();

type SubmitState = "idle" | "submitting" | "error";

function extractErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.body && typeof error.body === "object") {
    const body = error.body as Record<string, unknown>;
    const firstKey = Object.keys(body)[0];
    const firstValue = firstKey ? body[firstKey] : undefined;
    if (Array.isArray(firstValue) && typeof firstValue[0] === "string") {
      return firstValue[0];
    }
    if (typeof firstValue === "string") {
      return firstValue;
    }
  }
  return "Something went wrong. Try again.";
}

export function PortalAcceptInvite(): ReactElement {
  usePageTitle("Set your password");
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!token) return;
    setState("submitting");
    try {
      await authService.acceptInvite(token, password);
      navigate("/portal");
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
      setState("error");
    }
  }

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Welcome</span>
      <h1 className={styles.heading}>Set your password.</h1>

      <form onSubmit={handleSubmit} className={styles.row}>
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
          {state === "submitting" ? "Setting up." : "Set password and sign in"}
        </button>
        {state === "error" && <p role="alert">{errorMessage}</p>}
      </form>
    </section>
  );
}
