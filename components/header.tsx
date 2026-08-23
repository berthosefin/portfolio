'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import TabBar from '@/components/tui/tab-bar'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

const links = [
  { name: 'home', path: '/' },
  { name: 'skills', path: '/skills' },
  { name: 'projects', path: '/projects' },
  { name: 'contact', path: '/contact' }
]

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isNavLinkActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm'>
      <nav className='container flex h-14 max-w-4xl items-center justify-between gap-4'>
        <Link
          href='/'
          className='shrink-0 text-sm font-bold text-foreground transition-colors hover:text-brand'
        >
          <span className='text-brand'>~</span>/thos
        </Link>

        {/* Desktop: nav-as-tabs */}
        <div className='hidden md:block'>
          <TabBar />
        </div>

        <div className='flex items-center gap-2'>
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
                {links.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 transition-colors ${
                        isNavLinkActive(link.path)
                          ? 'border-border bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      <span className='select-none text-brand'>$ </span>
                      cd ~/{link.name === 'home' ? '' : link.name}
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
