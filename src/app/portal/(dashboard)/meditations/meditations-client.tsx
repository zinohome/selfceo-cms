'use client'

import CollectionTable from '@/components/portal/collection-table'

const statusBadge = (v: unknown) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${v ? 'bg-[oklch(0.72_0.18_145/0.15)] text-[oklch(0.72_0.18_145)] border border-[oklch(0.72_0.18_145/0.3)]' : 'bg-[oklch(0.25_0.04_265)] text-[oklch(0.55_0.02_265)]'}`}>
    {v ? '已发布' : '草稿'}
  </span>
)

const columns = [
  { key: 'title', label: '标题' },
  {
    key: 'category', label: '分类',
    render: (v: unknown) => {
      const map: Record<string, string> = { focus: '专注', stress: '减压', sleep: '睡眠', breathing: '呼吸', body_scan: '身体扫描' }
      return map[String(v)] ?? String(v ?? '—')
    },
  },
  { key: 'durationMin', label: '时长(分)', render: (v: unknown) => v ? `${v} min` : '—' },
  { key: 'isPublished', label: '状态', render: statusBadge },
  { key: 'updatedAt', label: '更新时间', render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString('zh-CN') : '—' },
]

export default function MeditationsClient() {
  return (
    <CollectionTable
      slug="meditations"
      label="冥想内容"
      columns={columns}
      adminPath="/admin/collections/meditations"
    />
  )
}
