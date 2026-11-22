import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content (YAML in /content) is read at runtime by the contact form's server
  // action, so make sure it ships with the serverless functions.
  outputFileTracingIncludes: { "/*": ["./content/**/*"] },
  // Old URLs from earlier drafts.
  async redirects() {
    return [
      { source: "/studio", destination: "/about", permanent: true },
      { source: "/services/ooh", destination: "/services/ooh-experiential", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
