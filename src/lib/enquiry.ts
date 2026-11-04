import { services } from "@/content/services";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  values?: Partial<Record<EnquiryField, string>>;
};

export type EnquiryField = "name" | "email" | "company" | "service" | "budget" | "timeline" | "message";

// TODO: confirm currency and bands with Lovell Media.
export const budgets = ["Under 10k", "10k – 25k", "25k – 50k", "50k – 100k", "100k+", "Not sure yet"];
export const timelines = ["ASAP", "Within 1 month", "1 – 3 months", "3 – 6 months", "Flexible"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Pure validation so it can be unit-tested and reused. */
export function validateEnquiry(form: FormData) {
  const get = (k: EnquiryField) => String(form.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    service: get("service"),
    budget: get("budget"),
    timeline: get("timeline"),
    message: get("message"),
  };
  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.service && !services.some((s) => s.slug === values.service) && values.service !== "other")
    errors.service = "Please choose a service.";
  if (values.message.length < 10) errors.message = "A sentence or two about the project helps us respond.";
  if (values.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
  for (const k of ["name", "email", "company"] as const) {
    if (values[k].length > 200) errors[k] = "That's a bit long.";
  }
  return { values, errors, ok: Object.keys(errors).length === 0 };
}
