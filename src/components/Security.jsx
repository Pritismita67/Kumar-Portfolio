'use client'

import { useEffect, useRef, useState } from 'react'

const TOKEN_POOL = [
  '8dKa82','HDs','1fKa12jf','aFdzxz','8df1uSs','1FQ2+x48j','aG5Ksz',
  'fdSD2fu1','5KX+aovKsFsJ','45xj2Kf','fdSD2fauOQJX2','B2gsa33Xsfh',
  'FiM5dhX4v7h','5Xw72W','B2gsa33Xcf','LKfxBl4g55Mreh','6x19qwRnrW',
  'vG3gVs3e2Fd','PU1XxgDsclay','E1pUrhA1g2rB','Jp4xsMgddz0KdaW',
  'fYD0vcs2ReJNn','QaX7ztGvkW5J','fYD0vcs2ReIN','qyrOzu0f12TiOnu',
  'DiQ9e+pupwKYw','wufZ3Kaf5oSRYU','qalBbVlbQsvT8kazf',
  'GzotAtTaxfcFxQss','WlpBkdf2sdvRBaJ','iUOZJ218sAaT4YNq',
  '65aFHq2AbSQcbefoN','wVWKqJfUiStEh','1X4NuAhKeVvMqsLvc',
  '8VeByS1KdmqHCqTF','zYQOUz7DzHNsOLg','FgyU0w2MrPiLZOQ',
  'qeIiAyo+w2mQFZHF','RGDlary','fu0js3OF3','NtA0fYWPvbCB6KVqr',
  'WlpBkdf2vRBaJ6','iUOZJ218sAaT4YNqIPxk',
  'qalBbVlbQsvT8kazvmE2yr','Gzot4tTaxfcFxQ6se','B7qyrOzu0f12TiOnu',
]

/* ── Seeded deterministic RNG — identical on server & client ── */
function seededRng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function buildRows() {
  const rand = seededRng(42)
  return Array.from({ length: 22 }, (_, i) => {
    const tokens = Array.from({ length: 40 }, () =>
      TOKEN_POOL[Math.floor(rand() * TOKEN_POOL.length)]
    )
    return {
      id:      i,
      tokens,
      top:     `${(i / 22) * 100}%`,
      dir:     i % 2 === 0 ? 'scroll-ltr' : 'scroll-rtl',
      dur:     `${10 + Math.floor(rand() * 14)}s`,
      opacity: parseFloat((0.12 + rand() * 0.18).toFixed(3)),
    }
  })
}

/* Built once at module level — same result server + client */
const ROWS = buildRows()

export default function Security() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  /* ── Canvas: white-breath rings spreading from center ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, t = 0

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2

      const breathe = (Math.sin(t * 0.014) + 1) / 2   // 0..1 slow cycle

      /* 1. White core breath */
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130 + breathe * 90)
      core.addColorStop(0,   `rgba(255,255,255,${0.055 + breathe * 0.065})`)
      core.addColorStop(0.45,`rgba(220,210,255,${0.025 + breathe * 0.025})`)
      core.addColorStop(1,    'rgba(180,160,255,0)')
      ctx.fillStyle = core
      ctx.fillRect(0, 0, W, H)

      /* 2. Wider violet bloom */
      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, 230 + breathe * 130)
      bloom.addColorStop(0,   `rgba(150,110,255,${0.07 + breathe * 0.05})`)
      bloom.addColorStop(0.5, `rgba(110, 70,220,${0.025})`)
      bloom.addColorStop(1,    'rgba(70, 40,180,0)')
      ctx.fillStyle = bloom
      ctx.fillRect(0, 0, W, H)

      /* 3. Travelling white ring #1 */
      const p1 = (t * 0.005) % 1
      const r1 = p1 * Math.max(W, H) * 0.6
      const a1 = (1 - p1) * 0.14
      const rg1 = ctx.createRadialGradient(cx, cy, r1 * 0.83, cx, cy, r1)
      rg1.addColorStop(0,   'rgba(255,255,255,0)')
      rg1.addColorStop(0.65,`rgba(240,230,255,${a1})`)
      rg1.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.fillStyle = rg1
      ctx.fillRect(0, 0, W, H)

      /* 4. Travelling white ring #2 — offset by 0.5 */
      const p2 = ((t * 0.005) + 0.5) % 1
      const r2 = p2 * Math.max(W, H) * 0.6
      const a2 = (1 - p2) * 0.10
      const rg2 = ctx.createRadialGradient(cx, cy, r2 * 0.83, cx, cy, r2)
      rg2.addColorStop(0,   'rgba(255,255,255,0)')
      rg2.addColorStop(0.65,`rgba(200,185,255,${a2})`)
      rg2.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.fillStyle = rg2
      ctx.fillRect(0, 0, W, H)

      /* No vignette — keep canvas fully transparent so SceneBackground starfield shows through */

      t++
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400&display=swap');

        .sec-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: transparent !important;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Canvas — blend mode screen: adds light on stars without covering them */
        .sec-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        /* ── Text rows ── */
        .sec-text-field {
          position: absolute;
          inset: 0;
          z-index: 2;
          overflow: hidden;
          pointer-events: none;
        }

        .sec-row {
          position: absolute;
          left: 0;
          white-space: nowrap;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.07em;
          color: rgba(180,160,255,0.9);
        }

        .sec-row b {
          color: rgba(245,235,255,1);
          font-weight: 400;
        }

        @keyframes scroll-ltr {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%);   }
        }
        @keyframes scroll-rtl {
          from { transform: translateX(0%);   }
          to   { transform: translateX(-50%); }
        }

        /* Fade text at edges only — fully transparent center, very subtle fade at far edges */
        .sec-text-mask {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: radial-gradient(
            ellipse 55% 55% at 50% 50%,
            rgba(2,1,10,0)   0%,
            rgba(2,1,10,0)  40%,
            rgba(2,1,10,0.4) 70%,
            rgba(2,1,10,0.7) 100%
          );
        }

        /* ── Center card ── */
        .sec-center {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sec-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 4vw, 50px);
          font-weight: 800;
          color: #f0eaff;
          letter-spacing: -0.02em;
          margin: 0 0 52px 0;
          text-align: center;
        }

        .sec-title span { color: #a78bfa; }

        /* Lock wrapper */
        .lock-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Glassmorphism breath halo */
        .lock-halo {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.08) 0%,
            rgba(180,140,255,0.1) 45%,
            transparent 75%
          );
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: halo-pulse 3s ease-in-out infinite;
          z-index: 0;
        }

        @keyframes halo-pulse {
          0%,100% { transform: scale(1);    opacity: 0.65; }
          50%      { transform: scale(1.24); opacity: 1;    }
        }

        /* Orbiting ring with glowing white dot */
        .lock-ring {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 0 14px rgba(200,180,255,0.15);
          animation: ring-spin 7s linear infinite;
          z-index: 1;
        }

        .lock-ring::before {
          content: '';
          position: absolute;
          top: -4px;
          left: calc(50% - 4px);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 12px 4px rgba(220,200,255,0.85);
        }

        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Glassmorphism lock card */
        .lock-card {
          position: relative;
          z-index: 2;
          width: 100px;
          height: 100px;
          border-radius: 28px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
          box-shadow:
            0 0 0 1px rgba(180,150,255,0.12),
            0 0 44px rgba(139,92,246,0.28),
            0 8px 36px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lock-svg {
          width: 54px;
          height: 54px;
          filter: drop-shadow(0 0 16px rgba(230,210,255,0.95));
        }

        /* Label pill */
        .lock-label {
          margin-top: 18px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(220,210,255,0.6);
          text-transform: uppercase;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 5px 22px;
          backdrop-filter: blur(8px);
        }

        .sec-sub {
          margin-top: 44px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 300;
          color: rgba(203,213,225,0.36);
          letter-spacing: 0.06em;
          text-align: center;
          max-width: 440px;
          line-height: 1.9;
        }
      `}</style>

      <section className="sec-section">

        {/* Radial light canvas */}
        <canvas className="sec-canvas" ref={canvasRef} />

        {/* Text rows — client only to avoid hydration mismatch */}
        {mounted && (
          <div className="sec-text-field">
            {ROWS.map((row) => (
              <div
                key={row.id}
                className="sec-row"
                style={{
                  top:                     row.top,
                  opacity:                 row.opacity,
                  animationName:           row.dir,
                  animationDuration:       row.dur,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              >
                {row.tokens.map((tok, ti) =>
                  ti % 5 === 0
                    ? <b key={ti}>{tok}{'  '}</b>
                    : <span key={ti}>{tok}{'  '}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Edge fade mask */}
        <div className="sec-text-mask" />

        {/* Center content */}
        <div className="sec-center">
          <h2 className="sec-title">
            Performance &amp; <span>security.</span>
          </h2>

          <div className="lock-wrapper">
            <div className="lock-halo" />
            <div className="lock-ring" />

            <div className="lock-card">
              <svg className="lock-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 22V17a10 10 0 0 1 20 0v5"
                  stroke="url(#lg1)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <rect
                  x="10" y="22" width="32" height="22" rx="6"
                  fill="url(#lg2)" stroke="url(#lg1)" strokeWidth="1.5"
                />
                <circle cx="26" cy="33" r="4" fill="url(#lg1)" opacity="0.95" />
                <rect x="24.5" y="33" width="3" height="5" rx="1.5" fill="url(#lg1)" opacity="0.95" />
                <line x1="16" y1="29" x2="36" y2="29" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="16" y1="38" x2="36" y2="38" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <defs>
                  <linearGradient id="lg1" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#ffffff" />
                    <stop offset="40%"  stopColor="#c4b5fd" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                  <linearGradient id="lg2" x1="10" y1="22" x2="42" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="rgba(255,255,255,0.13)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0.07)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="lock-label">Encryption</div>

          <p className="sec-sub">
            Every interaction secured with end-to-end encryption.<br />
            Built for speed. Hardened for trust.
          </p>
        </div>

      </section>
    </>
  )
}