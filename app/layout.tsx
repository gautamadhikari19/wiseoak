import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wise Oaks International School',
  description: 'Give Wings of reality to boundless dreams of your child with Wise Oaks',
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'utf-8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
