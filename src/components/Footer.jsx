'use client'

/* ── Update these with your real links & email ── */
const SOCIAL = {
  whatsapp: 'https://wa.me/917683912451',
  instagram: 'https://instagram.com/pritish8517',
  linkedin:  'https://www.linkedin.com/in/pritish-kumar-sahoo-69754a311/',
  email:     'pritishsahoo25@gmail.com',
}

/* ── SVG Icons ── */
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.486a.5.5 0 0 0 .609.61l5.718-1.498A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.524-5.184-1.437l-.372-.22-3.843 1.006 1.028-3.758-.24-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@300;400&display=swap');

        /* ── Section ── */
        .ft-section {
          position: relative;
          width: 100%;
          background: transparent;
          overflow: hidden;
          padding: 0 0 0;
          box-sizing: border-box;
        }

        /* Top divider line */
        .ft-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(139,92,246,0.35) 30%,
            rgba(167,139,250,0.5) 50%,
            rgba(139,92,246,0.35) 70%,
            transparent 100%
          );
          margin-bottom: 0;
        }

        /* Main footer glass card */
        .ft-glass {
          margin: 48px 5vw 40px;
          border-radius: 28px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 4px 40px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.07);
          overflow: hidden;
          position: relative;
        }

        /* Top shimmer */
        .ft-glass::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(167,139,250,0.5),
            transparent
          );
        }

        /* Subtle glow behind card */
        .ft-glass::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 200px;
          background: radial-gradient(
            ellipse at center,
            rgba(139,92,246,0.06) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .ft-inner {
          position: relative;
          z-index: 1;
          padding: 48px 48px 40px;
        }

        /* ── Top row: brand + social ── */
        .ft-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 36px;
          margin-bottom: 40px;
        }

        /* Brand */
        .ft-brand {}

        .ft-logo {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
          line-height: 1;
        }

        .ft-logo-white { color: #f0eaff; }
        .ft-logo-purple {
          background: linear-gradient(135deg, #a78bfa, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ft-tagline {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 300;
          color: rgba(203,213,225,0.4);
          letter-spacing: 0.1em;
          margin: 0;
        }

        /* ── Social icons ── */
        .ft-socials {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ft-social-btn {
          width: 44px;
          height: 44px;
          border-radius: 13px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(203,213,225,0.6);
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
        }

        .ft-social-btn:hover {
          background: rgba(139,92,246,0.18);
          border-color: rgba(167,139,250,0.45);
          color: #e2d9ff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(139,92,246,0.25);
        }

        /* WhatsApp green on hover */
        .ft-social-btn.ft-wa:hover  { background: rgba(37,211,102,0.15); border-color: rgba(37,211,102,0.4); color: #4ade80; box-shadow: 0 8px 20px rgba(37,211,102,0.2); }
        /* Instagram pink on hover */
        .ft-social-btn.ft-ig:hover  { background: rgba(228,64,95,0.15);  border-color: rgba(228,64,95,0.4);  color: #f472b6; box-shadow: 0 8px 20px rgba(228,64,95,0.2); }
        /* LinkedIn blue on hover */
        .ft-social-btn.ft-li:hover  { background: rgba(10,102,194,0.15); border-color: rgba(10,102,194,0.4); color: #60a5fa; box-shadow: 0 8px 20px rgba(10,102,194,0.2); }

        /* ── Email row ── */
        .ft-email-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 22px;
          background: rgba(139,92,246,0.07);
          border: 1px solid rgba(139,92,246,0.18);
          border-radius: 14px;
          width: fit-content;
          margin-bottom: 36px;
          transition: background 0.25s, border-color 0.25s;
          text-decoration: none;
        }

        .ft-email-row:hover {
          background: rgba(139,92,246,0.14);
          border-color: rgba(167,139,250,0.38);
        }

        .ft-email-icon {
          color: #a78bfa;
          display: flex;
          align-items: center;
        }

        .ft-email-text {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 400;
          color: #c4b5fd;
          letter-spacing: 0.04em;
        }

        /* ── Nav links ── */
        .ft-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 24px;
          margin-bottom: 36px;
        }

        .ft-nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 300;
          color: rgba(203,213,225,0.45);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s;
        }

        .ft-nav-link:hover { color: #c4b5fd; }

        /* ── Bottom row ── */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .ft-copy {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 300;
          color: rgba(203,213,225,0.28);
          letter-spacing: 0.08em;
        }

        .ft-copy span { color: rgba(167,139,250,0.55); }

        .ft-made {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 300;
          color: rgba(203,213,225,0.25);
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ft-heart {
          color: #f472b6;
          font-size: 12px;
          animation: ft-heartbeat 1.6s ease-in-out infinite;
        }

        @keyframes ft-heartbeat {
          0%,100% { transform: scale(1); }
          30%      { transform: scale(1.3); }
          60%      { transform: scale(0.95); }
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ft-inner { padding: 36px 24px 32px; }
          .ft-top   { flex-direction: column; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="ft-section">
        <div className="ft-divider" />

        <div className="ft-glass">
          <div className="ft-inner">

            {/* ── Top: brand + social icons ── */}
            <div className="ft-top">
              <div className="ft-brand">
                <h2 className="ft-logo">
                  <span className="ft-logo-white">Pritish </span>
                  <span className="ft-logo-purple">Kumar</span>
                </h2>
                <p className="ft-tagline">UI / UX Designer </p>
              </div>

              <div className="ft-socials">
                <a
                  href={SOCIAL.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-btn ft-wa"
                  title="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-btn ft-ig"
                  title="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-btn ft-li"
                  title="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            {/* ── Email ── */}
            <a href={`mailto:${SOCIAL.email}`} className="ft-email-row">
              <span className="ft-email-icon"><EmailIcon /></span>
              <span className="ft-email-text">{SOCIAL.email}</span>
            </a>

            {/* ── Nav links ── */}
            {/* ── Nav links ── */}
<nav className="ft-nav">
  {[
    { label: 'Home',                       href: '/' },
    { label: 'Projects',                   href: '/projects' },
    { label: 'Achievements & Recognition', href: '/Achievement' },
    { label: 'Contact',                    href: '/contact' },
  ].map(({ label, href }) => (
    <a key={label} href={href} className="ft-nav-link">
      {label}
    </a>
  ))}
</nav>

            {/* ── Bottom bar ── */}
            <div className="ft-bottom">
              <p className="ft-copy">
                © {year} <span>Kumar Pritish</span>. All rights reserved.
              </p>
              <p className="ft-made">
                Made with <span className="ft-heart">♥</span> &amp; lots of coffee.
              </p>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}