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
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
              }
            `,
          }}
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body {
                font-family: "Public Sans", sans-serif;
              }

              :root {
                --accent: #ff0000;
                --primary: #000080;
                --background-light: #f9f9f9;
                --background-dark: #0f172a;
              }

              .bg-accent { background-color: var(--accent); }
              .text-accent { color: var(--accent); }
              .text-primary { color: var(--primary); }
              .bg-primary { background-color: var(--primary); }
              .bg-background-light { background-color: var(--background-light); }
              .bg-background-dark { background-color: var(--background-dark); }
            `,
          }}
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
        {children}
      </body>
    </html>
  )
}
