import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'

import './globals.css'

const font = Outfit({
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Traveling Agency',
  description:
    'Choose your next vacation destination and discover amazing places in the world with us.',
  keywords: [
    'travel',
    'vacation',
    'destinations',
    'tourism',
    'flights',
    'hotels',
    'holiday packages',
    'adventure travel',
    'family vacations',
    'travel deals',
  ],
  authors: [{ name: 'Traveling Agency', url: 'https://traveling-agency.com' }],
  creator: 'Traveling Agency',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.variable}>{children}</body>
    </html>
  )
}
