import '../styles/globals.css'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata = {
  title: 'Portfolio | Full Stack Developer',
  description: 'Full Stack Developer specializing in Next.js & Node.js — Code. Create. Innovate.',
  keywords: ['Full Stack', 'Next.js', 'Node.js', 'Developer', 'Portfolio', 'React', 'MongoDB'],
  openGraph: {
    title: 'Portfolio | Full Stack Developer',
    description: 'Full Stack Developer. Code. Create. Innovate.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
