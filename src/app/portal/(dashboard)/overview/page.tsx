import { cookies, headers } from 'next/headers'
import { BookOpen, GraduationCap, FileText, Heart, TrendingUp, Database, Activity } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '概览' }

const collections = [
  { slug: 'meditations', label: '冥想内容', icon: BookOpen, color: 'oklch(0.62_0.20_260)', href: '/portal/meditations' },
  { slug: 'courses', label: '课程', icon: GraduationCap, color: 'oklch(0.72_0.18_145)', href: '/portal/courses' },
  { slug: 'fragments', label: '碎片知识', icon: FileText, color: 'oklch(0.82_0.18_85)', href: '/portal/fragments' },
  { slug: 'relationship-scenarios', label: '关系情景', icon: Heart, color: 'oklch(0.65_0.22_25)', href: '/portal/scenarios' },
]

async function fetchCount(slug: string, token: string): Promise<number> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/${slug}?limit=1&depth=0`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    })
    if (!res.ok) return 0
    const data = await res.json()
    return data.totalDocs ?? 0
  } catch {
    return 0
  }
}

export default async function OverviewPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value ?? ''

  const counts = await Promise.all(collections.map(c => fetchCount(c.slug, token)))

  const stats = collections.map((c, i) => ({ ...c, count: counts[i] }))
  const total = counts.reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-[oklch(0.94_0.01_265)] tracking-tight">内容概览</h1>
        <p className="text-sm text-[oklch(0.55_0.02_265)] mt-1">SelfCEO 平台内容数据汇总</p>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, oklch(0.62 0.20 260 / 0.25) 0%, transparent 60%)',
          }}
        />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[oklch(0.62_0.20_260/0.15)] border border-[oklch(0.62_0.20_260/0.3)] flex items-center justify-center">
            <Database className="w-7 h-7 text-[oklch(0.62_0.20_260)]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm text-[oklch(0.55_0.02_265)]">内容总量</p>
            <p className="text-4xl font-bold text-[oklch(0.94_0.01_265)] tabular-nums leading-tight">{total}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-sm text-[oklch(0.72_0.18_145)]">
            <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
            <span>全部 {collections.length} 个集合</span>
          </div>
        </div>
      </div>

      {/* Collection stat cards */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ href, label, icon: Icon, color, count }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] p-5 hover:border-[oklch(0.35_0.04_265)] hover:bg-[oklch(0.20_0.04_265)] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color.replace('_', ' ').replace('_', ' ').replace('_', ' ')}/0.12`, border: `1px solid ${color.replace('_', ' ').replace('_', ' ').replace('_', ' ')}/0.25` }}
              >
                <Icon
                  className="w-5 h-5"
                  strokeWidth={1.5}
                  style={{ color: color.replace(/_/g, ' ') }}
                />
              </div>
              <Activity className="w-4 h-4 text-[oklch(0.35_0.02_265)] group-hover:text-[oklch(0.55_0.02_265)] transition-colors" strokeWidth={1.5} />
            </div>
            <p className="text-3xl font-bold text-[oklch(0.94_0.01_265)] tabular-nums leading-none mb-1">
              {count}
            </p>
            <p className="text-sm text-[oklch(0.55_0.02_265)]">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-sm font-medium text-[oklch(0.55_0.02_265)] mb-3 uppercase tracking-wider">快捷操作</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] hover:border-[oklch(0.35_0.04_265)] hover:bg-[oklch(0.20_0.04_265)] transition-all text-sm text-[oklch(0.80_0.01_265)] hover:text-[oklch(0.94_0.01_265)]"
            >
              <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} style={{ color: color.replace(/_/g, ' ') }} />
              管理 {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
