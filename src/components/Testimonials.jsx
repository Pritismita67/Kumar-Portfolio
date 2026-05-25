'use client'

const TESTIMONIALS = [
  {
    id: 1,
    company: 'NetWit',
    stars: 5,
    text: 'Pritish\'s innovative approach and attention to detail transformed our digital presence completely. The team delivered exceptional results that exceeded our expectations and boosted our user engagement significantly.',
  },
  {
    id: 2,
    company: 'Client Work24',
    stars: 5,
    text: 'Outstanding work quality and professional service. Pritish understood our requirements perfectly and delivered a solution that boosted our productivity and streamlined our workflow significantly.',
  },
  {
    id: 3,
    company: 'Grape Events Private Limited',
    stars: 5,
    text: 'The event management platform Pritish developed for us was flawless. Our clients love the user experience and it has streamlined our entire event planning process beautifully.',
  },
  {
    id: 4,
    company: 'Kiran Foundation',
    stars: 5,
    text: 'Pritish served as associate lead in the entire designing of a sleek chat app for the people working here. His leadership and design expertise delivered an exceptional communication platform.',
  },
  {
    id: 5,
    company: 'GigFloww',
    stars: 5,
    text: 'The workflow automation solution Pritish built has revolutionized how we handle our business processes. Incredible technical expertise and outstanding customer support throughout the project.',
  },
  {
    id: 6,
    company: 'Meru Technosoft Private Limited',
    stars: 5,
    text: 'Professional, reliable, and innovative. Pritish\'s technology solutions have significantly improved our operational efficiency and customer satisfaction rates across all departments.',
  },
  {
    id: 7,
    company: 'To-let Globe',
    stars: 5,
    text: 'Applauded for designing, wireframing & prototyping. Pritish delivered outstanding design solutions that perfectly captured our vision and enhanced our user experience significantly.',
  },
  {
    id: 8,
    company: 'CARESETU',
    stars: 5,
    text: 'Remarked for research in financial insights dashboard. Pritish\'s comprehensive research and analytical approach resulted in a powerful dashboard that transformed how we visualize financial data.',
  },
  {
    id: 9,
    company: 'PREVACARE',
    stars: 5,
    text: 'Recognized for developing an advanced financial insights dashboard. Pritish\'s in-depth research delivered a highly intuitive tool that enhanced data visualization and decision-making.',
  },
  {
    id: 10,
    company: 'MystryMind Innovations',
    stars: 5,
    text: 'Excellent collaboration and delivery. Pritish brought creative vision and technical precision to every stage of the project — truly a standout experience working with him.',
  },
]

/* Split into two rows */
const ROW_A = TESTIMONIALS.slice(0, 5)
const ROW_B = TESTIMONIALS.slice(5, 10)

function Stars({ count }) {
  return (
    <div className="t-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625L4.5 7.07 2 4.635l3.455-.505L7 1z"
            fill="url(#starGrad)"
          />
          <defs>
            <linearGradient id="starGrad" x1="0" y1="0" x2="14" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f9d96e" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  )
}

function Card({ item }) {
  return (
    <div className="t-card">
      {/* Top: company + stars */}
      <div className="t-card-top">
        <div className="t-company-row">
          <div className="t-avatar">
            {item.company.charAt(0).toUpperCase()}
          </div>
          <span className="t-company">{item.company}</span>
        </div>
        <Stars count={item.stars} />
      </div>

      {/* Quote */}
      <p className="t-quote">
        <span className="t-quote-mark">"</span>
        {item.text}
        <span className="t-quote-mark">"</span>
      </p>

      {/* Bottom shimmer line */}
      <div className="t-card-line" />
    </div>
  )
}

function MarqueeRow({ items, reverse }) {
  /* Duplicate so the scroll is seamless */
  const doubled = [...items, ...items]
  return (
    <div className="t-track-wrapper">
      <div className={`t-track ${reverse ? 't-track-reverse' : ''}`}>
        {doubled.map((item, i) => (
          <Card key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400&display=swap');

        /* ── Section ── */
        .t-section {
          position: relative;
          width: 100%;
          padding: 100px 0 110px;
          background: transparent;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Subtle center glow matching portfolio */
        .t-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 400px;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 92, 246, 0.08) 0%,
            rgba(99, 60, 220, 0.04)  50%,
            transparent 80%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ── Heading ── */
        .t-heading {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 64px;
          padding: 0 24px;
        }

        .t-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.22em;
          color: #a78bfa;
          text-transform: uppercase;
          margin-bottom: 16px;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 999px;
          padding: 5px 18px;
        }

        .t-label-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 6px #a78bfa;
          animation: t-dot-pulse 2s ease-in-out infinite;
        }

        @keyframes t-dot-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }

        .t-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px, 4vw, 50px);
          font-weight: 800;
          color: #f0eaff;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.08;
        }

        .t-title span { color: #a78bfa; }

        .t-subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 300;
          color: rgba(203,213,225,0.4);
          letter-spacing: 0.06em;
          margin-top: 14px;
        }

        /* ── Marquee rows ── */
        .t-rows {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .t-track-wrapper {
          overflow: hidden;
          /* Edge fade masks */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .t-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: t-scroll-left 38s linear infinite;
        }

        .t-track-reverse {
          animation: t-scroll-right 42s linear infinite;
        }

        .t-track:hover,
        .t-track-reverse:hover {
          animation-play-state: paused;
        }

        @keyframes t-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @keyframes t-scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* ── Card ── */
        .t-card {
          flex-shrink: 0;
          width: 340px;
          padding: 26px 28px 22px;
          box-sizing: border-box;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 4px 28px rgba(0,0,0,0.35),
            0 0 0 1px rgba(139,92,246,0.07),
            inset 0 1px 0 rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          gap: 14px;
          cursor: default;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }

        .t-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(167,139,250,0.4),
            transparent
          );
        }

        .t-card:hover {
          border-color: rgba(167,139,250,0.3);
          box-shadow:
            0 8px 40px rgba(0,0,0,0.4),
            0 0 0 1px rgba(139,92,246,0.2),
            0 0 24px rgba(139,92,246,0.1),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transform: translateY(-3px);
        }

        /* Company row */
        .t-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .t-company-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .t-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(124,58,237,0.5), rgba(99,60,220,0.3));
          border: 1px solid rgba(167,139,250,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: #c4b5fd;
          flex-shrink: 0;
        }

        .t-company {
          font-family: 'Syne', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          color: #e8e0ff;
          line-height: 1.2;
        }

        /* Stars */
        .t-stars {
          display: flex;
          gap: 2px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Quote text */
        .t-quote {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(203,213,225,0.62);
          margin: 0;
          flex: 1;
        }

        .t-quote-mark {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: rgba(167,139,250,0.5);
          line-height: 0;
          vertical-align: -4px;
        }

        /* Bottom shimmer line */
        .t-card-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(139,92,246,0.2),
            transparent
          );
          margin-top: 4px;
        }

        /* ── Total count badge ── */
        .t-count-row {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          margin-top: 52px;
          gap: 32px;
        }

        .t-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .t-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #a78bfa;
        }

        .t-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          color: rgba(203,213,225,0.38);
          text-transform: uppercase;
        }

        .t-stat-divider {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, rgba(139,92,246,0.3), transparent);
          align-self: center;
        }
      `}</style>

      <section className="t-section">

        {/* Heading */}
        <div className="t-heading">
          <div className="t-label">
            <span className="t-label-dot" />
            Client Reviews
          </div>
          <h2 className="t-title">
            What clients <span>say.</span>
          </h2>
          <p className="t-subtitle">
            Trusted by startups, enterprises &amp; foundations across industries.
          </p>
        </div>

        {/* Dual marquee rows */}
        <div className="t-rows">
          <MarqueeRow items={ROW_A} reverse={false} />
          <MarqueeRow items={ROW_B} reverse={true} />
        </div>

        {/* Stats bar */}
        <div className="t-count-row">
          <div className="t-stat">
            <span className="t-stat-num">20+</span>
            <span className="t-stat-label">Happy Clients</span>
          </div>
          <div className="t-stat-divider" />
          <div className="t-stat">
            <span className="t-stat-num">50+</span>
            <span className="t-stat-label">Projects Done</span>
          </div>
          <div className="t-stat-divider" />
          <div className="t-stat">
            <span className="t-stat-num">5.0</span>
            <span className="t-stat-label">Avg Rating</span>
          </div>
        </div>

      </section>
    </>
  )
}