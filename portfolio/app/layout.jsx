import './globals.css'
import { Inter } from 'next/font/google'

// Optimize font loading with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Pratyush Nayak | PORTFOLIO',
  description: 'Portfolio website for Pratyush Nayak',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className = {inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className = "bg-black">
        {children}
      </body>
    </html>
  )
}