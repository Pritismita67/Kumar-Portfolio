'use client'

import { useEffect, useState } from 'react'

// ── Tool data — 5 / 4 / 3 / 2 / 1 pyramid ─────────────────────────────────
const rows = [
  // Row 1 — 5 tools
  [
    
    {
      // FigJam — exact Figma 5-node shape (same as Figma icon structure) in FigJam colors
      name: 'Figma',
      color: '#F24E1E',
      glow: 'rgba(242,78,30,0.45)',
      icon: (
        <svg viewBox="0 0 56 84" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="38">
          {/* Top-left pill: orange-red */}
          <path d="M0 14 C0 6.268 6.268 0 14 0 H28 V28 H14 C6.268 28 0 21.732 0 14Z" fill="#FF7262"/>
          {/* Top-right pill: red */}
          <path d="M28 0 H42 C49.732 0 56 6.268 56 14 C56 21.732 49.732 28 42 28 H28 V0Z" fill="#F24E1E"/>
          {/* Middle-left pill: purple */}
          <path d="M0 42 C0 34.268 6.268 28 14 28 H28 V56 H14 C6.268 56 0 49.732 0 42Z" fill="#A259FF"/>
          {/* Middle-right circle: blue */}
          <circle cx="42" cy="42" r="14" fill="#1ABCFE"/>
          {/* Bottom-left pill: green */}
          <path d="M0 70 C0 62.268 6.268 56 14 56 H28 V70 C28 77.732 21.732 84 14 84 C6.268 84 0 77.732 0 70Z" fill="#0ACF83"/>
        </svg>
      ),
    },

    {
      // Exact official Framer logo SVG
      name: 'Framer',
      color: '#ffffff',
      glow: 'rgba(255,255,255,0.30)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140" style={{width:'38px',height:'38px'}}>
          <path d="M 44.65 33.992 L 95.35 33.992 L 95.35 59.341 L 70 59.341 Z M 44.65 59.341 L 70 59.341 L 95.35 84.691 L 44.65 84.691 Z M 44.65 84.691 L 70 84.691 L 70 110.041 Z" fill="white"/>
        </svg>
      ),
    },
    {
      // Official Adobe "A" logomark — red triangle with crossbar
      name: 'Adobe',
      color: '#FF0000',
      glow: 'rgba(255,0,0,0.40)',
      icon: (
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          {/* Adobe "Aa" creative cloud red square logo */}
          <rect width="500" height="500" rx="60" fill="#FF0000"/>
          {/* Left "A" shape */}
          <path d="M170 120 L270 370 H220 L195 300 H120 L95 370 H45 Z M145 265 H170 L157 228 Z" fill="white"/>
          {/* Right "a" shape */}
          <path d="M310 200 C310 200 340 190 370 200 C400 210 420 235 420 270 L420 370 H380 L378 348 C365 368 342 378 315 372 C280 364 265 338 270 308 C276 272 310 260 355 262 L378 263 C376 238 360 225 335 228 C315 231 298 242 298 242 Z M355 295 C330 294 310 304 310 322 C310 338 323 348 340 346 C362 343 378 325 378 295 Z" fill="white"/>
        </svg>
      ),
    },
    {
      // Official Canva wordmark — gradient purple/blue italic logotype
      name: 'Canva',
      color: '#7B3FE4',
      glow: 'rgba(123,63,228,0.45)',
      icon: (
        <svg viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg" width="62" height="22">
          <defs>
            <linearGradient id="canvaWordGrad" x1="0" y1="0" x2="200" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#7B3FE4"/>
              <stop offset="40%"  stopColor="#4B6CF7"/>
              <stop offset="100%" stopColor="#3ECFCF"/>
            </linearGradient>
          </defs>
          <text
            x="0" y="56"
            fontFamily="'Georgia', 'Times New Roman', serif"
            fontSize="62"
            fontWeight="700"
            fontStyle="italic"
            fill="url(#canvaWordGrad)"
            letterSpacing="-1"
          >Canva</text>
        </svg>
      ),
    },
    {
      name: 'Sketch',
      color: '#F7B500',
      glow: 'rgba(247,181,0,0.40)',
      icon: (
        <svg viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <path d="M28.5 3.5L8 20.5 28.5 53.5 49 20.5z" fill="#F7B500"/>
          <path d="M8 20.5h41L28.5 53.5z" fill="#EA6C00" opacity="0.8"/>
          <path d="M28.5 3.5L8 20.5h41z" fill="#FABB00"/>
          <path d="M28.5 3.5L8 20.5l6 0z" fill="#E8A000"/>
          <path d="M28.5 3.5L49 20.5l-6 0z" fill="#E8A000"/>
        </svg>
      ),
    },
  ],

  // Row 2 — 4 tools
  [
    {
      // Official Google Stitch logo (AI design tool) — stylized "S" with threads
      name: 'Stitch',
      color: '#4285F4',
      glow: 'rgba(66,133,244,0.40)',
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          {/* Google Stitch — multicolor Google-palette needle & thread "S" */}
          <circle cx="50" cy="50" r="48" fill="#1a1a2e"/>
          {/* Top arc - blue */}
          <path d="M30 38 Q50 18 70 38" stroke="#4285F4" strokeWidth="7" strokeLinecap="round" fill="none"/>
          {/* Middle connector */}
          <path d="M30 38 Q50 50 70 38" stroke="#EA4335" strokeWidth="7" strokeLinecap="round" fill="none"/>
          {/* Bottom arc - yellow/green */}
          <path d="M30 62 Q50 82 70 62" stroke="#FBBC05" strokeWidth="7" strokeLinecap="round" fill="none"/>
          <path d="M70 38 Q50 50 30 62" stroke="#34A853" strokeWidth="7" strokeLinecap="round" fill="none"/>
          <circle cx="30" cy="38" r="5" fill="#4285F4"/>
          <circle cx="70" cy="62" r="5" fill="#FBBC05"/>
        </svg>
      ),
    },
    {
      name: 'Git',
      color: '#F05032',
      glow: 'rgba(240,80,50,0.40)',
      icon: (
        <svg viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <path d="M90.156 41.965L50.036 1.845a5.918 5.918 0 0 0-8.372 0l-8.33 8.33 10.566 10.566a7.03 7.03 0 0 1 7.23 1.684 7.034 7.034 0 0 1 1.669 7.277l10.187 10.184a7.028 7.028 0 0 1 7.278 1.672 7.04 7.04 0 0 1 0 9.957 7.05 7.05 0 0 1-9.965 0 7.044 7.044 0 0 1-1.528-7.66l-9.5-9.497V59.03a7.01 7.01 0 0 1 1.855 11.297 7.04 7.04 0 0 1-9.965 0 7.04 7.04 0 0 1 0-9.958 7.06 7.06 0 0 1 2.306-1.539V33.926a7.049 7.049 0 0 1-2.304-1.535 7.06 7.06 0 0 1-1.559-7.699L30.396 14.157 1.845 42.708a5.918 5.918 0 0 0 0 8.37l40.12 40.122a5.918 5.918 0 0 0 8.37 0l39.82-39.819a5.918 5.918 0 0 0 0-8.416" fill="#F05032"/>
        </svg>
      ),
    },
    {
      // Official Wix logo — black rectangle with white "Wix" wordmark
      name: 'Wix Studio',
      color: '#FFFFFF',
      glow: 'rgba(255,255,255,0.30)',
      icon: (
        <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="50" height="22">
          {/* Official Wix wordmark: W-i-x in clean sans-serif */}
          <text
            x="0" y="40"
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="46"
            fontWeight="900"
            fill="white"
            letterSpacing="-2"
          >Wix</text>
        </svg>
      ),
    },
    {
      name: 'Mockups',
      color: '#64748B',
      glow: 'rgba(100,116,139,0.35)',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
          <rect x="8" y="4" width="32" height="40" rx="4" stroke="#64748B" strokeWidth="2.5" fill="none"/>
          <rect x="12" y="10" width="24" height="16" rx="2" fill="#64748B" opacity="0.35"/>
          <line x1="12" y1="32" x2="36" y2="32" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="37" x2="28" y2="37" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
          <rect x="18" y="40" width="12" height="3" rx="1.5" fill="#64748B" opacity="0.5"/>
        </svg>
      ),
    },
  ],

  // Row 3 — 3 tools
  [
    {
      name: 'Mid Journey',
      color: '#ffffff',
      glow: 'rgba(255,255,255,0.25)',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <path d="M24 8 L38 36 H24z" fill="white" opacity="0.9"/>
          <path d="M24 14 L12 36 H24z" fill="white" opacity="0.55"/>
          <path d="M10 38 H38" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M16 38 Q24 44 32 38" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      name: 'Galileo AI',
      color: '#60A5FA',
      glow: 'rgba(96,165,250,0.40)',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <circle cx="24" cy="24" r="7" fill="#60A5FA"/>
          <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#60A5FA" strokeWidth="2" fill="none" opacity="0.6"/>
          <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#60A5FA" strokeWidth="2" fill="none" opacity="0.4" transform="rotate(60 24 24)"/>
          <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#60A5FA" strokeWidth="2" fill="none" opacity="0.4" transform="rotate(120 24 24)"/>
          <circle cx="24" cy="24" r="3" fill="white"/>
        </svg>
      ),
    },
    {
      name: 'Powerpoint',
      color: '#D24726',
      glow: 'rgba(210,71,38,0.40)',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <rect x="2" y="6" width="30" height="36" rx="3" fill="#D24726"/>
          <rect x="16" y="2" width="30" height="36" rx="3" fill="#ED6C47"/>
          <path d="M22 12h8a6 6 0 0 1 0 12h-8V12z" fill="white" opacity="0.9"/>
          <path d="M22 24h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M22 30h10" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </svg>
      ),
    },
  ],

  // Row 4 — 2 tools
  [
    {
      name: 'Excel',
      color: '#217346',
      glow: 'rgba(33,115,70,0.40)',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <rect x="2" y="6" width="30" height="36" rx="3" fill="#1D6F42"/>
          <rect x="16" y="2" width="30" height="36" rx="3" fill="#21A366"/>
          <path d="M20 13 L30 27 M30 13 L20 27" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          <line x1="20" y1="32" x2="30" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ),
    },
    {
      name: 'MS Word',
      color: '#2B579A',
      glow: 'rgba(43,87,154,0.40)',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <rect x="2" y="6" width="30" height="36" rx="3" fill="#1A3F6F"/>
          <rect x="16" y="2" width="30" height="36" rx="3" fill="#2B579A"/>
          <path d="M20 14 L23 28 L26 18 L29 28 L32 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      ),
    },
  ],

  // Row 5 — 1 tool
  [
    {
      // FigJam — exact Figma 5-node shape (same as Figma icon structure) in FigJam colors
      name: 'FigJam',
      color: '#F24E1E',
      glow: 'rgba(242,78,30,0.45)',
      icon: (
        <svg viewBox="0 0 56 84" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="38">
          {/* Top-left pill: orange-red */}
          <path d="M0 14 C0 6.268 6.268 0 14 0 H28 V28 H14 C6.268 28 0 21.732 0 14Z" fill="#FF7262"/>
          {/* Top-right pill: red */}
          <path d="M28 0 H42 C49.732 0 56 6.268 56 14 C56 21.732 49.732 28 42 28 H28 V0Z" fill="#F24E1E"/>
          {/* Middle-left pill: purple */}
          <path d="M0 42 C0 34.268 6.268 28 14 28 H28 V56 H14 C6.268 56 0 49.732 0 42Z" fill="#A259FF"/>
          {/* Middle-right circle: blue */}
          <circle cx="42" cy="42" r="14" fill="#1ABCFE"/>
          {/* Bottom-left pill: green */}
          <path d="M0 70 C0 62.268 6.268 56 14 56 H28 V70 C28 77.732 21.732 84 14 84 C6.268 84 0 77.732 0 70Z" fill="#0ACF83"/>
        </svg>
      ),
    },
  ],
]

// ── Individual tool card ───────────────────────────────────────────────────────
function ToolCard({ tool, index, rowIndex }) {
  const [hovered, setHovered] = useState(false)
  const delay = (rowIndex * 5 + index) * 80

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        cursor: 'default',
        animationDelay: `${delay}ms`,
      }}
      className="tool-card-wrapper"
    >
      <div
        className="tool-card"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: hovered
            ? `radial-gradient(circle at 40% 35%, ${tool.color}22 0%, #0d0d1a 80%)`
            : 'rgba(255,255,255,0.04)',
          border: hovered
            ? `1px solid ${tool.color}88`
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: hovered
            ? `0 0 24px ${tool.glow}, 0 0 48px ${tool.glow.replace('0.4', '0.15')}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 2px 8px rgba(0,0,0,0.4)',
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          transform: hovered ? 'translateY(-6px) scale(1.08)' : 'translateY(0) scale(1)',
          backdropFilter: 'blur(12px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {hovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '18px',
            background: `linear-gradient(135deg, ${tool.color}18 0%, transparent 60%)`,
            pointerEvents: 'none',
          }} />
        )}
        {tool.icon}
      </div>

      <span
        style={{
          fontSize: '11px',
          fontFamily: "'Courier New', monospace",
          fontWeight: '600',
          letterSpacing: '0.08em',
          color: hovered ? tool.color : 'rgba(255,255,255,0.55)',
          transition: 'color 0.3s ease',
          textTransform: 'uppercase',
          textShadow: hovered ? `0 0 12px ${tool.glow}` : 'none',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        {tool.name}
      </span>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function Tech() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        zIndex: 1,
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* Section heading */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          letterSpacing: '0.25em',
          color: '#9B5DE5',
          textTransform: 'uppercase',
          marginBottom: '16px',
          border: '1px solid rgba(155,93,229,0.35)',
          padding: '4px 16px',
          borderRadius: '999px',
          background: 'rgba(155,93,229,0.08)',
        }}>
          ● Design &amp; Dev Tools
        </span>
        <h2 style={{
          margin: 0,
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: '800',
          color: '#ffffff',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          fontFamily: "'Courier New', monospace",
        }}>
          My Creative Stack
        </h2>
        <p style={{
          margin: '12px 0 0',
          fontSize: '15px',
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.03em',
        }}>
          Tools I wield to craft cinematic digital experiences.
        </p>
      </div>

      {/* Pyramid rows */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {row.map((tool, i) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                index={i}
                rowIndex={rowIndex}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '200px',
        background: 'radial-gradient(ellipse at center, rgba(155,93,229,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <style>{`
        .tool-card-wrapper {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}