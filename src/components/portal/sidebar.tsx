'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FileText,
  Heart,
  Library,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/portal/overview', label: '概览', icon: LayoutDashboard },
  { href: '/portal/meditations', label: '冥想内容', icon: BookOpen },
  { href: '/portal/courses', label: '课程', icon: GraduationCap },
  { href: '/portal/fragments', label: '碎片知识', icon: FileText },
  { href: '/portal/scenarios', label: '关系情景', icon: Heart },
]

export default function PortalSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col bg-[oklch(0.10_0.04_265)] border-r border-[oklch(0.22_0.03_265)]">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[oklch(0.22_0.03_265)]">
        <div className="w-8 h-8 rounded-lg bg-[oklch(0.62_0.20_260)] flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_oklch(0.62_0.20_260/0.4)]">
          <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[oklch(0.94_0.01_265)] leading-tight">SelfCEO CMS</p>
          <p className="text-xs text-[oklch(0.45_0.02_265)] leading-tight truncate">内容管理</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="主导航">
        <p className="px-2 pb-2 text-xs font-medium text-[oklch(0.40_0.02_265)] uppercase tracking-wider">
          内容管理
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`
                group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-[oklch(0.20_0.06_265)] text-[oklch(0.94_0.01_265)]'
                  : 'text-[oklch(0.60_0.02_265)] hover:bg-[oklch(0.16_0.04_265)] hover:text-[oklch(0.85_0.01_265)]'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-[oklch(0.62_0.20_260)]' : 'text-[oklch(0.45_0.02_265)] group-hover:text-[oklch(0.65_0.02_265)]'}`}
                strokeWidth={1.5}
              />
              <span className="flex-1 truncate">{label}</span>
              {isActive && (
                <ChevronRight className="w-3 h-3 text-[oklch(0.62_0.20_260)] flex-shrink-0" strokeWidth={2} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-1 border-t border-[oklch(0.22_0.03_265)] pt-4">
        <Link
          href="/admin"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[oklch(0.50_0.02_265)] hover:bg-[oklch(0.16_0.04_265)] hover:text-[oklch(0.70_0.02_265)] transition-all"
        >
          <Library className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
          <span className="flex-1 truncate">Payload 管理台</span>
          <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-60" strokeWidth={1.5} />
        </Link>
      </div>
    </aside>
  )
}
