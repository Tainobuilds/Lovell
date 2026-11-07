import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content (YAML in /content) is read at runtime by the contact form's server
  // action, so make sure it ships with the serverless functions.
  outputFileTracingIncludes: { "/*": ["./content/**/*"] },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
