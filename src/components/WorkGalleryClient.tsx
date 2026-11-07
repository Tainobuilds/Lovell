"use client";

import { useSearchParams } from "next/navigation";
import type { Project, Service } from "@/content/types";
import { WorkGallery } from "./WorkGallery";

export function WorkGalleryClient(props: { projects: Project[]; services: Service[] }) {
  const category = useSearchParams().get("category");
  return <WorkGallery {...props} category={category} />;
}
