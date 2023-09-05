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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zilla+Slab+Highlight&family=Zilla+Slab&family=Viga&family=Jockey+One&display=swap"
          rel="stylesheet"
        />
      </head>
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
