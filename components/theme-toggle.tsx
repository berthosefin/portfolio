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
      {resolvedTheme === 'dark' ? (
        <Sun className='size-4 text-orange-300' />
      ) : (
        <Moon className='size-4 text-sky-950' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
