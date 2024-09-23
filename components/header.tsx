'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' }
]

export default function Header() {
  const pathname = usePathname()

  const isNavLinkActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-3xl items-center justify-between'>
        <div>
          <Link href='/' className='text-2xl font-bold'>
            Bf
          </Link>
        </div>

        <ul className='flex items-center gap-3 text-sm font-light text-muted-foreground sm:gap-8'>
          {links.map(link => (
            <li
              key={link.name}
              className={`${
                isNavLinkActive(link.path) && `text-foreground`
              } transition-colors hover:text-foreground`}
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
