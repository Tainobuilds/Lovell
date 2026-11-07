import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";
import { editorEnabled } from "@/lib/editor";

export const metadata: Metadata = { title: "Content editor", robots: { index: false, follow: false } };

export default function KeystaticLayout() {
  if (!editorEnabled()) notFound();
  return <KeystaticApp />;
}
