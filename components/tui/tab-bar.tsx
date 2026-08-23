'use client'

import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/i18n'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabBar({
  locale,
  labels
}: {
  locale: Locale
  labels: Dictionary['header']
}) {
  const pathname = usePathname()
  const prefix = locale === 'fr' ? '/fr' : ''

  const tabs = [
    { index: 1, label: labels.skills, path: '/skills' },
    { index: 2, label: labels.projects, path: '/projects' },
    { index: 3, label: labels.contact, path: '/contact' }
  ]

  const isActive = (path: string) => pathname.startsWith(`${prefix}${path}`)

  return (
    <ul className='hidden items-stretch gap-1 text-sm md:flex'>
      {tabs.map(tab => (
        <li key={tab.path}>
          <Link
            href={`${prefix}${tab.path}`}
            className={`block border border-transparent px-3 py-1 transition-colors ${
              isActive(tab.path)
                ? 'border-border bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:border-border hover:text-foreground'
            }`}
          >
            <span className='select-none text-brand'>{tab.index}: </span>
            {tab.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
