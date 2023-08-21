import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import backgroundImage from '/public/background.png'

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
          fill
          style={{ zIndex: -9999 }}
        />
      </body>
    </html>
  )
}
