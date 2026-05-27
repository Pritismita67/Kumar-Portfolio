'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOOLS = [
  { name: 'Figma',      icon: '🎨', color: '#F24E1E' },
  { name: 'Framer',     icon: '⚡', color: '#0055FF' },
  { name: 'Adobe',      icon: '🅰️', color: '#FF0000' },
  { name: 'Canva',      icon: '🖌️', color: '#00C4CC' },
  { name: 'Sketch',     icon: '💎', color: '#F7B500' },
  { name: 'Stitch',     icon: '🧵', color: '#a78bfa' },
  { name: 'Git',        icon: '🐙', color: '#F05032' },
  { name: 'Wix',        icon: '🌐', color: '#FAAD00' },
  { name: 'Wix Studio', icon: '🏗️', color: '#ffffff' },
  { name: 'Mockups',    icon: '📱', color: '#818cf8' },
  { name: 'MidJourney', icon: '🤖', color: '#c4b5fd' },
  { name: 'Galileo AI', icon: '🔭', color: '#67e8f9' },
  { name: 'PowerPoint', icon: '📊', color: '#D24726' },
  { name: 'Excel',      icon: '📗', color: '#217346' },
  { name: 'MS Word',    icon: '📘', color: '#2B579A' },
  { name: 'FigJam',     icon: '🟡', color: '#FFC700' },
]

const W = 500
const H = 500
const cx = W / 2
const cy = H / 2
const rx = 195
const ry = 130
const iconSize = 52

function OrbitSVG() {
  return (
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      {[-2, -1, 0, 1, 2].map((i) => (
        <line key={`h${i}`} x1={cx - 240} y1={cy + i * 60} x2={cx + 240} y2={cy + i * 60}
          stroke="rgba(139,92,246,0.1)" strokeWidth="0.5"
          style={{ animation: 'grid-pulse 4s ease-in-out infinite' }} />
      ))}
      {[-2, -1, 0, 1, 2].map((i) => (
        <line key={`v${i}`} x1={cx + i * 60} y1={cy - 200} x2={cx + i * 60} y2={cy + 200}
          stroke="rgba(139,92,246,0.1)" strokeWidth="0.5"
          style={{ animation: 'grid-pulse 4s ease-in-out infinite' }} />
      ))}
      <line x1={cx - 240} y1={cy} x2={cx + 240} y2={cy} stroke="rgba(139,92,246,0.28)" strokeWidth="1" />
      <line x1={cx} y1={cy - 200} x2={cx} y2={cy + 200} stroke="rgba(139,92,246,0.28)" strokeWidth="1" />
      <line x1={cx - 200} y1={cy - 160} x2={cx + 200} y2={cy + 160} stroke="rgba(139,92,246,0.12)" strokeWidth="0.5" />
      <line x1={cx + 200} y1={cy - 160} x2={cx - 200} y2={cy + 160} stroke="rgba(139,92,246,0.12)" strokeWidth="0.5" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none"
        stroke="rgba(139,92,246,0.25)" strokeWidth="1" strokeDasharray="4 6" />
      <ellipse cx={cx} cy={cy} rx={rx + 30} ry={ry + 20} fill="none"
        stroke="rgba(99,102,241,0.1)" strokeWidth="0.5" />
      <ellipse cx={cx} cy={cy} rx={rx - 40} ry={ry - 26} fill="none"
        stroke="rgba(167,139,250,0.08)" strokeWidth="0.5" strokeDasharray="2 8" />
      <circle cx={cx} cy={cy} r={3} fill="#a78bfa" opacity="0.8" />
      <circle cx={cx} cy={cy} r={8} fill="none" stroke="#a78bfa" strokeWidth="0.8" opacity="0.4" />
      <circle cx={cx} cy={cy} r={18} fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="0.5" />
      {[-120, -60, 0, 60, 120].map((offset) => (
        <g key={offset}>
          <line x1={cx + offset} y1={cy - 4} x2={cx + offset} y2={cy + 4}
            stroke="rgba(139,92,246,0.35)" strokeWidth="1" />
          <line x1={cx - 4} y1={cy + offset} x2={cx + 4} y2={cy + offset}
            stroke="rgba(139,92,246,0.35)" strokeWidth="1" />
        </g>
      ))}
    </svg>
  )
}

function OrbitInstance({ angleOffset = 0, direction = 1 }) {
  const iconsRef = useRef([])
  const angleRef = useRef(angleOffset)
  const rafRef = useRef()
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const total = TOOLS.length

  useEffect(() => {
    function tick() {
      angleRef.current += 0.003 * direction
      const angle = angleRef.current

      iconsRef.current.forEach((el, i) => {
        if (!el) return
        const a = angle + (i / total) * Math.PI * 2
        const x = cx + rx * Math.cos(a)
        const y = cy + ry * Math.sin(a)
        const depth = (Math.sin(a) + 1) / 2
        const scale = 0.6 + depth * 0.5
        const opacity = hoveredIndex === i ? 1 : 0.5 + depth * 0.5

        el.style.left = `${x - iconSize / 2}px`
        el.style.top = `${y - iconSize / 2}px`
        el.style.transform = `scale(${scale})`
        el.style.opacity = opacity
        el.style.zIndex = Math.round(depth * 10)
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    tick()
    return () => cancelAnimationFrame(rafRef.current)
  }, [hoveredIndex, direction])

  return (
    <div style={{ position: 'relative', width: W, height: H }}>
      <OrbitSVG />
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 120, height: 60, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)',
        filter: 'blur(16px)',
        animation: 'center-glow 3s ease-in-out infinite',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }} />
      <div style={{ position: 'absolute', inset: 0 }}>
        {TOOLS.map((tool, i) => (
          <div
            key={tool.name}
            ref={el => iconsRef.current[i] = el}
            className="tech-icon-wrap"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: `${tool.color}18`,
              border: `1px solid ${tool.color}40`,
              boxShadow: hoveredIndex === i
                ? `0 0 16px ${tool.color}66, 0 0 32px ${tool.color}22`
                : '0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{
              fontSize: 22, lineHeight: 1,
              filter: hoveredIndex === i ? `drop-shadow(0 0 5px ${tool.color})` : 'none',
              transition: 'filter 0.3s',
            }}>
              {tool.icon}
            </span>
            <span className="tech-icon-label"
              style={{ color: hoveredIndex === i ? tool.color : 'rgba(255,255,255,0.45)' }}>
              {tool.name.length > 7 ? tool.name.slice(0, 7) : tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechOrbit() {
  const leftRef = useRef()
  const rightRef = useRef()

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current

    if (!left || !right) return

    // Both start perfectly centered via CSS top:50% + translateY(-50%)
    left.style.transform  = 'translateY(-50%)'
    right.style.transform = 'translateY(-50%)'

    // Entrance fade-in
    gsap.fromTo(
      [left, right],
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out', delay: 0.4 }
    )

    // Pure scroll listener — no ScrollTrigger, works in any Next.js setup
    const TRAVEL = 220  // total px each orbit moves from its start

    const onScroll = () => {
      const scrolled  = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const t         = maxScroll > 0 ? scrolled / maxScroll : 0  // 0 → 1

      // LEFT  → moves DOWN  (positive px)
      left.style.transform  = `translateY(calc(-50% + ${t * TRAVEL}px))`
      // RIGHT → moves UP    (negative px)
      right.style.transform = `translateY(calc(-50% - ${t * TRAVEL}px))`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()  // sync on mount

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @keyframes grid-pulse {
          0%,100% { opacity: 0.18; }
          50%      { opacity: 0.32; }
        }
        @keyframes center-glow {
          0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 0.9; transform: translate(-50%,-50%) scale(1.15); }
        }
        .tech-icon-wrap {
          position: absolute;
          width: ${iconSize}px;
          height: ${iconSize}px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          cursor: default;
          transition: box-shadow 0.3s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          will-change: transform, left, top, opacity;
        }
        .tech-icon-wrap:hover {
          z-index: 20 !important;
          transform: scale(1.15) !important;
        }
        .tech-icon-label {
          font-family: 'DM Mono', monospace;
          font-size: 7px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
          pointer-events: none;
        }

        .orbit-left {
          position: fixed;
          top: 50%;
          left: -2vw;
          z-index: 6;
          pointer-events: none;
          opacity: 0;
          /* NOTE: yPercent + y are fully managed by GSAP — do NOT add
             a CSS transform here or it will conflict */
        }
        .orbit-right {
          position: fixed;
          top: 50%;
          right: -2vw;
          z-index: 6;
          pointer-events: none;
          opacity: 0;
        }

        /* Below 900px — hide BOTH orbits completely */
        @media (max-width: 900px) {
          .orbit-left,
          .orbit-right {
            display: none !important;
          }
        }
      `}</style>

      {/* LEFT orbit — scrolls DOWN as page scrolls */}
      <div ref={leftRef} className="orbit-left">
        <div style={{ pointerEvents: 'all' }}>
          <OrbitInstance angleOffset={0} direction={-1} />
        </div>
      </div>

      {/* RIGHT orbit — scrolls UP as page scrolls */}
      <div ref={rightRef} className="orbit-right">
        <div style={{ pointerEvents: 'all' }}>
          <OrbitInstance angleOffset={Math.PI} direction={1} />
        </div>
      </div>
    </>
  )
}