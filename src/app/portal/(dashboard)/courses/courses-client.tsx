'use client'

import CollectionTable from '@/components/portal/collection-table'

const statusBadge = (v: unknown) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${v ? 'bg-[oklch(0.72_0.18_145/0.15)] text-[oklch(0.72_0.18_145)] border border-[oklch(0.72_0.18_145/0.3)]' : 'bg-[oklch(0.25_0.04_265)] text-[oklch(0.55_0.02_265)]'}`}>
    {v ? '已发布' : '草稿'}
  </span>
)

const columns = [
  { key: 'title', label: '课程名称' },
  {
    key: 'category', label: '分类',
    render: (v: unknown) => {
      const map: Record<string, string> = { mindfulness: '正念', CBT: '认知行为疗法', ACT: '接受承诺疗法', 'CBT-I': '失眠CBT', MBCT: '正念认知疗法' }
      return map[String(v)] ?? String(v ?? '—')
    },
  },
  { key: 'durationDays', label: '天数', render: (v: unknown) => v ? `${v} 天` : '—' },
  {
    key: 'isPremium', label: '类型',
    render: (v: unknown) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${v ? 'bg-[oklch(0.82_0.18_85/0.15)] text-[oklch(0.78_0.16_85)] border border-[oklch(0.82_0.18_85/0.3)]' : 'bg-[oklch(0.25_0.04_265)] text-[oklch(0.55_0.02_265)]'}`}>
        {v ? '付费' : '免费'}
      </span>
    ),
  },
  { key: 'isPublished', label: '状态', render: statusBadge },
  { key: 'updatedAt', label: '更新时间', render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString('zh-CN') : '—' },
]

export default function CoursesClient() {
  return (
    <CollectionTable
      slug="courses"
      label="课程"
      columns={columns}
      adminPath="/admin/collections/courses"
    />
  )
}
