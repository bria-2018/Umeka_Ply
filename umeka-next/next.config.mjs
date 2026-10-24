/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site builds to plain HTML/CSS/JS in /out and can be
  // hosted on any static host (Vercel, Netlify, Cloudflare Pages, cPanel, S3).
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Images are pre-optimised by `npm run images` (AVIF/WebP/JPEG at several
    // widths) and served through the <Picture> component, so the runtime
    // optimiser is not needed for a static export.
    unoptimized: true,
  },
};

export default nextConfig;
