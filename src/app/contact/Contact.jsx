"use client";

import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [focused, setFocused] = useState("");
  const [dots, setDots] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    setDots(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.2 + 0.4,
        op: Math.random() * 0.5 + 0.15,
        dur: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 4}s`,
      }))
    );
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);

    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const socials = [
    {
      label: "WhatsApp",
      href: "https://wa.me/917683912451",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com/pritish8517",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pritish-kumar-sahoo-69754a311/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:pritishsahoo25@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
          <rect x="2" y="4" width="20" height="16" rx="3"/>
          <path d="M2 7l10 7 10-7"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Syne:wght@400;500;600;700&display=swap');

        .contact-root {
          min-height: 100vh;
          padding: 110px 24px 80px;
          font-family: 'Syne', sans-serif;
          color: #e8e0ff;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .c-dot {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          pointer-events: none;
          animation: c-twinkle var(--dur) ease-in-out infinite alternate;
          animation-delay: var(--delay);
        }
        @keyframes c-twinkle {
          from { opacity: var(--op); transform: scale(1); }
          to   { opacity: calc(var(--op) * 0.2); transform: scale(0.5); }
        }

        .contact-header {
          text-align: center;
          margin-bottom: 64px;
          position: relative;
          z-index: 2;
        }
        .contact-eyebrow {
          font-size: 10px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 12px;
          font-family: 'Syne', sans-serif;
        }
        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 300;
          line-height: 1.05;
          margin: 0 0 16px;
          background: linear-gradient(135deg, #f0ebff 20%, #a78bfa 60%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-subtitle {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          color: rgba(200, 185, 255, 0.5);
          letter-spacing: 0.04em;
          max-width: 420px;
          margin: 0 auto;
          line-height: 1.8;
        }
        .contact-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #7c3aed, transparent);
          margin: 20px auto 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 28px;
          max-width: 1050px;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 780px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        .glass-panel {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.055) 0%,
            rgba(124,58,237,0.07) 100%
          );
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 22px;
          backdrop-filter: blur(18px) saturate(1.3);
          -webkit-backdrop-filter: blur(18px) saturate(1.3);
          box-shadow:
            0 0 0 0.5px rgba(167,139,250,0.08) inset,
            0 8px 48px rgba(0,0,0,0.5),
            0 0 80px rgba(109,40,217,0.06);
          padding: 36px 32px;
        }

        .info-greeting {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 300;
          font-style: italic;
          color: rgba(232,224,255,0.7);
          margin: 0 0 8px;
        }
        .info-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ede9fe;
          margin: 0 0 24px;
          letter-spacing: 0.04em;
        }
        .info-divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, #7c3aed, transparent);
          margin-bottom: 24px;
        }
        .info-desc {
          font-size: 13px;
          line-height: 1.9;
          color: rgba(200,185,255,0.55);
          margin: 0 0 36px;
          letter-spacing: 0.02em;
        }

        .info-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
        }
        .detail-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .detail-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(167,139,250,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a78bfa;
          flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s;
        }
        .detail-row:hover .detail-icon {
          background: rgba(124,58,237,0.25);
          border-color: rgba(167,139,250,0.45);
        }
        .detail-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .detail-label {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(167,139,250,0.6);
        }
        .detail-value {
          font-size: 13px;
          color: rgba(232,224,255,0.8);
          letter-spacing: 0.02em;
        }

        .socials-label {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 14px;
          font-weight: 300px;
        }
        .socials-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .social-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(167,139,250,0.2);
          background: rgba(255,255,255,0.03);
          color: rgba(200,185,255,0.7);
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          text-decoration: none;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
          cursor: pointer;
        }
        .social-btn:hover {
          border-color: rgba(167,139,250,0.5);
          background: rgba(124,58,237,0.15);
          color: #e8e0ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(124,58,237,0.2);
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 400;
          color: #ede9fe;
          margin: 0 0 6px;
        }
        .form-hint {
          font-size: 12px;
          color: rgba(200,185,255,0.4);
          margin: 0 0 30px;
          letter-spacing: 0.03em;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        @media (max-width: 540px) {
          .form-row { grid-template-columns: 1fr; }
        }

        .field-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .field-wrap.no-mb { margin-bottom: 0; }

        .field-label {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(167,139,250,0.6);
          transition: color 0.25s;
        }
        .field-wrap.is-focused .field-label { color: #a78bfa; }

        .field-input,
        .field-textarea {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(167,139,250,0.16);
          border-radius: 12px;
          padding: 13px 16px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          color: #e8e0ff;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          -webkit-appearance: none;
        }
        .field-input::placeholder,
        .field-textarea::placeholder {
          color: rgba(167,139,250,0.28);
          font-size: 12px;
        }
        .field-input:focus,
        .field-textarea:focus {
          border-color: rgba(167,139,250,0.5);
          background: rgba(124,58,237,0.07);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
        }

        .field-textarea {
          resize: vertical;
          min-height: 130px;
          line-height: 1.7;
        }

        .submit-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
          flex-wrap: wrap;
        }
        .submit-btn {
          position: relative;
          padding: 14px 36px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4f46e5 100%);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          box-shadow:
            0 0 28px rgba(124,58,237,0.55),
            0 4px 20px rgba(0,0,0,0.35);
          transition: transform 0.25s, box-shadow 0.25s, opacity 0.25s;
          overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          border-radius: inherit;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 48px rgba(124,58,237,0.75), 0 8px 32px rgba(0,0,0,0.4);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .submit-btn .btn-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .success-msg {
          font-size: 12px;
          color: #86efac;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 6px;
          animation: fadeIn 0.4s ease;
        }
        .error-msg {
          font-size: 12px;
          color: #fca5a5;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 6px;
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          animation: revealUp 0.7s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes revealUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.15s; }
        .d3 { animation-delay: 0.25s; }
      `}</style>

      <div className="contact-root">

        {/* stars */}
        {dots.map((d) => (
          <span
            key={d.id}
            className="c-dot"
            style={{
              top: d.top, left: d.left,
              width: d.size, height: d.size,
              "--op": d.op, "--dur": d.dur, "--delay": d.delay,
            }}
          />
        ))}

        {/* header */}
        <header className="contact-header reveal d1">
          <p className="contact-eyebrow">Get in Touch</p>
          <h1 className="contact-title">Let's Work Together</h1>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hello?<br />
            I'd love to hear from you.
          </p>
          <div className="contact-divider" />
        </header>

        {/* grid */}
        <div className="contact-grid">

          {/* LEFT: Info */}
          <div className="glass-panel info-panel reveal d2">
            <p className="info-greeting">Hello, I'm</p>
            <p className="info-name">Pritish Kumar</p>
            <div className="info-divider" />
            <p className="info-desc">
              UI/UX Designer, passionate about
              crafting digital experiences. Always open to
              new collaborations, freelance work, and exciting opportunities.
            </p>

            <div className="info-details">
              <div className="detail-row">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="detail-text">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Odisha, India</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                    <rect x="2" y="4" width="20" height="16" rx="3"/>
                    <path d="M2 7l10 7 10-7"/>
                  </svg>
                </div>
                <div className="detail-text">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">pritishsahoo25@gmail.com</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div className="detail-text">
                  <span className="detail-label">Availability</span>
                  <span className="detail-value">Open to Opportunities</span>
                </div>
              </div>
            </div>

            <p className="socials-label">Find me on</p>
            <div className="socials-row">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="glass-panel form-panel reveal d3">
            <h2 className="form-title">Send a Message</h2>
            <p className="form-hint">Fill out the form and I'll get back to you within 24 hours.</p>

            <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
              <div className="form-row">
                <div className={`field-wrap no-mb ${focused === "name" ? "is-focused" : ""}`}>
                  <label className="field-label" htmlFor="name">Your Name</label>
                  <input
                    id="name" name="name" type="text"
                    className="field-input"
                    placeholder="Kumar Pritish"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    required
                  />
                </div>
                <div className={`field-wrap no-mb ${focused === "email" ? "is-focused" : ""}`}>
                  <label className="field-label" htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    className="field-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    required
                  />
                </div>
              </div>

              <div className={`field-wrap ${focused === "subject" ? "is-focused" : ""}`}>
                <label className="field-label" htmlFor="subject">Subject</label>
                <input
                  id="subject" name="subject" type="text"
                  className="field-input"
                  placeholder="Project collaboration, freelance work…"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused("")}
                  required
                />
              </div>

              <div className={`field-wrap ${focused === "message" ? "is-focused" : ""}`}>
                <label className="field-label" htmlFor="message">Message</label>
                <textarea
                  id="message" name="message"
                  className="field-textarea"
                  placeholder="Tell me about your project or idea…"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  required
                />
              </div>

              <div className="submit-row">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === "sending" || status === "sent"}
                >
                  <span className="btn-inner">
                    {status === "sending" && <span className="spinner" />}
                    {status === "idle"    && "Send Message →"}
                    {status === "sending" && "Sending…"}
                    {status === "sent"    && "Message Sent ✓"}
                    {status === "error"   && "Try Again →"}
                  </span>
                </button>

                {status === "sent" && (
                  <span className="success-msg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2" width="14" height="14">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    I'll reply within 24 hrs!
                  </span>
                )}

                {status === "error" && (
                  <span className="error-msg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2" width="14" height="14">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v4m0 4h.01"/>
                    </svg>
                    Failed to send. Please try again.
                  </span>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}