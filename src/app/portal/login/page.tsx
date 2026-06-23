'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    startTransition(async () => {
      try {
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          setError(data?.errors?.[0]?.message || '邮箱或密码错误')
          return
        }
        router.push('/portal/overview')
        router.refresh()
      } catch {
        setError('网络错误，请稍后重试')
      }
    })
  }

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[oklch(0.22_0.09_300/0.15)] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[oklch(0.20_0.08_260/0.15)] blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[oklch(0.62_0.20_260)] flex items-center justify-center mb-4 shadow-[0_8px_32px_oklch(0.62_0.20_260/0.4)]">
            <Sparkles className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-semibold text-[oklch(0.94_0.01_265)] tracking-tight">
            SelfCEO CMS
          </h1>
          <p className="text-sm text-[oklch(0.62_0.02_265)] mt-1">内容管理控制台</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-[oklch(0.17_0.03_265)] border border-[oklch(0.28_0.04_265)] shadow-[0_24px_80px_-12px_oklch(0_0_0/0.6)] overflow-hidden">
          {/* Card header accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.20_260)] to-transparent opacity-60" />

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-lg font-semibold text-[oklch(0.94_0.01_265)]">欢迎回来</h2>
              <p className="text-sm text-[oklch(0.62_0.02_265)]">请登录以继续</p>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[oklch(0.80_0.01_265)]">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.02_265)]" strokeWidth={1.5} />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[oklch(0.21_0.03_265)] border border-[oklch(0.28_0.04_265)] text-[oklch(0.94_0.01_265)] placeholder-[oklch(0.40_0.02_265)] text-sm
                    focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.20_260)] focus:border-transparent
                    hover:border-[oklch(0.35_0.04_265)] transition-colors"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[oklch(0.80_0.01_265)]">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.02_265)]" strokeWidth={1.5} />
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-lg bg-[oklch(0.21_0.03_265)] border border-[oklch(0.28_0.04_265)] text-[oklch(0.94_0.01_265)] placeholder-[oklch(0.40_0.02_265)] text-sm
                    focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.20_260)] focus:border-transparent
                    hover:border-[oklch(0.35_0.04_265)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? '隐藏密码' : '显示密码'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.45_0.02_265)] hover:text-[oklch(0.65_0.02_265)] transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div role="alert" className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-[oklch(0.65_0.22_25/0.12)] border border-[oklch(0.65_0.22_25/0.35)] text-sm text-[oklch(0.75_0.15_25)]">
                <span className="flex-shrink-0 mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm
                bg-[oklch(0.62_0.20_260)] text-white
                hover:bg-[oklch(0.68_0.22_260)]
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.20_260)] focus:ring-offset-2 focus:ring-offset-[oklch(0.17_0.03_265)]
                transition-all shadow-[0_4px_20px_oklch(0.62_0.20_260/0.35)]
                hover:shadow-[0_4px_28px_oklch(0.62_0.20_260/0.55)]
                active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  登录中…
                </>
              ) : (
                '登 录'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[oklch(0.35_0.02_265)] mt-6">
          SelfCEO 内容管理系统 · 仅限授权用户
        </p>
      </div>
    </div>
  )
}
