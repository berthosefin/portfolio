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
            <li
              key={link.name}
              className={`${
                isNavLinkActive(link.path) ? 'text-foreground' : ''
              } transition-colors hover:text-foreground`}
            >
              <Link href={link.path} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            </li>
          )
      )}
    </>
  )

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-3xl items-center justify-between'>
        <div className='hidden md:block'>
          <Link href='/' className='text-2xl font-bold'>
            Bf
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className='hidden items-center gap-8 text-sm font-light text-muted-foreground md:flex'>
          <NavLinks />
        </ul>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size={'sm'} variant={'ghost'} className='md:hidden'>
              <Menu className='size-4' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <ul className='flex flex-col gap-4 pt-10 text-sm font-light text-muted-foreground'>
              <NavLinks isMobile={true} />
            </ul>
          </SheetContent>
        </Sheet>

        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
