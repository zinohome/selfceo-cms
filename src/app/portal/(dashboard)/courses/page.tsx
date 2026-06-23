import type { Metadata } from 'next'
import CoursesClient from './courses-client'

export const metadata: Metadata = { title: '课程' }

export default function CoursesPage() {
  return <CoursesClient />
}
