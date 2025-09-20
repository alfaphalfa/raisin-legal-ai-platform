import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ProposalBanner } from '@/components/shared/ProposalBanner'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Raisin Legal AI Command Center',
  description: 'AI-Powered Legal Operations for Global Fintech',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
        <ProposalBanner />
      </body>
    </html>
  )
}