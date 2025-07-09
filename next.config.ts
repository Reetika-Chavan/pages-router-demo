import type { NextConfig } from 'next'

const nextConfig = {
  experimental: {
    isrMemoryCachePath: '/tmp/.next/cache/isr',
    isrStaticCachePath: '/tmp/.next/cache/static',
  },
} as any

export default nextConfig