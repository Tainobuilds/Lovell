"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

/** Pre-selects the service when arriving from a service page (?service=ooh). */
export function ContactFormWithParams({ services }: { services: { slug: string; name: string }[] }) {
  return <ContactForm services={services} defaultService={useSearchParams().get("service") ?? ""} />;
}
