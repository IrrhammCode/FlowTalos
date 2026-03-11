/**
 * FlowTalos — Next.js Configuration
 * ====================================
 * Runtime and build configuration for the FlowTalos web dashboard.
 *
 * Key Settings:
 *   - reactCompiler: Enables the React Compiler (React 19+) for automatic
 *     memoisation and render optimisation without manual React.memo() calls.
 *
 * @module next.config
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Enable React Compiler for automatic render optimisation. */
  reactCompiler: true,

  /** Allow CoinGecko and IPFS gateway images in next/image (if used). */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.coingecko.com" },
      { protocol: "https", hostname: "**.w3s.link" },
      { protocol: "https", hostname: "**.ipfs.io" },
    ],
  },
};

export default nextConfig;
