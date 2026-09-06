import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV === "development";
// Novo endereço para bundles locais já armazenados como immutable por versões antigas.
const developmentAssets = "/__webfolio_dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isDevelopment ? developmentAssets : undefined,
  async rewrites() {
    return isDevelopment
      ? [{ source: `${developmentAssets}/_next/:path*`, destination: "/_next/:path*" }]
      : [];
  },
  turbopack: {
    root: __dirname,
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["swiper", "react-icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
  },
  async headers() {
    return [
      ...(process.env.NODE_ENV !== "production"
        ? [{
            source: "/",
            headers: [
              { key: "Cache-Control", value: "no-store" },
            ],
          }]
        : []),
      {
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
      },
      {
        source: "/manifest.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      // O Next.js gerencia seus bundles: no-store em dev, hashes imutáveis em produção.
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
