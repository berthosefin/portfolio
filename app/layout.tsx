import Header from '@/components/header'
import { ThemeProvider } from '@/components/providers'
import StatusBar from '@/components/tui/status-bar'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const jetbrainsMono = localFont({
  src: '../public/fonts/JetBrainsMono-Variable-latin.woff2',
  variable: '--font-jbmono',
  weight: '100 800',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Berthose Fin | Self-taught Developer',
  description:
    'Discover the portfolio of Berthose Fin, a self-taught developer passionate about open source and Linux. He enjoys creating applications, experimenting with Linux, and customizing his system.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'flex min-h-screen flex-col antialiased noise',
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider>
          <Header />
          <main className='grow'>{children}</main>
          <StatusBar />
        </ThemeProvider>
      </body>
    </html>
  )
}
