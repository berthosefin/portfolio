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
    'Explore the portfolio of Berthose Fin, a passionate fullstack developer in web development, Linux systems, and modern technologies like React, Next.js, and Prisma.'
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
          'flex min-h-screen flex-col font-sans antialiased',
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
