'use client'

import TabBar from '@/components/tui/tab-bar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/i18n'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'
import LocaleSwitcher from './locale-switcher'
import { Button } from './ui/button'

const navItems = [
  { key: 'home', path: '/', slug: '' },
  { key: 'skills', path: '/skills', slug: 'skills' },
  { key: 'projects', path: '/projects', slug: 'projects' },
  { key: 'contact', path: '/contact', slug: 'contact' }
] as const

export default function Header({
  locale,
  labels
}: {
  locale: Locale
  labels: Dictionary['header']
}) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const prefix = locale === 'fr' ? '/fr' : ''

  const isNavLinkActive = (path: string) => {
    if (path === '/') {
      return pathname === prefix
    }
    return pathname.startsWith(`${prefix}${path}`)
  }

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm'>
      <nav className='container flex h-14 max-w-4xl items-center justify-between gap-4'>
        <Link
          href={`${prefix}/`}
          className='shrink-0 text-sm font-bold text-foreground transition-colors hover:text-brand'
        >
          <span className='text-brand'>~</span>/thos
        </Link>

        {/* Desktop: nav-as-tabs */}
        <div className='hidden md:block'>
          <TabBar locale={locale} labels={labels} />
        </div>

        <div className='flex items-center gap-2'>
          <LocaleSwitcher />
          <ThemeToggle />

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button size='sm' variant='ghost' className='md:hidden'>
                <Menu className='size-4' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <div className='mb-8 text-sm font-bold'>
                <span className='text-brand'>~</span>/thos
              </div>
              <ul className='flex flex-col gap-1 text-sm'>
                {navItems.map(item => (
                  <li key={item.key}>
                    <Link
                      href={`${prefix}${item.path}`}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 transition-colors ${
                        isNavLinkActive(item.path)
                          ? 'border-border bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      <span className='select-none text-brand'>$ </span>
                      cd ~/{item.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
