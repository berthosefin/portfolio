'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [isMouted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMouted) {
    return null
  }

  return (
    <Button
      size={'sm'}
      variant={'ghost'}
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className='size-4' />
      ) : (
        <Moon className='size-4' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
