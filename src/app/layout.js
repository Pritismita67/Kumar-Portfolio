import SceneBackground from '@/components/SceneBackground'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Kumar Pritish — Creative Developer',
  description: 'Full Stack Developer & Creative Coder',
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

        {/* Cinematic 3D background — always visible on every page */}
        <SceneBackground />

        {/* Glassmorphism navbar — always visible */}
        <Navbar />

        {/* Each page renders its own content here */}
        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>

      </body>
    </html>
  )
}