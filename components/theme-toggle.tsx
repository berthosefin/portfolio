'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      size={'sm'}
      variant={'ghost'}
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
    >
      <Sun className='size-4 dark:hidden' />
      <Moon className='size-4 hidden dark:block' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
