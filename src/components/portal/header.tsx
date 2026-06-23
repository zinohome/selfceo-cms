'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, User, ChevronDown, Bell } from 'lucide-react'

export default function PortalHeader() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
    router.push('/portal/login')
    router.refresh()
  }

  return (
    <header className="flex items-center justify-between h-14 px-6 bg-[oklch(0.10_0.04_265/0.80)] backdrop-blur-sm border-b border-[oklch(0.22_0.03_265)] flex-shrink-0">
      {/* Left: breadcrumb area (filled per-page via portal context if needed) */}
      <div className="flex items-center gap-2" />

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Notification bell (decorative for now) */}
        <button
          aria-label="通知"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[oklch(0.45_0.02_265)] hover:bg-[oklch(0.20_0.03_265)] hover:text-[oklch(0.70_0.02_265)] transition-all"
        >
          <Bell className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* User menu */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={open}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[oklch(0.20_0.03_265)] transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-[oklch(0.62_0.20_260)] flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm text-[oklch(0.80_0.01_265)] hidden sm:block">管理员</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[oklch(0.45_0.02_265)] transition-transform ${open ? 'rotate-180' : ''}`}
              strokeWidth={1.5}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] shadow-[0_16px_48px_-8px_oklch(0_0_0/0.7)] py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[oklch(0.65_0.22_25)] hover:bg-[oklch(0.65_0.22_25/0.1)] transition-colors rounded-lg mx-1"
                style={{ width: 'calc(100% - 8px)' }}
              >
                <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                退出登录
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
