'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, RefreshCw, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from 'lucide-react'

type Column = {
  key: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: unknown, row: Record<string, unknown>) => any
}

type Props = {
  slug: string
  label: string
  columns: Column[]
  adminPath: string
}

function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' }) {
  const styles = {
    default: 'bg-[oklch(0.25_0.04_265)] text-[oklch(0.75_0.02_265)]',
    success: 'bg-[oklch(0.72_0.18_145/0.15)] text-[oklch(0.72_0.18_145)] border border-[oklch(0.72_0.18_145/0.3)]',
    warning: 'bg-[oklch(0.82_0.18_85/0.15)] text-[oklch(0.78_0.16_85)] border border-[oklch(0.82_0.18_85/0.3)]',
    danger: 'bg-[oklch(0.65_0.22_25/0.15)] text-[oklch(0.65_0.22_25)] border border-[oklch(0.65_0.22_25/0.3)]',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatCell(value: unknown): any {
  if (value === null || value === undefined) return <span className="text-[oklch(0.35_0.02_265)]">—</span>
  if (typeof value === 'boolean') return <Badge variant={value ? 'success' : 'default'}>{value ? '是' : '否'}</Badge>
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>
    return obj.title ?? obj.name ?? obj.email ?? obj.id ?? JSON.stringify(value).slice(0, 40)
  }
  const str = String(value)
  if (str.length > 60) return <span title={str}>{str.slice(0, 60)}…</span>
  return str
}

export default function CollectionTable({ slug, label, columns, adminPath }: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const limit = 15

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        depth: '1',
      })
      if (query) params.set('where[or][0][title][like]', query)
      const res = await fetch(`/api/${slug}?${params}`, { credentials: 'include' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setRows(data.docs ?? [])
      setTotal(data.totalDocs ?? 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败')
    } finally {
      setLoading(false)
    }
  }, [slug, page, query])

  useEffect(() => {
    setPage(1)
  }, [query])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[oklch(0.94_0.01_265)] tracking-tight">{label}</h1>
          <p className="text-sm text-[oklch(0.55_0.02_265)] mt-0.5">
            共 <span className="text-[oklch(0.80_0.01_265)] font-medium tabular-nums">{total}</span> 条记录
          </p>
        </div>
        <a
          href={`/admin/collections/${slug}`}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[oklch(0.62_0.20_260)] text-white text-sm font-medium hover:bg-[oklch(0.68_0.22_260)] transition-colors shadow-[0_2px_12px_oklch(0.62_0.20_260/0.3)]"
        >
          在 Payload 中编辑
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
        </a>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.02_265)]" strokeWidth={1.5} />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={`搜索${label}…`}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] text-[oklch(0.94_0.01_265)] placeholder-[oklch(0.40_0.02_265)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.20_260)] focus:border-transparent hover:border-[oklch(0.35_0.04_265)] transition-colors"
          />
        </div>
        <button
          onClick={fetchData}
          aria-label="刷新"
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] text-[oklch(0.55_0.02_265)] hover:bg-[oklch(0.22_0.03_265)] hover:text-[oklch(0.80_0.01_265)] transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} strokeWidth={1.5} />
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] overflow-hidden">
        {loading && rows.length === 0 ? (
          <div className="flex items-center justify-center py-20 gap-3 text-[oklch(0.55_0.02_265)]">
            <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
            <span className="text-sm">加载中…</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-sm text-[oklch(0.65_0.22_25)]">加载失败：{error}</p>
            <button
              onClick={fetchData}
              className="text-sm text-[oklch(0.62_0.20_260)] hover:underline"
            >
              重试
            </button>
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-[oklch(0.55_0.02_265)] text-sm">暂无数据</p>
            <p className="text-[oklch(0.40_0.02_265)] text-xs">尚未创建任何{label}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label={`${label}列表`}>
              <thead>
                <tr className="border-b border-[oklch(0.22_0.03_265)]">
                  {columns.map(col => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left text-xs font-semibold text-[oklch(0.50_0.02_265)] uppercase tracking-wider"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[oklch(0.20_0.03_265)]">
                {rows.map((row, idx) => (
                  <tr
                    key={String(row.id ?? idx)}
                    className="hover:bg-[oklch(0.20_0.03_265/0.6)] transition-colors"
                  >
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 text-[oklch(0.80_0.01_265)]">
                        {col.render
                          ? col.render(row[col.key], row)
                          : formatCell(row[col.key])}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <a
                        href={`${adminPath}/${row.id}`}
                        target="_blank"
                        rel="noopener"
                        aria-label="在 Payload 中编辑此记录"
                        className="text-[oklch(0.40_0.02_265)] hover:text-[oklch(0.62_0.20_260)] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-[oklch(0.55_0.02_265)]">
          <span>
            第 {(page - 1) * limit + 1}–{Math.min(page * limit, total)} 条，共 {total} 条
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[oklch(0.22_0.03_265)] transition-all"
              aria-label="上一页"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.min(Math.max(page - 2, 1) + i, totalPages)
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                    p === page
                      ? 'bg-[oklch(0.62_0.20_260)] text-white'
                      : 'bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] text-[oklch(0.55_0.02_265)] hover:bg-[oklch(0.22_0.03_265)] hover:text-[oklch(0.80_0.01_265)]'
                  }`}
                  aria-label={`第 ${p} 页`}
                  aria-current={p === page ? 'page' : undefined}
                >
                  {p}
                </button>
              )
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[oklch(0.22_0.03_265)] transition-all"
              aria-label="下一页"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
