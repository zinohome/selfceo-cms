import type { Metadata } from 'next'
import ScenariosClient from './scenarios-client'

export const metadata: Metadata = { title: '关系情景' }

export default function ScenariosPage() {
  return <ScenariosClient />
}
