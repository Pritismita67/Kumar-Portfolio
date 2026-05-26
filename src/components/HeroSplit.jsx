'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function HeroSplit() {
  const wrapperRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── SET INITIAL HIDDEN STATE (before animation) ──
      gsap.set('.line-white .split-char', { opacity: 0, y: 70, rotateX: -80, filter: 'blur(6px)' })
      gsap.set('.line-gradient .split-char', { opacity: 0, y: 90, rotateX: -80, filter: 'blur(8px)' })
      gsap.set('.role-badge', { opacity: 0, y: 24, filter: 'blur(8px)' })
      gsap.set('.hero-desc', { opacity: 0, y: 28, filter: 'blur(4px)' })
      gsap.set('.glass-expertise', { opacity: 0, y: 36 })
      gsap.set('.expertise-tag', { opacity: 0, scale: 0.82, y: 10 })
      gsap.set('.photo-frame', { opacity: 0, x: 70, filter: 'blur(14px)' })
      gsap.set('.stat-chip', { opacity: 0, scale: 0.55 })
      gsap.set('.scroll-hint', { opacity: 0, y: 16 })

      // ── ENTRANCE TIMELINE — everything lands and STAYS ──
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to('.role-badge', {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9
      })
      // "Hi, I'm Pritish" — letters flip up one by one and STAY
      .to('.line-white .split-char', {
        opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
        duration: 0.75,
        stagger: { each: 0.028, from: 'start' },
      }, '-=0.5')
      // "Kumar" — deeper flip, slightly slower stagger, STAYS
      .to('.line-gradient .split-char', {
        opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
        duration: 0.85,
        stagger: { each: 0.04, from: 'start' },
      }, '-=0.55')
      .to('.hero-desc', {
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

        /* ── HERO ── */
        .hero-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 5vw 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
          position: relative;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
          max-width: 1200px;
          width: 100%;
          align-items: center;
        }

        /* ── LEFT ── */
        .left-panel { display: flex; flex-direction: column; gap: 26px; }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 999px;
          padding: 6px 16px;
          width: fit-content;
          backdrop-filter: blur(8px);
        }

        .role-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #a78bfa; box-shadow: 0 0 8px #a78bfa;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }

        .role-text {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.18em;
          color: #c4b5fd; text-transform: uppercase;
        }

        /* ── HEADLINE ── */
        .hero-headline { line-height: 1.05; perspective: 900px; }

        .line-white {
          display: block;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 800; color: #ffffff;
          letter-spacing: -0.02em;
          font-family: 'Syne', sans-serif;
        }

        .line-gradient {
          display: block;
          font-size: clamp(42px, 5vw, 64px);
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

        /* ── DESCRIPTION ── */
        .hero-desc {
          font-family: 'DM Mono', monospace;
          font-size: 13px; line-height: 1.8;
          color: rgba(203, 213, 225, 0.72);
          max-width: 480px; font-weight: 300;
        }

        /* ── GLASS EXPERTISE ── */
        .glass-expertise {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px; padding: 22px 26px;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .expertise-title {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em;
          color: #7c3aed; text-transform: uppercase;
          margin-bottom: 14px; margin-top: 0;
        }

        .expertise-grid { display: flex; flex-wrap: wrap; gap: 8px; }

        .expertise-tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 300; color: #c4b5fd;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 999px; padding: 4px 13px;
          white-space: nowrap;
          transition: background 0.25s, border-color 0.25s, color 0.25s;
          cursor: default;
        }

        .expertise-tag:hover {
          background: rgba(139,92,246,0.22);
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
          width: clamp(240px, 26vw, 360px);
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
          top: -2px; right: -2px; width: 64px; height: 64px;
          border-top: 2px solid rgba(167,139,250,0.7);
          border-right: 2px solid rgba(167,139,250,0.7);
          border-radius: 0 20px 0 0; z-index: 3;
        }

        .photo-glass-card {
          position: relative; z-index: 2;
          width: 100%; height: 100%; border-radius: 28px; overflow: hidden;
          background: rgba(255,255,255,0.04);
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
          width: 50px; height: 50px;
          border-bottom: 2px solid rgba(99,102,241,0.5);
          border-left: 2px solid rgba(99,102,241,0.5);
          border-radius: 0 0 0 20px; z-index: 3;
        }

        .stat-chip {
          position: absolute; display: flex; flex-direction: column;
          align-items: center; background: rgba(15,10,30,0.72);
          border: 1px solid rgba(167,139,250,0.25);
          border-radius: 14px; padding: 10px 16px;
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4); z-index: 4;
        }

        .chip-top-right {
          top: 22px; right: -44px;
          animation: float-chip 3.5s ease-in-out infinite;
        }

        .chip-bottom-left {
          bottom: 30px; left: -48px;
          animation: float-chip 3.5s ease-in-out 1.8s infinite;
        }

        @keyframes float-chip {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .chip-number {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 800; color: #a78bfa; line-height: 1;
        }

        .chip-label {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.12em; color: rgba(203,213,225,0.6);
          text-transform: uppercase; margin-top: 3px; white-space: nowrap;
        }

        /* ── SCROLL HINT ── */
        .scroll-hint {
          position: absolute; bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          z-index: 20; pointer-events: none;
        }

        .hand-wrap {
          position: relative; display: flex;
          align-items: center; justify-content: center;
          width: 44px; height: 60px;
        }

        .hand-svg {
          width: 32px; color: rgba(167,139,250,0.7);
          animation: hand-bob 2.2s ease-in-out infinite;
          filter: drop-shadow(0 0 6px rgba(139,92,246,0.4));
        }

        .hand-arrow {
          position: absolute; bottom: -4px; left: 50%;
          transform: translateX(-50%); width: 12px;
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
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.25em; color: rgba(167,139,250,0.5);
          text-transform: uppercase;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr; }
          .right-panel { order: -1; }
          .photo-frame { width: 200px; aspect-ratio: 1/1; }
          .chip-top-right { right: -28px; }
          .chip-bottom-left { left: -32px; }
          .scroll-hint { bottom: 20px; }
        }
      `}</style>

      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

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

            <p className="hero-desc">
              Focused on crafting intuitive, visually engaging, and user-centered
              digital experiences. Passionate about transforming ideas into clean,
              functional, and impactful designs that enhance usability and
              strengthen brand identity — across web and mobile platforms.
              Dedicated to continuous learning, creative problem-solving, and
              contributing to innovative design-driven teams.
            </p>

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
                <span className="chip-number">4+</span>
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