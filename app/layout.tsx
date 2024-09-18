import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const OxProto = localFont({
  src: '../public/fonts/0xProto-Regular.woff2'
})

export const metadata: Metadata = {
  title: 'Berthose Fin | Fullstack Developer',
  description:
    'Discover the portfolio of Berthose Fin, a self-taught fullstack developer passionate about web development, open source, Linux, containerization, and customization through Linux ricing. Explore my work, projects, and technologies I love to work with.'
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
          'flex min-h-screen flex-col antialiased',
          OxProto.className
        )}
      >
        <ThemeProvider>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
