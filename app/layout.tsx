import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    //  fetch the language preference here and then pass as dir property to all other props
    <html lang="en"  >
      <body className={inter.className}>{children}</body>
    </html>
  )
}
