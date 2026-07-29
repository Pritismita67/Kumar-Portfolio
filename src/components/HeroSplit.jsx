'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const expertise = [
  'UI/UX Design',
  'Visual & Graphic Design',
  'Wireframing & User Flows',
  'Rapid Prototyping',
  'Mockups & Interactive Interfaces',
  'User-Centered Design',
  'Canva Pro Creative Design',
  'Marketing & Social Media Creatives',
  'Visual Content Creation',
]

// ── Splash screen config — edit freely ──
const SPLASH_DURATION = 4000
const PROFILE = {
  name: 'Pritish Kumar',
  role: 'UI / UX Designer',
  image: '/profile.webp',
}

function SplitText({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-char"
          aria-hidden="true"
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

function ScrollHint() {
  return (
    <div className="scroll-hint">
      <div className="hand-wrap">
        <svg className="hand-svg" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2C20 2 20 2 20 2C17.2 2 15 4.2 15 7V28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M15 13C15 10.2 12.8 8 10 8C7.2 8 5 10.2 5 13V30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M25 14C25 11.2 22.8 9 20 9C17.2 9 15 11.2 15 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M30 17C30 14.2 27.8 12 25 12C22.2 12 20 14.2 20 17V28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M5 30V34C5 44.5 13.1 53 23 53H25C32.7 53 35 47 35 41V28C35 25.2 32.8 23 30 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
        <div className="hand-arrow">
          <svg viewBox="0 0 16 28" fill="none">
            <path d="M8 2L8 26M8 26L2 18M8 26L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <span className="hint-label">scroll</span>
    </div>
  )
}

/* ── Splash — fixed full-screen curtain. Slides up smoothly and lifts
   to reveal the hero underneath. No window scrolling involved, so there's
   nothing that can jump or skip. ── */
function SplashScreen({ onDone }) {
  const [imgOk, setImgOk] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const [pct, setPct] = useState(0)
  const [particles, setParticles] = useState([])
  const timerRef = useRef(null)
  const rafRef = useRef(null)
  const firedRef = useRef(false)

  const initials = PROFILE.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const advance = useCallback(() => {
    if (firedRef.current) return
    firedRef.current = true
    clearTimeout(timerRef.current)
    cancelAnimationFrame(rafRef.current)
    setPct(100)
    setLeaving(true)
    onDone() // tells HeroSplit to start its entrance animation right now
  }, [onDone])

  useEffect(() => {
    timerRef.current = setTimeout(advance, SPLASH_DURATION)
    return () => clearTimeout(timerRef.current)
  }, [advance])

  // Live percentage counter, synced to the same duration as the progress bar.
  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(100, ((now - start) / SPLASH_DURATION) * 100)
      setPct(p)
      if (p < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Ambient floating particles — generated client-side to avoid hydration mismatch.
  useEffect(() => {
    setParticles(
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.2 + 0.6,
        op: Math.random() * 0.5 + 0.15,
        dur: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 4}s`,
      }))
    )
  }, [])

  return (
    <section
      className={`splash-wrapper${leaving ? ' is-leaving' : ''}`}
      onClick={advance}
      role="button"
      tabIndex={0}
    >
      {/* Drifting aurora glow */}
      <div className="splash-aurora">
        <span className="aurora-blob a1" />
        <span className="aurora-blob a2" />
        <span className="aurora-blob a3" />
      </div>

      {/* Ambient particles */}
      <div className="splash-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="splash-particle"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, "--op": p.op, "--dur": p.dur, "--delay": p.delay }}
          />
        ))}
      </div>

      {/* Diagonal light sweep */}
      <div className="splash-sheen" />

      {/* Frame corners — echoes the hero photo's corner-bracket motif */}
      <span className="splash-frame-corner tl" />
      <span className="splash-frame-corner br" />

      <div className="splash-inner">
        <div className="splash-photo-wrap">
          <div className="splash-halo" />
          <div className="splash-ring">
            {imgOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="splash-photo"
                src={PROFILE.image}
                alt={PROFILE.name}
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="splash-photo splash-photo-fallback">{initials}</div>
            )}
          </div>
        </div>

        <div className="splash-role">
          <span className="splash-role-dot" />
          <span className="splash-role-text">{PROFILE.role}</span>
        </div>

        <h1 className="splash-name">{PROFILE.name}</h1>

        <div className="splash-progress-row">
          <span className="splash-progress-label">Loading Experience</span>
          <span className="splash-progress-pct">{String(Math.min(99, Math.floor(pct))).padStart(2, '0')}%</span>
        </div>
        <div className="splash-progress-wrap">
          <div className="splash-progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="splash-skip">
          Entering Portfolio
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default function HeroSplit() {
  const wrapperRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showSplash, setShowSplash] = useState(true)
  const playIntroRef = useRef(null)

  // Splash calls this the instant it starts lifting. We hold the hero's
  // GSAP entrance timeline back until exactly this moment, so the text
  // animates in as the curtain rises instead of having already finished
  // invisibly behind it.
  const enterHero = useCallback(() => {
    playIntroRef.current?.()
    // Unmount the splash once its own slide-up transition has finished.
    setTimeout(() => setShowSplash(false), 1150)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── SET INITIAL HIDDEN STATE (before animation) ──
      gsap.set('.line-white .split-char', { opacity: 0, y: 70, rotateX: -80, filter: 'blur(6px)' })
      gsap.set('.line-gradient .split-char', { opacity: 0, y: 90, rotateX: -80, filter: 'blur(8px)' })
      gsap.set('.role-badge', { opacity: 0, y: 24, filter: 'blur(8px)' })
      gsap.set('.hero-desc-panel', { opacity: 0, y: 28, filter: 'blur(4px)' })
      gsap.set('.glass-expertise', { opacity: 0, y: 36 })
      gsap.set('.expertise-tag', { opacity: 0, scale: 0.82, y: 10 })
      gsap.set('.photo-frame', { opacity: 0, x: 70, filter: 'blur(14px)' })
      gsap.set('.stat-chip', { opacity: 0, scale: 0.55 })
      gsap.set('.scroll-hint', { opacity: 0, y: 16 })

      // ── ENTRANCE TIMELINE — built now, but only PLAYED once the splash
      // curtain lifts (see playIntroRef, invoked from enterHero above). ──
      playIntroRef.current = () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        tl.to('.role-badge', {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9
        })
        .to('.line-white .split-char', {
          opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
          duration: 0.75,
          stagger: { each: 0.028, from: 'start' },
        }, '-=0.5')
        .to('.line-gradient .split-char', {
          opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
          duration: 0.85,
          stagger: { each: 0.04, from: 'start' },
        }, '-=0.55')
        .to('.hero-desc-panel', {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9
        }, '-=0.4')
        .to('.glass-expertise', {
          opacity: 1, y: 0, duration: 0.8
        }, '-=0.5')
        .to('.expertise-tag', {
          opacity: 1, scale: 1, y: 0,
          duration: 0.38,
          stagger: { each: 0.045 },
          ease: 'back.out(1.7)',
        }, '-=0.4')
        .to('.photo-frame', {
          opacity: 1, x: 0, filter: 'blur(0px)',
          duration: 1.2, ease: 'power3.out'
        }, '-=1.3')
        .to('.stat-chip', {
          opacity: 1, scale: 1,
          duration: 0.5, stagger: 0.2, ease: 'back.out(2)'
        }, '-=0.5')
        .to('.scroll-hint', {
          opacity: 1, y: 0, duration: 0.7
        }, '-=0.2')
      }

      // ── SCROLL PROGRESS BAR ONLY (no text movement) ──
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setScrollProgress(self.progress * 100),
      })

      // ── SCROLL HINT fades after first scroll ──
      ScrollTrigger.create({
        trigger: '.hero-wrapper',
        start: '5% top',
        onEnter: () => {
          gsap.to('.scroll-hint', { opacity: 0, y: 10, duration: 0.5 })
        },
        onLeaveBack: () => {
          gsap.to('.scroll-hint', { opacity: 1, y: 0, duration: 0.5 })
        },
      })

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        /* ── SCROLL PROGRESS ── */
        .scroll-progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, #818cf8, #67e8f9);
          z-index: 9999;
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(139,92,246,0.8);
        }

        /* ══════════════════ SPLASH SCREEN — fixed curtain, slides up ══════════════════ */
        .splash-wrapper {
          position: fixed;
          inset: 0;
          height: 100vh; height: 100dvh;
          z-index: 9998;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          background: radial-gradient(ellipse at 50% 30%, #120a24 0%, #08040f 62%, #050209 100%);
          will-change: transform;
          transition: transform 1.05s cubic-bezier(.76,0,.24,1);
        }
        .splash-wrapper.is-leaving {
          transform: translateY(-100%);
          pointer-events: none;
        }

        /* Drifting aurora glow */
        .splash-aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .aurora-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; animation: auroraDrift 13s ease-in-out infinite; }
        .aurora-blob.a1 { width: 440px; height: 440px; background: #7c3aed; top: -140px; left: -120px; }
        .aurora-blob.a2 { width: 380px; height: 380px; background: #67e8f9; bottom: -150px; right: -90px; animation-delay: -5s; opacity: 0.4; }
        .aurora-blob.a3 { width: 320px; height: 320px; background: #818cf8; top: 45%; left: 62%; animation-delay: -8.5s; opacity: 0.35; }
        @keyframes auroraDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(34px, -24px) scale(1.16); }
        }

        /* Ambient particles */
        .splash-particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
        .splash-particle {
          position: absolute; border-radius: 50%; background: #e9e2ff;
          animation: splashTwinkle var(--dur) ease-in-out infinite alternate var(--delay);
        }
        @keyframes splashTwinkle {
          from { opacity: var(--op); transform: scale(1); }
          to   { opacity: calc(var(--op) * 0.15); transform: scale(0.45); }
        }

        /* Diagonal light sweep */
        .splash-sheen {
          position: absolute; top: 0; left: -60%; width: 40%; height: 100%; z-index: 2;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: skewX(-20deg);
          animation: splashSheenMove 5.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes splashSheenMove { 0% { left: -60%; } 50% { left: 130%; } 100% { left: 130%; } }

        /* Frame corners — echoes the hero photo's corner-bracket motif */
        .splash-frame-corner { position: absolute; width: 52px; height: 52px; z-index: 3; opacity: 0.55; pointer-events: none; }
        .splash-frame-corner.tl {
          top: 30px; left: 30px;
          border-top: 1.5px solid rgba(167,139,250,0.55);
          border-left: 1.5px solid rgba(167,139,250,0.55);
          border-radius: 16px 0 0 0;
        }
        .splash-frame-corner.br {
          bottom: 30px; right: 30px;
          border-bottom: 1.5px solid rgba(103,232,249,0.45);
          border-right: 1.5px solid rgba(103,232,249,0.45);
          border-radius: 0 0 16px 0;
        }

        .splash-inner {
          position: relative; z-index: 4;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          animation: splashIn 0.9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes splashIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

        .splash-photo-wrap { position: relative; margin-bottom: 28px; }
        .splash-halo {
          position: absolute; inset: -34px; border-radius: 50%; z-index: 0;
          background: radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(99,102,241,0.2) 55%, transparent 76%);
          filter: blur(26px);
          animation: haloBreathe 4s ease-in-out infinite;
        }
        @keyframes haloBreathe {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .splash-ring {
          position: relative; z-index: 1; width: 148px; height: 148px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .splash-ring::before {
          content: ''; position: absolute; inset: -6px; border-radius: 50%;
          background: conic-gradient(from 0deg, #7c3aed, #818cf8, #67e8f9, #a78bfa, #7c3aed);
          animation: splashSpin 3.2s linear infinite;
          box-shadow: 0 0 24px rgba(124,58,237,0.55);
        }
        .splash-ring::after {
          content: ''; position: absolute; inset: 3px; border-radius: 50%;
          background: #0a0616;
        }
        @keyframes splashSpin { to { transform: rotate(360deg); } }

        .splash-photo {
          position: relative; z-index: 2; width: 134px; height: 134px; border-radius: 50%;
          object-fit: cover; object-position: top center;
          box-shadow: 0 20px 56px rgba(0,0,0,0.6), 0 0 44px rgba(124,58,237,0.4);
        }
        .splash-photo-fallback {
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(140deg, rgba(124,58,237,0.32), rgba(103,232,249,0.2));
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 2.4rem; color: #fff;
        }

        .splash-role {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.38);
          border-radius: 999px; padding: 5px 14px;
          margin-bottom: 16px;
          box-shadow: 0 0 20px rgba(139,92,246,0.16), inset 0 1px 0 rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
        }
        .splash-role-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #a78bfa; box-shadow: 0 0 8px #a78bfa;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
        .splash-role-text {
          font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em;
          color: #c4b5fd; text-transform: uppercase;
        }

        .splash-name {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.02em; line-height: 1.08;
          margin: 0 0 30px;
          background: linear-gradient(100deg, #a78bfa 0%, #ffffff 14%, #818cf8 28%, #67e8f9 50%, #a78bfa 72%, #818cf8 100%);
          background-size: 220% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 22px rgba(139,92,246,0.35));
          animation: splashNameShine 4.5s linear infinite;
        }
        @keyframes splashNameShine { to { background-position: -220% 0; } }

        .splash-progress-row {
          width: 220px; display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 9px;
        }
        .splash-progress-label {
          font-family: 'DM Mono', monospace; font-size: 8.5px; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(196,181,253,0.45);
        }
        .splash-progress-pct {
          font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.06em;
          color: #a78bfa; font-weight: 500;
        }
        .splash-progress-wrap {
          position: relative;
          width: 220px; height: 2px; border-radius: 2px; overflow: visible;
          background: rgba(139,92,246,0.15); margin-bottom: 20px;
        }
        .splash-progress-fill {
          position: relative;
          height: 100%; width: 0%; border-radius: 2px;
          background: linear-gradient(90deg, #7c3aed, #818cf8, #67e8f9);
          box-shadow: 0 0 8px rgba(139,92,246,0.8);
        }
        .splash-progress-fill::after {
          content: ''; position: absolute; right: -2px; top: 50%; transform: translateY(-50%);
          width: 7px; height: 7px; border-radius: 50%;
          background: #d8f4ff;
          box-shadow: 0 0 12px 4px rgba(103,232,249,0.85);
        }

        .splash-skip {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'DM Mono', monospace; font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(167,139,250,0.5);
          transition: color 0.3s ease;
        }
        .splash-wrapper:hover .splash-skip { color: rgba(196,181,253,0.85); }
        .splash-skip svg { animation: splashBounce 1.6s ease-in-out infinite; color: rgba(99,102,241,0.6); }
        @keyframes splashBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }

        @media (max-width: 480px) {
          .splash-ring { width: 120px; height: 120px; }
          .splash-photo { width: 108px; height: 108px; }
          .aurora-blob { filter: blur(60px); }
        }

        /* ── HERO ── */
        .hero-wrapper {
          height: 100vh;
          min-height: 100vh;
          max-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 84px 5vw 28px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
          position: relative;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 40px;
          max-width: 1180px;
          width: 100%;
          align-items: center;
        }

        /* ── LEFT ── */
        .left-panel { display: flex; flex-direction: column; gap: 16px; }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 999px;
          padding: 5px 14px;
          width: fit-content;
          backdrop-filter: blur(8px);
        }

        .role-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #a78bfa; box-shadow: 0 0 8px #a78bfa;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        .role-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.18em;
          color: #c4b5fd; text-transform: uppercase;
        }

        /* ── HEADLINE ── */
        .hero-headline { line-height: 1.04; perspective: 900px; }

        .line-white {
          display: block;
          font-size: clamp(30px, 3.6vw, 46px);
          font-weight: 800; color: #ffffff;
          letter-spacing: -0.02em;
          font-family: 'Syne', sans-serif;
        }

        .line-gradient {
          display: block;
          font-size: clamp(30px, 3.6vw, 46px);
          font-weight: 800; letter-spacing: -0.02em;
          font-family: 'Syne', sans-serif;
        }

        /* Per-letter gradient trick */
        .line-gradient .split-char {
          background: linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #67e8f9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .split-char {
          transform-origin: bottom center;
          will-change: transform, opacity, filter;
        }

        /* ── DESCRIPTION PANEL ──
           Solid frosted glass so the animated background tech icons
           never show through behind the paragraph text. */
        .hero-desc-panel {
          position: relative;
          background: rgba(8, 4, 16, 0.97);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 14px 18px;
          max-width: 480px;
          backdrop-filter: blur(22px) saturate(140%);
          -webkit-backdrop-filter: blur(22px) saturate(140%);
          box-shadow: 0 4px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .hero-desc {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px; line-height: 1.65;
          color: rgba(203, 213, 225, 0.82);
          font-weight: 300;
          margin: 0;
        }

        /* ── GLASS EXPERTISE ──
           Darker + stronger blur so background icons are fully hidden. */
        .glass-expertise {
          background: rgba(8, 4, 16, 0.97);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px; padding: 16px 20px;
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          box-shadow: 0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .expertise-title {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px; letter-spacing: 0.2em;
          color: #a78bfa; text-transform: uppercase;
          margin-bottom: 10px; margin-top: 0;
        }

        .expertise-grid { display: flex; flex-wrap: wrap; gap: 7px; }

        .expertise-tag {
          font-family: 'DM Mono', monospace;
          font-size: 10px; font-weight: 300; color: #c4b5fd;
          background: rgba(139,92,246,0.14);
          border: 1px solid rgba(139,92,246,0.28);
          border-radius: 999px; padding: 4px 11px;
          white-space: nowrap;
          transition: background 0.25s, border-color 0.25s, color 0.25s;
          cursor: default;
        }

        .expertise-tag:hover {
          background: rgba(139,92,246,0.24);
          border-color: rgba(167,139,250,0.55);
          color: #e9d5ff;
        }

        /* ── RIGHT PANEL ── */
        .right-panel {
          display: flex; justify-content: center;
          align-items: center; position: relative;
        }

        .photo-frame {
          position: relative;
          width: clamp(200px, 21vw, 300px);
          aspect-ratio: 3/4;
        }

        .photo-frame::before {
          content: ''; position: absolute; inset: -20px; border-radius: 32px;
          background: radial-gradient(ellipse at center,
            rgba(124,58,237,0.38) 0%, rgba(99,102,241,0.15) 55%, transparent 80%);
          filter: blur(24px); z-index: 0;
          animation: halo-breathe 4s ease-in-out infinite;
        }

        @keyframes halo-breathe {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        .photo-frame::after {
          content: ''; position: absolute;
          top: -2px; right: -2px; width: 56px; height: 56px;
          border-top: 2px solid rgba(167,139,250,0.7);
          border-right: 2px solid rgba(167,139,250,0.7);
          border-radius: 0 20px 0 0; z-index: 3;
        }

        .photo-glass-card {
          position: relative; z-index: 2;
          width: 100%; height: 100%; border-radius: 28px; overflow: hidden;
          background: rgba(8, 4, 16, 0.97);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 48px rgba(0,0,0,0.5),
            0 0 0 1px rgba(139,92,246,0.12),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .photo-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top center; display: block;
          transition: transform 0.6s ease;
        }

        .photo-glass-card:hover .photo-img { transform: scale(1.04); }

        .photo-sheen {
          position: absolute; inset: 0;
          background: linear-gradient(160deg,
            rgba(255,255,255,0.06) 0%, transparent 40%, rgba(124,58,237,0.08) 100%);
          pointer-events: none; z-index: 1;
        }

        .corner-bl {
          position: absolute; bottom: -2px; left: -2px;
          width: 44px; height: 44px;
          border-bottom: 2px solid rgba(99,102,241,0.5);
          border-left: 2px solid rgba(99,102,241,0.5);
          border-radius: 0 0 0 20px; z-index: 3;
        }

        .stat-chip {
          position: absolute; display: flex; flex-direction: column;
          align-items: center; background: rgba(8, 4, 16, 0.97);
          border: 1px solid rgba(167,139,250,0.25);
          border-radius: 14px; padding: 8px 14px;
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4); z-index: 4;
        }

        .chip-top-right {
          top: 16px; right: -36px;
          animation: float-chip 3.5s ease-in-out infinite;
        }

        .chip-bottom-left {
          bottom: 22px; left: -40px;
          animation: float-chip 3.5s ease-in-out 1.8s infinite;
        }

        @keyframes float-chip {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .chip-number {
          font-family: 'Syne', sans-serif;
          font-size: 17px; font-weight: 800; color: #a78bfa; line-height: 1;
        }

        .chip-label {
          font-family: 'DM Mono', monospace; font-size: 8px;
          letter-spacing: 0.12em; color: rgba(203,213,225,0.6);
          text-transform: uppercase; margin-top: 3px; white-space: nowrap;
        }

        /* ── SCROLL HINT ── */
        .scroll-hint {
          position: absolute; bottom: 18px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          z-index: 20; pointer-events: none;
        }

        .hand-wrap {
          position: relative; display: flex;
          align-items: center; justify-content: center;
          width: 40px; height: 52px;
        }

        .hand-svg {
          width: 28px; color: rgba(167,139,250,0.7);
          animation: hand-bob 2.2s ease-in-out infinite;
          filter: drop-shadow(0 0 6px rgba(139,92,246,0.4));
        }

        .hand-arrow {
          position: absolute; bottom: -4px; left: 50%;
          transform: translateX(-50%); width: 11px;
          color: rgba(99,102,241,0.6);
          animation: arrow-pulse 2.2s ease-in-out infinite;
        }

        @keyframes hand-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }

        @keyframes arrow-pulse {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
          50% { opacity: 1; transform: translateX(-50%) translateY(4px); }
        }

        .hint-label {
          font-family: 'DM Mono', monospace; font-size: 8px;
          letter-spacing: 0.25em; color: rgba(167,139,250,0.5);
          text-transform: uppercase;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .hero-wrapper { height: auto; min-height: 100vh; max-height: none; overflow: visible; }
          .hero-grid { grid-template-columns: 1fr; }
          .right-panel { order: -1; }
          .photo-frame { width: 180px; aspect-ratio: 1/1; }
          .chip-top-right { right: -24px; }
          .chip-bottom-left { left: -28px; }
          .scroll-hint { bottom: 14px; }
        }
      `}</style>

      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Splash — shows first, then automatically hands off to the hero below */}
      {showSplash && <SplashScreen onDone={enterHero} />}

      <section
        className="hero-wrapper"
        ref={wrapperRef}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="hero-grid">

          {/* LEFT */}
          <div className="left-panel">
            <div className="role-badge">
              <span className="role-dot" />
              <span className="role-text">UI / UX Designer</span>
            </div>

            <div className="hero-headline">
              <SplitText text="I'm Pritish" className="line-white" />
              <SplitText text="Kumar" className="line-gradient" />
            </div>

            <div className="hero-desc-panel">
              <p className="hero-desc">
                Focused on crafting intuitive, visually engaging, and user-centered
                digital experiences. Passionate about transforming ideas into clean,
                functional, and impactful designs that enhance usability and
                strengthen brand identity — across web and mobile platforms.
                Dedicated to continuous learning, creative problem-solving, and
                contributing to innovative design-driven teams.
              </p>
            </div>

            <div className="glass-expertise">
              <p className="expertise-title">Core Expertise</p>
              <div className="expertise-grid">
                {expertise.map((item) => (
                  <span key={item} className="expertise-tag">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            <div className="photo-frame">
              <div className="photo-glass-card">
                <img src="/profile.webp" alt="Kumar Pritish" className="photo-img" />
                <div className="photo-sheen" />
              </div>
              <div className="corner-bl" />
              <div className="stat-chip chip-top-right">
                <span className="chip-number">2.5+</span>
                <span className="chip-label">Yrs Exp</span>
              </div>
              <div className="stat-chip chip-bottom-left">
                <span className="chip-number">42+</span>
                <span className="chip-label">Projects</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hand scroll indicator */}
        <ScrollHint />

      </section>
    </>
  )
}