import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.66.41', '192.168.66.41:3901'],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
