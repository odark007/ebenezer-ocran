// next.config.ts (FULL & FIXED)

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true, // Keep your existing configuration

  // Add the images configuration for Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // --- FIX: Add your specific Supabase Hostname here ---
        // (This matches 'https://nfmjsihhsdygbtfotigj.supabase.co')
        hostname: 'nfmjsihhsdygbtfotigj.supabase.co',
        // ----------------------------------------------------
        port: '',
        // Allow all paths under this storage domain
        pathname: '/storage/v1/object/public/**', 
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;