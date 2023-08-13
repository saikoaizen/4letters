import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import backgroundImage from '/public/background.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '4letters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Image
          src={backgroundImage}
          alt="Background"
          objectFit="cover"
          fill
          style={{ zIndex: -9999 }}
        />
      </body>
    </html>
  )
}
