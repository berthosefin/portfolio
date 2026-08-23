'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { index: 1, name: 'skills', path: '/skills' },
  { index: 2, name: 'projects', path: '/projects' },
  { index: 3, name: 'contact', path: '/contact' }
]

export default function TabBar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <ul className='hidden items-stretch gap-1 text-sm md:flex'>
      {tabs.map(tab => (
        <li key={tab.name}>
          <Link
            href={tab.path}
            className={`block border border-transparent px-3 py-1 transition-colors ${
              isActive(tab.path)
                ? 'border-border bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:border-border hover:text-foreground'
            }`}
          >
            <span className='select-none text-brand'>{tab.index}: </span>
            {tab.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
