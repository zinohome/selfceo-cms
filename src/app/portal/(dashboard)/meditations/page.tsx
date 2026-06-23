import type { Metadata } from 'next'
import MeditationsClient from './meditations-client'

export const metadata: Metadata = { title: '冥想内容' }

export default function MeditationsPage() {
  return <MeditationsClient />
}
