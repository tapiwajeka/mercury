/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project (a stray parent lockfile exists).
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Serve images directly (matches the original site) and avoids requiring
    // the native `sharp` optimizer in this environment.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gmhrlmpzdcrmentpdmbe.supabase.co",
      },
    ],
  },
};

export default nextConfig;
