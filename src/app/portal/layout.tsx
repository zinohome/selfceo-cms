import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'SelfCEO CMS',
    template: '%s · SelfCEO CMS',
  },
  description: 'SelfCEO 内容管理系统',
}

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="portal-root min-h-screen bg-[oklch(0.12_0.03_265)] text-[oklch(0.94_0.01_265)]">
        {children}
      </body>
    </html>
  )
}
