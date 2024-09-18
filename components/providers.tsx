'use client'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      enableSystem
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
    >
      {children}
      <ToasterProvider />
    </NextThemesProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position='top-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}
