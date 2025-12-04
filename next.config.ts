import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_HF_TOKEN: process.env.NEXT_PUBLIC_HF_TOKEN || "",
  },
};

export default nextConfig;
