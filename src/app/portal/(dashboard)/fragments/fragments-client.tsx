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
      const map: Record<string, string> = { breath: '呼吸', sense: '五感', body: '身体', mind: '心念' }
      return map[String(v)] ?? String(v ?? '—')
    },
  },
  { key: 'durationMin', label: '时长', render: (v: unknown) => v ? `${v} 分钟` : '—' },
  { key: 'isPublished', label: '状态', render: statusBadge },
  { key: 'updatedAt', label: '更新时间', render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString('zh-CN') : '—' },
]

export default function FragmentsClient() {
  return (
    <CollectionTable
      slug="fragments"
      label="碎片知识"
      columns={columns}
      adminPath="/admin/collections/fragments"
    />
  )
}
