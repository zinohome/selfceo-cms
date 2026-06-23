import type { Metadata } from 'next'
import FragmentsClient from './fragments-client'

export const metadata: Metadata = { title: '碎片知识' }

export default function FragmentsPage() {
  return <FragmentsClient />
}
