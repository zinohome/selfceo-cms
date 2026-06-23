import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function PortalRoot() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')
  if (token) {
    redirect('/portal/overview')
  } else {
    redirect('/portal/login')
  }
}
