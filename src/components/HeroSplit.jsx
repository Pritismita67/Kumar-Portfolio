'use client'

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

export default function HeroSplit() {
  return (
    <>
      <style>{`
        /* ── HERO SPLIT LAYOUT ── */
        .hero-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 5vw 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
          max-width: 1200px;
          width: 100%;
          align-items: center;
        }

        /* ── LEFT PANEL ── */
        .left-panel {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

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
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 8px #a78bfa;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }

        .role-text {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #c4b5fd;
          text-transform: uppercase;
        }

        .hero-headline { line-height: 1.05; }

        .headline-white {
          display: block;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          font-family: 'Syne', sans-serif;
        }

        .headline-gradient {
          display: block;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 800;
          letter-spacing: -0.02em;
          font-family: 'Syne', sans-serif;
          background: linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #67e8f9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          line-height: 1.8;
          color: rgba(203, 213, 225, 0.72);
          max-width: 480px;
          font-weight: 300;
        }

        .glass-expertise {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 20px;
          padding: 22px 26px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .expertise-title {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #7c3aed;
          text-transform: uppercase;
          margin-bottom: 14px;
          margin-top: 0;
        }

        .expertise-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .expertise-tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 300;
          color: #c4b5fd;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 999px;
          padding: 4px 13px;
          white-space: nowrap;
          transition: background 0.25s, border-color 0.25s, color 0.25s;
          cursor: default;
        }

        .expertise-tag:hover {
          background: rgba(139, 92, 246, 0.22);
          border-color: rgba(167, 139, 250, 0.55);
          color: #e9d5ff;
        }

        /* ── RIGHT PANEL ── */
        .right-panel {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .photo-frame {
          position: relative;
          width: clamp(240px, 26vw, 360px);
          aspect-ratio: 3/4;
        }

        .photo-frame::before {
          content: '';
          position: absolute;
          inset: -20px;
          border-radius: 32px;
          background: radial-gradient(ellipse at center,
            rgba(124,58,237,0.38) 0%,
            rgba(99,102,241,0.15) 55%,
            transparent 80%);
          filter: blur(24px);
          z-index: 0;
          animation: halo-breathe 4s ease-in-out infinite;
        }

        @keyframes halo-breathe {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }

        .photo-frame::after {
          content: '';
          position: absolute;
          top: -2px;
          right: -2px;
          width: 64px;
          height: 64px;
          border-top: 2px solid rgba(167,139,250,0.7);
          border-right: 2px solid rgba(167,139,250,0.7);
          border-radius: 0 20px 0 0;
          z-index: 3;
        }

        .photo-glass-card {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 8px 48px rgba(0,0,0,0.5),
            0 0 0 1px rgba(139,92,246,0.12),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.6s ease;
        }

        .photo-glass-card:hover .photo-img { transform: scale(1.04); }

        .photo-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(255,255,255,0.06) 0%,
            transparent 40%,
            rgba(124,58,237,0.08) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .corner-bl {
          position: absolute;
          bottom: -2px;
          left: -2px;
          width: 50px;
          height: 50px;
          border-bottom: 2px solid rgba(99,102,241,0.5);
          border-left: 2px solid rgba(99,102,241,0.5);
          border-radius: 0 0 0 20px;
          z-index: 3;
        }

        .stat-chip {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(15,10,30,0.72);
          border: 1px solid rgba(167,139,250,0.25);
          border-radius: 14px;
          padding: 10px 16px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          z-index: 4;
        }

        .chip-top-right {
          top: 22px;
          right: -44px;
          animation: float-chip 3.5s ease-in-out infinite;
        }

        .chip-bottom-left {
          bottom: 30px;
          left: -48px;
          animation: float-chip 3.5s ease-in-out 1.8s infinite;
        }

        @keyframes float-chip {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }

        .chip-number {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #a78bfa;
          line-height: 1;
        }

        .chip-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: rgba(203,213,225,0.6);
          text-transform: uppercase;
          margin-top: 3px;
          white-space: nowrap;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr; }
          .right-panel { order: -1; }
          .photo-frame { width: 200px; aspect-ratio: 1/1; }
          .chip-top-right  { right: -28px; }
          .chip-bottom-left { left: -32px; }
        }
      `}</style>

      <section className="hero-wrapper" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-grid">

          {/* LEFT: Text Content */}
          <div className="left-panel">
            <div className="role-badge">
              <span className="role-dot" />
              <span className="role-text">UI / UX Designer</span>
            </div>

            <div className="hero-headline">
              <span className="headline-white">Pritish</span>
              <span className="headline-gradient">Kumar</span>
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

          {/* RIGHT: Photo */}
          <div className="right-panel">
            <div className="photo-frame">
              <div className="photo-glass-card">
                <img
                  src="/profile.webp"
                  alt="Kumar Pritish"
                  className="photo-img"
                />
                <div className="photo-sheen" />
              </div>

              <div className="corner-bl" />

              <div className="stat-chip chip-top-right">
                <span className="chip-number">4+</span>
                <span className="chip-label">Yrs Exp</span>
              </div>

              <div className="stat-chip chip-bottom-left">
                <span className="chip-number">50+</span>
                <span className="chip-label">Projects</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}