import Navbar from '@/components/Navbar'
import LenisProvider from '@/components/LenisProvider'
import TextAnimator from '@/components/TextAnimator'
import SceneBackground from '@/components/SceneBackground'
import TechOrbit from '@/components/TechOrbit'
import './globals.css'

export const metadata = {
  title: 'Kumar Pritish — Creative Developer',
  description: 'UX/UI Designer',
  openGraph: {
    title: 'Kumar Pritish — Creative Developer',
    description: 'UX/UI Designer',
    url: 'https://pritish-kumar-portfolio.vercel.app',
    siteName: 'Kumar Pritish Portfolio',
    images: [
      {
        url: 'https://pritish-kumar-portfolio.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kumar Pritish — Creative Developer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kumar Pritish — Creative Developer',
    description: 'UX/UI Designer',
    images: ['https://pritish-kumar-portfolio.vercel.app/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#02010a', overflowX: 'hidden' }}>
        <LenisProvider>

          {/* Layer 1 — Cinematic 3D star background */}
          <SceneBackground />

          {/* Layer 2 — Orbiting tech stack, fixed on every page */}
          <TechOrbit />

          {/* Layer 3 — Navbar */}
          <Navbar />

          {/* Layer 4 — Letter drop on every heading, every page */}
          <TextAnimator />

          {/* Layer 5 — Page content */}
          <main style={{ position: 'relative', zIndex: 10 }}>
            {children}
          </main>

        </LenisProvider>
      </body>
    </html>
  )
}