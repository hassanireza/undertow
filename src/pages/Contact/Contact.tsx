import type { FormEvent, ReactElement } from "react";
import { useState } from "react";

import { InquiryPayload, InquiryService } from "@/services/InquiryService";

import styles from "./Contact.module.css";

const inquiryService = new InquiryService();

type SubmitState = "idle" | "submitting" | "success" | "error";

export function Contact(): ReactElement {
  const [form, setForm] = useState<InquiryPayload>({
    name: "",
    email: "",
    projectType: "",
    budgetRange: "",
    message: "",
  });
  const [state, setState] = useState<SubmitState>("idle");

  function updateField<K extends keyof InquiryPayload>(field: K, value: InquiryPayload[K]): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState("submitting");
    try {
      await inquiryService.submit(form);
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <section className={`wrap ${styles.section}`}>
        <p className={styles.success}>Thanks. Your message is through, I&rsquo;ll reply by email.</p>
      </section>
    );
  }

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Start a project</span>
      <h1 className={styles.heading}>Tell me what you're building.</h1>

      <form onSubmit={handleSubmit} aria-label="Contact form" className={styles.row}>
        <div className={styles.row}>
          <label>
            Name
            <input required value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </label>
        </div>

        <div className={`${styles.row} ${styles.rowSplit}`}>
          <label>
            Project type
            <input
              value={form.projectType}
              onChange={(e) => updateField("projectType", e.target.value)}
            />
          </label>
          <label>
            Budget range
            <input
              value={form.budgetRange}
              onChange={(e) => updateField("budgetRange", e.target.value)}
            />
          </label>
        </div>

        <label>
          Message
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
          />
        </label>

        <button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Send"}
        </button>
        {state === "error" && <p role="alert">Something went wrong. Try again.</p>}
      </form>
    </section>
  );
}
