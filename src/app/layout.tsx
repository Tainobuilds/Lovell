import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Anton, Inter, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Every Frame Has a Story`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Every Frame Has a Story`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

/** Root shell: fonts, global styles, analytics. Site chrome lives in (site)/layout.tsx. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${instrument.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        {/* Cookie-free, anonymous page-view analytics. Active on Vercel once
            Analytics is enabled for the project; a no-op elsewhere. */}
        <Analytics />
      </body>
    </html>
  );
}
