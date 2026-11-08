"use server";

import { getServices, getSettings } from "@/lib/content";
import { extraServices, validateEnquiry, type EnquiryState } from "@/lib/enquiry";

/**
 * Handles the enquiry form. Delivery is configured with env vars (see .env.example):
 *  - RESEND_API_KEY (+ CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL): sends an email via Resend.
 *  - CONTACT_WEBHOOK_URL: POSTs the enquiry as JSON (Zapier, Make, Slack, a CRM…).
 * Both can be set. With neither set, enquiries are logged in development
 * and the form reports an error in production so nothing is silently lost.
 */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Honeypot: real users never fill this hidden field.
  if (String(form.get("website") ?? "")) return { status: "success" };

  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const { values, errors, ok } = validateEnquiry(form, services.map((s) => s.slug));
  if (!ok) return { status: "error", errors, values, message: "Please check the highlighted fields." };

  const serviceName = values.service === "other" ? "Other" : [...services, ...extraServices].find((s) => s.slug === values.service)?.name ?? "Not specified";
  const enquiry = { ...values, serviceName, submittedAt: new Date().toISOString() };

  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  try {
    if (!resendKey && !webhook) {
      if (process.env.NODE_ENV === "production") {
        console.error("[enquiry] No delivery configured (RESEND_API_KEY or CONTACT_WEBHOOK_URL).");
        return {
          status: "error",
          values,
          message: `Our form is temporarily unavailable. Please email us at ${settings.email}.`,
        };
      }
      console.info("[enquiry] (dev, not delivered)", enquiry);
    }

    const jobs: Promise<Response>[] = [];
    if (resendKey) {
      jobs.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            // Resend's shared test sender works without verifying a domain, but only
            // delivers to the email address the Resend account was created with.
            from: process.env.CONTACT_FROM_EMAIL || "Lovell Media Website <onboarding@resend.dev>",
            to: (process.env.CONTACT_TO_EMAIL || settings.enquiriesTo).split(",").map((s) => s.trim()),
            reply_to: values.email,
            subject: `New enquiry: ${serviceName} (${values.name})`,
            text: [
              `Name: ${values.name}`,
              `Email: ${values.email}`,
              `Company: ${values.company || "-"}`,
              `Service: ${serviceName}`,
              `Budget: ${values.budget || "-"}`,
              `Timeline: ${values.timeline || "-"}`,
              `Heard about us: ${values.source || "-"}`,
              "",
              values.message,
            ].join("\n"),
          }),
        }),
      );
    }
    if (webhook) {
      jobs.push(
        fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enquiry),
        }),
      );
    }

    const results = await Promise.all(jobs);
    const failed = results.find((r) => !r.ok);
    if (failed) throw new Error(`Delivery failed with HTTP ${failed.status}`);

    return { status: "success", message: "Thank you. We'll be in touch shortly." };
  } catch (err) {
    console.error("[enquiry] delivery error", err);
    return {
      status: "error",
      values,
      message: `Something went wrong sending your message. Please try again or email ${settings.email}.`,
    };
  }
}
