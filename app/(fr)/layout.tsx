import RootShell from '@/components/root-shell'
import { SITE_URL } from '@/lib/site'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL)
}

export default function FrLayout({ children }: { children: ReactNode }) {
  return <RootShell locale='fr'>{children}</RootShell>
}
