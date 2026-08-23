'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LocaleSwitcher() {
  const pathname = usePathname()
  const isFr = pathname === '/fr' || pathname.startsWith('/fr/')
  const twinHref = isFr ? pathname.slice(3) || '/' : `/fr${pathname}`

  return (
    <Link
      href={twinHref}
      className='font-medium transition-colors hover:text-brand'
      aria-label={isFr ? 'Switch to English' : 'Passer en français'}
    >
      {isFr ? 'en' : 'fr'}
    </Link>
  )
}
