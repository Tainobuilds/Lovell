"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

/** Pre-selects the service when arriving from a service page (?service=ooh). */
export function ContactFormWithParams() {
  return <ContactForm defaultService={useSearchParams().get("service") ?? ""} />;
}
