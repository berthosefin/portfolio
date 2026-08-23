'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LocaleSwitcher() {
  const pathname = usePathname()
  const isFr = pathname === '/fr' || pathname.startsWith('/fr/')
  const twinHref = isFr ? pathname.slice(3) || '/' : `/fr${pathname}`

  return (
    <div className='flex items-center gap-1 text-base leading-none'>
      {isFr ? (
        <>
          <Link
            href={twinHref}
            aria-label='Switch to English'
            className='text-muted-foreground transition-colors hover:text-brand'
          >
            en
          </Link>
          <span
            aria-current='true'
            className='font-medium text-brand select-none'
          >
            [fr]
          </span>
        </>
      ) : (
        <>
          <span
            aria-current='true'
            className='font-medium text-brand select-none'
          >
            [en]
          </span>
          <Link
            href={twinHref}
            aria-label='Passer en français'
            className='text-muted-foreground transition-colors hover:text-brand'
          >
            fr
          </Link>
        </>
      )}
    </div>
  )
}
