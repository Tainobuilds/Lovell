
export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  values?: Partial<Record<EnquiryField, string>>;
};

export type EnquiryField = "name" | "email" | "company" | "service" | "location" | "budget" | "timeline" | "source" | "message";

// TODO: confirm bands with Lovell Media.
export const budgets = ["Under £5k", "£5k – £10k", "£10k – £25k", "£25k – £50k", "£50k+", "Not sure yet"];
/** "How did you hear about us?" Shows which channels bring enquiries. */
export const sources = [
  "Recommendation",
  "I know Lovell Media's work",
  "Instagram",
  "LinkedIn",
  "TikTok",
  "YouTube or Vimeo",
  "Google search",
  "Event or screening",
  "Other",
];
/** Enquiry categories on the form that aren't service pages. */
export const extraServices = [
  { slug: "global", name: "Global / Multilocation Production" },
  { slug: "general", name: "General Enquiry" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Pure validation so it can be unit-tested and reused. */
export function validateEnquiry(form: FormData, serviceSlugs: string[]) {
  const get = (k: EnquiryField) => String(form.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    service: get("service"),
    budget: get("budget"),
    location: get("location"),
    timeline: get("timeline"),
    source: get("source"),
    message: get("message"),
  };
  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.service && !serviceSlugs.includes(values.service) && !extraServices.some((x) => x.slug === values.service) && values.service !== "other")
    errors.service = "Please choose a service.";
  if (values.message.length < 10) errors.message = "A sentence or two about the project helps us respond.";
  if (values.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
  for (const k of ["name", "email", "company", "location", "budget", "timeline", "source"] as const) {
    if (values[k].length > 200) errors[k] = "That's a bit long.";
  }
  return { values, errors, ok: Object.keys(errors).length === 0 };
}
