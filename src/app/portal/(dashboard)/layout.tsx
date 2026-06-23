import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import PortalSidebar from '@/components/portal/sidebar'
import PortalHeader from '@/components/portal/header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')
  if (!token) {
    redirect('/portal/login')
  }

  return (
    <div className="flex h-screen bg-mesh overflow-hidden">
      <PortalSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <PortalHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
