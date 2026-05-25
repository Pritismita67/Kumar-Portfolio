"use client";

import { useState, useRef, useEffect } from "react";

// ── placeholder data – swap src values with your real paths ──────────────────
const RECOGNITION_ITEMS = [
  {
    id: 1,
    type: "image",
    src: "/First Image.JPG",
    title: "Best Innovation Award",
    event: "Tech Summit 2024",
    date: "March 2024",
  },
  {
    id: 2,
    type: "image",
    src: "/A1.png",
    title: "Gold Medal – Hackathon",
    event: "National Coding Championship",
    date: "June 2024",
  },
  {
    id: 3,
    type: "image",
    src: "/A2.png",
    title: "Excellence in Design",
    event: "UI/UX Awards Gala",
    date: "August 2024",
  },
  {
    id: 4,
    type: "image",
    src: "/A3.png",
    title: "1st Place – Robotics",
    event: "State Engineering Fest",
    date: "October 2024",
  },
  {
    id: 5,
    type: "image",
    src: "/A4.png",
    title: "Scholar of the Year",
    event: "University Convocation",
    date: "November 2024",
  },
  {
    id: 6,
    type: "image",
    src: "/A5.png",
    title: "Open Source Contributor",
    event: "GitHub Universe",
    date: "December 2024",
  },
  {
  id: 7,
  type: "video",
  src: "/vsut.mp4",         // ✅ correct — file is in /public/
  poster: "",               // ✅ leave empty, or add a real thumbnail image path
  title: "Recognition Ceremony",
  event: "Annual Awards Night",
  date: "January 2025",
},
];

// ── gallery images (add as many as you like) ─────────────────────────────────
const GALLERY_IMAGES = [
  { id: 1, src: "/Last Image.JPG", caption: "Award Ceremony" },
  { id: 2, src: "/2.png", caption: "Team Celebration" },
  { id: 3, src: "/Third Image.JPG", caption: "On Stage" },
  { id: 4, src: "/6.png", caption: "Certificate Handover" },
  { id: 5, src: "/4.png", caption: "Felicitation" },
  { id: 6, src: "/5.png", caption: "Media Coverage" },
  { id: 7, src: "/Clg 1.JPG", caption: "Workshop Win" },
  { id: 8, src: "/7.png", caption: "Panel Discussion" },
  { id: 9, src: "/8.png", caption: "Panel Discussion" },
  { id: 10, src: "/Clg 2.JPG", caption: "Panel Discussion" },
];

// ── helper: generate dots only on client to avoid SSR/client mismatch ────────
function generateDots() {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    delay: `${Math.random() * 4}s`,
  }));
}

export default function Prize() {
  const [lightbox, setLightbox] = useState(null);
  const [dots, setDots] = useState([]); // empty on server, filled on client
  const videoRef = useRef(null);

  // Runs only in the browser — no SSR mismatch
  useEffect(() => {
    setDots(generateDots());
  }, []);

  const openLightbox = (item) => setLightbox(item);
  const closeLightbox = () => {
    setLightbox(null);
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <>
      <style>{`
        /* ── base ───────────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Syne:wght@400;600;700&display=swap');

        .prize-root {
          min-height: 100vh;
          padding: 100px 24px 80px;
          font-family: 'Syne', sans-serif;
          color: #e8e0ff;
          position: relative;
          overflow-x: hidden;
        }

        /* decorative dots */
        .prize-dot {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          pointer-events: none;
          animation: twinkle var(--dur, 3s) ease-in-out infinite alternate;
        }
        @keyframes twinkle {
          from { opacity: var(--op); transform: scale(1); }
          to   { opacity: calc(var(--op) * 0.25); transform: scale(0.6); }
        }

        /* ── section header ─────────────────────────────────── */
        .prize-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .prize-eyebrow {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 12px;
        }
        .prize-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 300;
          line-height: 1.1;
          background: linear-gradient(135deg, #e8e0ff 30%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        .prize-divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #7c3aed, transparent);
          margin: 20px auto 0;
        }

        /* ── glass card ──────────────────────────────────────── */
        .glass-card {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.06) 0%,
            rgba(124,58,237,0.08) 100%
          );
          border: 1px solid rgba(167,139,250,0.18);
          border-radius: 18px;
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          box-shadow:
            0 0 0 0.5px rgba(167,139,250,0.1) inset,
            0 8px 40px rgba(0,0,0,0.45),
            0 0 80px rgba(109,40,217,0.07);
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
          cursor: pointer;
        }
        .glass-card:hover {
          transform: translateY(-6px) scale(1.015);
          border-color: rgba(167,139,250,0.45);
          box-shadow:
            0 0 0 0.5px rgba(167,139,250,0.25) inset,
            0 20px 60px rgba(0,0,0,0.55),
            0 0 120px rgba(124,58,237,0.18);
        }

        /* ── recognition grid (7 items) ─────────────────────── */
        .recognition-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto 100px;
        }

        /* video card spans 2 columns when space allows */
        .recognition-grid .card-video {
          grid-column: span 2;
        }

        @media (max-width: 700px) {
          .recognition-grid .card-video { grid-column: span 1; }
        }

        .card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .card-video .card-media {
          aspect-ratio: 16/9;
        }
        .card-media img,
        .card-media video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1);
          display: block;
        }
        .glass-card:hover .card-media img,
        .glass-card:hover .card-media video {
          transform: scale(1.06);
        }

        /* shimmer overlay on images */
        .card-media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            transparent 40%,
            rgba(167,139,250,0.12) 100%
          );
          pointer-events: none;
        }

        /* play button badge */
        .play-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(124,58,237,0.55);
          border: 1.5px solid rgba(167,139,250,0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
          pointer-events: none;
        }
        .glass-card:hover .play-badge {
          background: rgba(124,58,237,0.8);
        }
        .play-badge svg { width: 22px; height: 22px; fill: #fff; margin-left: 3px; }

        /* card body */
        .card-body {
          padding: 18px 20px 20px;
        }
        .card-tag {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 6px;
        }
        .card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: #ede9fe;
          margin: 0 0 4px;
          line-height: 1.25;
        }
        .card-meta {
          font-size: 12px;
          color: rgba(200,185,255,0.55);
          letter-spacing: 0.04em;
        }

        /* ── gallery section ─────────────────────────────────── */
        .gallery-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .gallery-label {
          font-size: 10px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 10px;
        }
        .gallery-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 300;
          background: linear-gradient(135deg, #e8e0ff 30%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .gallery-item {
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(167,139,250,0.14);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
          cursor: pointer;
          position: relative;
          transition: border-color 0.3s, transform 0.35s cubic-bezier(.22,1,.36,1);
        }
        .gallery-item:hover {
          border-color: rgba(167,139,250,0.4);
          transform: translateY(-4px) scale(1.02);
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .gallery-item:hover img { transform: scale(1.08); }

        .gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px 12px 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          font-size: 12px;
          color: rgba(232,224,255,0.85);
          letter-spacing: 0.04em;
          transform: translateY(4px);
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
        }
        .gallery-item:hover .gallery-caption {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── lightbox ────────────────────────────────────────── */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.88);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

        .lightbox-inner {
          position: relative;
          max-width: min(90vw, 960px);
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(167,139,250,0.25);
          box-shadow: 0 30px 100px rgba(0,0,0,0.7), 0 0 120px rgba(124,58,237,0.2);
          animation: popIn 0.3s cubic-bezier(.22,1,.36,1);
        }
        @keyframes popIn {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .lightbox-inner img,
        .lightbox-inner video {
          width: 100%;
          display: block;
          max-height: 80vh;
          object-fit: contain;
          background: #000;
        }
        .lightbox-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          backdrop-filter: blur(8px);
          z-index: 10;
          line-height: 1;
        }
        .lightbox-close:hover { background: rgba(124,58,237,0.5); }

        .lightbox-info {
          padding: 18px 22px;
          background: linear-gradient(
            135deg,
            rgba(20,10,40,0.9) 0%,
            rgba(40,15,70,0.9) 100%
          );
          border-top: 1px solid rgba(167,139,250,0.15);
        }
        .lightbox-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 400;
          color: #ede9fe;
          margin: 0 0 4px;
        }
        .lightbox-info p {
          font-size: 12px;
          color: rgba(200,185,255,0.55);
          margin: 0;
          letter-spacing: 0.04em;
        }

        /* ── scroll reveal ───────────────────────────────────── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          animation: revealUp 0.65s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes revealUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.18s; }
        .delay-3 { animation-delay: 0.26s; }
        .delay-4 { animation-delay: 0.34s; }
        .delay-5 { animation-delay: 0.42s; }
        .delay-6 { animation-delay: 0.50s; }
        .delay-7 { animation-delay: 0.58s; }
      `}</style>

      <div className="prize-root">

        {/* decorative floating dots */}
        {dots.map((d) => (
          <span
            key={d.id}
            className="prize-dot"
            style={{
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              "--op": d.opacity,
              "--dur": `${2 + Math.random() * 3}s`,
              animationDelay: d.delay,
            }}
          />
        ))}

        {/* ── section header ── */}
        <header className="prize-header reveal">
          <p className="prize-eyebrow">Portfolio</p>
          <h1 className="prize-title">Achievements &amp; Recognition</h1>
          <div className="prize-divider" />
        </header>

        {/* ── recognition cards grid ── */}
        <div className="recognition-grid">
          {RECOGNITION_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`glass-card reveal delay-${Math.min(i + 1, 7)} ${
                item.type === "video" ? "card-video" : ""
              }`}
              onClick={() => openLightbox(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(item)}
            >
              <div className="card-media">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={item.src} alt={item.title} loading="lazy" />
                )}
                {item.type === "video" && (
                  <div className="play-badge">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="card-body">
                <p className="card-tag">{item.type === "video" ? "▶ Video" : "★ Award"}</p>
                <h3 className="card-name">{item.title}</h3>
                <p className="card-meta">
                  {item.event} &nbsp;·&nbsp; {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── gallery section ── */}
        <section>
          <div className="gallery-header reveal">
            <p className="gallery-label">Moments</p>
            <h2 className="gallery-title">Gallery</h2>
          </div>

          <div className="gallery-grid">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={img.id}
                className={`gallery-item reveal delay-${Math.min(i + 1, 7)}`}
                onClick={() =>
                  openLightbox({ ...img, type: "image", event: "", date: "" })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  openLightbox({ ...img, type: "image", event: "", date: "" })
                }
              >
                <img src={img.src} alt={img.caption} loading="lazy" />
                <div className="gallery-caption">{img.caption}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── lightbox ── */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>

            {lightbox.type === "video" ? (
              <video
                ref={videoRef}
                src={lightbox.src}
                poster={lightbox.poster}
                controls
                autoPlay
                style={{ maxHeight: "70vh" }}
              />
            ) : (
              <img
                src={lightbox.src}
                alt={lightbox.title}
                style={{ maxHeight: "70vh" }}
              />
            )}

            <div className="lightbox-info">
              <h3>{lightbox.title}</h3>
              {lightbox.event && (
                <p>
                  {lightbox.event}
                  {lightbox.date ? ` · ${lightbox.date}` : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}