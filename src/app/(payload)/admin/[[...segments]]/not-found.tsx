import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import type { SanitizedConfig } from 'payload'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const configPromise = import('@payload-config').then((m) => m.default as unknown as SanitizedConfig)

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config: configPromise, importMap, params, searchParams })

export default NotFound
