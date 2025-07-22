import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  
  basePath: process.env.NODE_ENV === 'production' ? '/yoga-transformation' : '',
  
  assetPrefix: process.env.NODE_ENV === 'production' ? '/yoga-transformation' : '',
  
  trailingSlash: true,
  
  // Игнорируем ESLint ошибки при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Игнорируем TypeScript ошибки при сборке (если есть)
  typescript: {
    ignoreBuildErrors: true,
  },
 
  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Optimize bundle
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;