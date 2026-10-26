"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { studio } from "@/lib/studio";

type Fields = {
  name: string;
  email: string;
  need: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", need: "", message: "" };

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid email.";
  }
  if (!fields.need) errors.need = "Choose what you need.";
  if (fields.message.trim().length < 12) {
    errors.message = "Add a few lines about the site.";
  }
  return errors;
}

function mailHref(fields: Fields) {
  const body = `Name: ${fields.name}\nEmail: ${fields.email}\nNeed: ${fields.need}\n\n${fields.message}`;
  return `mailto:${studio.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(body)}`;
}

const fieldClass =
  "mt-1 w-full border-0 border-b border-ink bg-transparent px-0 py-2.5 text-lg text-ink";

export function EnquiryForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Fields | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSending(true);
    window.setTimeout(() => {
      if (!mounted.current) return;
      setSent(fields);
      setSending(false);
    }, 500);
  }

  if (sent) {
    return (
      <div className="enquiry-in max-w-[40ch]" role="status">
        <h2 className="text-3xl tracking-tight">Note ready to send.</h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          This page does not deliver mail yet. Email the same note to the studio.
        </p>
        <a className="btn mt-8" href={mailHref(sent)}>
          Email the studio
        </a>
      </div>
    );
  }

  return (
    <form className="enquiry-in grid gap-5 lg:pt-2" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={fields.name}
          disabled={sending}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={(event) => update("name", event.target.value)}
          className={`${fieldClass} border-ink`}
        />
        {errors.name ? (
          <p id="name-error" className="mt-2 text-sm">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          disabled={sending}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : "email-help"}
          onChange={(event) => update("email", event.target.value)}
          className={`${fieldClass} border-ink`}
        />
        <p id="email-help" className="mt-2 text-sm text-muted">
          Replies go to this address.
        </p>
        {errors.email ? (
          <p id="email-error" className="mt-2 text-sm">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="need" className="text-sm">
          What you need
        </label>
        <select
          id="need"
          name="need"
          value={fields.need}
          disabled={sending}
          aria-invalid={Boolean(errors.need)}
          aria-describedby={errors.need ? "need-error" : undefined}
          onChange={(event) => update("need", event.target.value)}
          className={`${fieldClass} border-ink`}
        >
          <option value="">Choose one</option>
          <option>House</option>
          <option>Interior</option>
          <option>Workplace</option>
          <option>Not sure yet</option>
        </select>
        {errors.need ? (
          <p id="need-error" className="mt-2 text-sm">
            {errors.need}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="message" className="text-sm">
          About the site
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={fields.message}
          disabled={sending}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          onChange={(event) => update("message", event.target.value)}
          className={`${fieldClass} border-ink`}
        />
        <p id="message-help" className="mt-2 text-sm text-muted">
          Plot, rooms, and timing are enough.
        </p>
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div>
        <button className="btn" type="submit" disabled={sending} aria-busy={sending}>
          {sending ? "Sending" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
