import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: { root: path.resolve(__dirname) },
  // No on-demand image optimization: static thumbnails via a custom loader.
  images: { loader: "custom", loaderFile: "./src/lib/imageLoader.ts" },
  // Fully static site: no server functions. Redirects and headers live in public/_redirects and public/_headers.
  output: "export",
  // src/app/global-not-found.tsx becomes the static 404.html.
  experimental: { globalNotFound: true },
};

export default nextConfig;
