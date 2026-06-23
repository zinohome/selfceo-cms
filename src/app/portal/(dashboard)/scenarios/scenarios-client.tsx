'use client'

import CollectionTable from '@/components/portal/collection-table'

const statusBadge = (v: unknown) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${v ? 'bg-[oklch(0.72_0.18_145/0.15)] text-[oklch(0.72_0.18_145)] border border-[oklch(0.72_0.18_145/0.3)]' : 'bg-[oklch(0.25_0.04_265)] text-[oklch(0.55_0.02_265)]'}`}>
    {v ? '已发布' : '草稿'}
  </span>
)

const columns = [
  { key: 'title', label: '情景标题' },
  {
    key: 'group', label: '关系类型',
    render: (v: unknown) => {
      const map: Record<string, string> = { partner: '伴侣', parents: '父母', colleague: '同事', friend: '朋友' }
      return map[String(v)] ?? String(v ?? '—')
    },
  },
  { key: 'isPublished', label: '状态', render: statusBadge },
  { key: 'sortOrder', label: '排序', render: (v: unknown) => v ?? '—' },
  { key: 'updatedAt', label: '更新时间', render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString('zh-CN') : '—' },
]

export default function ScenariosClient() {
  return (
    <CollectionTable
      slug="relationship-scenarios"
      label="关系情景"
      columns={columns}
      adminPath="/admin/collections/relationship-scenarios"
    />
  )
}
