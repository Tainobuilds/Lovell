"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { services } from "@/content/services";
import { budgets, timelines, type EnquiryField, type EnquiryState } from "@/lib/enquiry";

const initial: EnquiryState = { status: "idle" };

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="border border-line p-10 md:p-14">
        <span className="block h-3 w-3 bg-red" />
        <p className="display mt-6 text-5xl md:text-6xl">Message received.</p>
        <p className="mt-4 max-w-md text-mute">{state.message ?? "Thank you. We'll be in touch shortly."}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = (k: EnquiryField) => state.errors?.[k];
  // Remount fields after a failed submit so defaultValue reflects what was typed.
  const formKey = JSON.stringify(v);

  return (
    <form action={action} noValidate className="grid gap-x-10 gap-y-8 md:grid-cols-2" key={formKey}>
      <Field label="Name" name="name" error={err("name")}>
        <input id="name" name="name" autoComplete="name" required defaultValue={v.name} className="field" aria-invalid={!!err("name")} aria-describedby={err("name") ? "name-err" : undefined} />
      </Field>
      <Field label="Email" name="email" error={err("email")}>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} className="field" aria-invalid={!!err("email")} aria-describedby={err("email") ? "email-err" : undefined} />
      </Field>
      <Field label="Company / Brand" name="company" optional error={err("company")}>
        <input id="company" name="company" autoComplete="organization" defaultValue={v.company} className="field" />
      </Field>
      <Field label="Service" name="service" error={err("service")}>
        <select id="service" name="service" defaultValue={v.service ?? defaultService} className="field appearance-none">
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
          <option value="other">Something else</option>
        </select>
      </Field>
      <Field label="Budget" name="budget" optional>
        <select id="budget" name="budget" defaultValue={v.budget ?? ""} className="field appearance-none">
          <option value="">Select a range</option>
          {budgets.map((b) => <option key={b}>{b}</option>)}
        </select>
      </Field>
      <Field label="Timeline" name="timeline" optional>
        <select id="timeline" name="timeline" defaultValue={v.timeline ?? ""} className="field appearance-none">
          <option value="">Select a timeline</option>
          {timelines.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Tell us about the project" name="message" error={err("message")} className="md:col-span-2">
        <textarea id="message" name="message" rows={5} required defaultValue={v.message} className="field resize-y" aria-invalid={!!err("message")} aria-describedby={err("message") ? "message-err" : undefined} />
      </Field>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p role="alert" aria-live="polite" className="text-sm text-red-bright empty:hidden">
            {state.status === "error" ? state.message : ""}
          </p>
          <p className="text-sm text-faint">
            We only use your details to reply.{" "}
            <Link href="/privacy" className="link-u text-mute hover:text-paper">Privacy policy</Link>
          </p>
        </div>
        <button type="submit" disabled={pending} className="btn btn-red justify-center disabled:opacity-60">
          {pending ? "Sending…" : "Send enquiry"} <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  optional,
  error,
  className = "",
  children,
}: {
  label: string;
  name: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="eyebrow flex justify-between text-faint">
        {label}
        {optional && <span className="normal-case tracking-normal">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-err`} className="mt-2 text-sm text-red-bright">
          {error}
        </p>
      )}
    </div>
  );
}
