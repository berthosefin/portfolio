'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className='flex items-center gap-2'>
      {/* light mode active: [sun] inert, moon switches to dark */}
      <div className='flex items-center gap-2 dark:hidden'>
        <button
          aria-label='Switch to dark theme'
          className='text-muted-foreground transition-colors hover:text-brand'
          onClick={() => setTheme('dark')}
        >
          <Moon className='size-4' />
        </button>
        <span
          aria-current='true'
          className='inline-flex items-center select-none text-brand'
        >
          [<Sun className='size-4' />]
        </span>
      </div>
      {/* dark mode active: [moon] inert, sun switches to light */}
      <div className='hidden items-center gap-2 dark:flex'>
        <span
          aria-current='true'
          className='inline-flex items-center select-none text-brand'
        >
          [<Moon className='size-4' />]
        </span>
        <button
          aria-label='Switch to light theme'
          className='text-muted-foreground transition-colors hover:text-brand'
          onClick={() => setTheme('light')}
        >
          <Sun className='size-4' />
        </button>
      </div>
    </div>
  )
}
