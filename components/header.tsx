'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' }
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

  const NavLinks = ({ isMobile = false }) => (
    <>
      {links.map(
        (link, index) =>
          (isMobile || index !== 0) && (
            <li key={link.name}>
              <Link
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`relative transition-colors hover:text-brand ${
                  isNavLinkActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                } ${isMobile ? '' : 'pb-1'}`}
              >
                {link.name}
                {!isMobile && isNavLinkActive(link.path) && (
                  <span className='absolute -bottom-[2px] left-0 h-[2px] w-full rounded-full bg-brand' />
                )}
              </Link>
            </li>
          )
      )}
    </>
  )

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-3xl items-center justify-between'>
        <Link
          href='/'
          className='text-xl font-bold tracking-tight text-brand'
        >
          Bf<span className='text-foreground'>.</span>
        </Link>

        {/* Desktop menu */}
        <ul className='hidden items-center gap-8 text-sm font-light md:flex'>
          <NavLinks />
        </ul>

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
              <div className='mb-8 text-xl font-bold tracking-tight text-brand'>
                Bf<span className='text-foreground'>.</span>
              </div>
              <ul className='flex flex-col gap-4 text-sm font-light text-muted-foreground'>
                <NavLinks isMobile={true} />
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
