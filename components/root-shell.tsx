import Header from '@/components/header'
import { ThemeProvider } from '@/components/providers'
import StatusBar from '@/components/tui/status-bar'
import { getDictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'
import '../app/globals.css'

const jetbrainsMono = localFont({
  src: '../public/fonts/JetBrainsMono-Variable-latin.woff2',
  variable: '--font-jbmono',
  weight: '100 800',
  display: 'swap'
})

export default function RootShell({
  locale,
  children
}: {
  locale: Locale
  children: ReactNode
}) {
  const dict = getDictionary(locale)

  return (
    <html lang={locale}>
      <body
        className={cn(
          'flex min-h-screen flex-col antialiased noise',
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider>
          <Header locale={locale} labels={dict.header} />
          <main className='grow'>{children}</main>
          <StatusBar tagline={dict.footer.tagline} />
        </ThemeProvider>
      </body>
    </html>
  )
}
