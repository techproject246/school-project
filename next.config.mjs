import withSerwist from "@serwist/next";

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      // Add CDN domains for user avatars as needed
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  /*
   * Empty turbopack config silences Next.js 16's warning about "webpack
   * config present with no turbopack config". Serwist injects webpack
   * loaders, which are irrelevant in dev (Serwist is disabled there),
   * but Next.js still complains unless turbopack is acknowledged.
   */
  turbopack: {},
};

/*
 * Serwist uses webpack under the hood and is incompatible with Turbopack.
 * Disable it in dev so Turbopack can run normally.
 * In production (`next build`), webpack is used and Serwist compiles the SW.
 */
export default withSerwist({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  injectionPoint: "self.__SW_MANIFEST",
  additionalPrecacheEntries: [{ url: "/offline", revision: "1" }],
  reloadOnOnline: false,
  disable: process.env.NODE_ENV !== "production",
})(nextConfig);
