'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',                       href: '/' },
  { label: 'Projects',                   href: '/projects' },
  { label: 'Achievements & Recognition', href: '/Achievement' },
  { label: 'Contact',                    href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.5rem 1.5rem',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow:
            '0 0 40px rgba(168,85,247,0.15), 0 0 80px rgba(168,85,247,0.06), inset 0 1px 0 rgba(255,255,255,0.08)',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: '"Courier New", monospace',
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '0.08em',
            background: 'linear-gradient(90deg, #f5d0fe, #a855f7, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginRight: '1.5rem',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          PK
        </span>

        {/* Desktop nav links */}
        <div className="nav-links-desktop" style={{ alignItems: 'center', gap: '0.25rem' }}>
          {links.map(({ label, href }, i) => {
            const isActive = pathname === href
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <Link
                  href={href}
                  style={{
                    display: 'inline-block',
                    padding: '0.4rem 1.1rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    background: isActive ? 'rgba(168,85,247,0.18)' : 'transparent',
                    boxShadow: isActive ? '0 0 20px rgba(168,85,247,0.25)' : 'none',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    fontFamily: '"Courier New", monospace',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.background = 'rgba(168,85,247,0.15)'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.25)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.boxShadow = 'none'
                    }
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          className="hamburger-btn"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.3rem',
            marginLeft: '0.5rem',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {[0, 1, 2].map(n => (
            <motion.span
              key={n}
              animate={
                menuOpen
                  ? n === 0
                    ? { rotate: 45, y: 7 }
                    : n === 1
                    ? { opacity: 0, scaleX: 0 }
                    : { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.25 }}
              style={{
                display: 'block',
                width: '20px',
                height: '2px',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.8)',
                transformOrigin: 'center',
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 98,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            {/* Menu panel */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: '5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 99,
                width: 'min(92vw, 360px)',
                borderRadius: '20px',
                background: 'rgba(15,10,25,0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow:
                  '0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(168,85,247,0.12), inset 0 1px 0 rgba(255,255,255,0.07)',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {links.map(({ label, href }, i) => {
                const isActive = pathname === href
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.85rem 1.2rem',
                        borderRadius: '12px',
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        fontFamily: '"Courier New", monospace',
                        textDecoration: 'none',
                        whiteSpace: 'normal',
                        lineHeight: '1.4',
                        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                        background: isActive ? 'rgba(168,85,247,0.20)' : 'transparent',
                        borderLeft: isActive
                          ? '2px solid rgba(168,85,247,0.7)'
                          : '2px solid transparent',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {label === 'Achievements & Recognition'
                        ? <>Achievements &<br />Recognition</>
                        : label}
                      {isActive && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#a855f7',
                            boxShadow: '0 0 8px rgba(168,85,247,0.8)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 860px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn     { display: flex !important; }
        }
        @media (min-width: 861px) {
          .nav-links-desktop { display: flex !important; }
          .hamburger-btn     { display: none !important; }
        }
      `}</style>
    </>
  )
}