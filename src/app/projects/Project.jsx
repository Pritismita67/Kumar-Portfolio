"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────
   HERO PROJECT — Unreal Engine 5
   This is the single featured project. Everything below it (PROJECTS)
   renders in the normal grid, unchanged.
   ───────────────────────────────────────────────────────────────── */
const HERO_PROJECT = {
  title: "Mountain Escape",
  titleAccent: "Real-Time Environment",
  tagline:
    "A cinematic Unreal Engine 5 environment showcasing real-time rendering, immersive landscapes, dynamic lighting, and environment design.",
  category: "Real-Time 3D Environment",
  year: "2026",
  status: "Live",
  engine: "Unreal Engine 5",
  rendering: "Lumen · Nanite",
  coverImage: "/mountain.png",
 
  tech: ["Unreal Engine 5", "Nanite", "Lumen", "Landscape", "Foliage", "Lighting", "Cinematics"],
  overview:
    "A fully real-time UE5 environment blending large-scale terrain, dense foliage, and volumetric atmosphere — no baked lighting, no pre-rendered tricks.",
  challenge:
    "Keeping a vast landscape performant in real time without losing cinematic scale or atmosphere.",
  solution:
    "Nanite micro-geometry + Lumen dynamic GI, tuned foliage and fog, captured through Sequencer.",
  stats: [
    { label: "Engine", value: "Unreal Engine 5" },
    { label: "Rendering", value: "Lumen + Nanite" },
    { label: "Category", value: "Environment Art" },
    { label: "Status", value: "Live" },
  ],
  demoUrl: "https://www.linkedin.com/posts/pritish-kumar-sahoo-69754a311_unrealengine-unrealengine5-environmentart-ugcPost-7481959895974461440-aact/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE9H11MBR0BieR1EQKCgbD5Q2LbLFqOoTqc",
  color: "#8b7bff",
  colorAlt: "#5ac8ff",
};

/* ─── Reusable animated glowing border (traces the card perimeter) ── */
function TravellingBorder({ color, colorAlt, width, height, radius = 22 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const straight = 2 * (width - 2 * radius) + 2 * (height - 2 * radius);
    const curves = 2 * Math.PI * radius;
    const perimeter = straight + curves;
    let progress = 0;

    function rrPath() {
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.arcTo(width, 0, width, radius, radius);
      ctx.lineTo(width, height - radius);
      ctx.arcTo(width, height, width - radius, height, radius);
      ctx.lineTo(radius, height);
      ctx.arcTo(0, height, 0, height - radius, radius);
      ctx.lineTo(0, radius);
      ctx.arcTo(0, 0, radius, 0, radius);
      ctx.closePath();
    }

    function pointAt(d) {
      d = ((d % perimeter) + perimeter) % perimeter;
      const segTop = width - 2 * radius;
      const arcLen = (Math.PI / 2) * radius;
      const segRight = height - 2 * radius;
      const segBot = width - 2 * radius;
      const segLeft = height - 2 * radius;
      let rem = d;
      if (rem < segTop) return { x: radius + rem, y: 0 };
      rem -= segTop;
      if (rem < arcLen) { const a = -Math.PI / 2 + (rem / radius); return { x: width - radius + Math.cos(a) * radius, y: radius + Math.sin(a) * radius }; }
      rem -= arcLen;
      if (rem < segRight) return { x: width, y: radius + rem };
      rem -= segRight;
      if (rem < arcLen) { const a = 0 + (rem / radius); return { x: width - radius + Math.cos(a) * radius, y: height - radius + Math.sin(a) * radius }; }
      rem -= arcLen;
      if (rem < segBot) return { x: width - radius - rem, y: height };
      rem -= segBot;
      if (rem < arcLen) { const a = Math.PI / 2 + (rem / radius); return { x: radius + Math.cos(a) * radius, y: height - radius + Math.sin(a) * radius }; }
      rem -= arcLen;
      if (rem < segLeft) return { x: 0, y: height - radius - rem };
      rem -= segLeft;
      const a = Math.PI + (rem / radius);
      return { x: radius + Math.cos(a) * radius, y: radius + Math.sin(a) * radius };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      rrPath();
      ctx.strokeStyle = "rgba(139,123,255,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
      const tailCount = 46;
      const tailLen = perimeter * 0.16;
      for (let i = 0; i <= tailCount; i++) {
        const t = i / tailCount;
        const dist = progress - (1 - t) * tailLen;
        const pt = pointAt(dist);
        const alpha = t * t;
        const r = t * 2.6 + 0.6;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        if (i === tailCount) {
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        } else {
          const useAlt = t > 0.5;
          const base = useAlt ? colorAlt : color;
          const hex = Math.round(alpha * 0.95 * 255).toString(16).padStart(2, "0");
          ctx.fillStyle = `${base}${hex}`;
        }
        ctx.fill();
      }
      const tip = pointAt(progress);
      const grd = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 18);
      grd.addColorStop(0, `${colorAlt}aa`);
      grd.addColorStop(1, `${colorAlt}00`);
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      progress = (progress + perimeter / 260) % perimeter;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [color, colorAlt, width, height, radius]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3, borderRadius: radius }}
    />
  );
}

/* ─── Hero Project — cinematic featured section ──────────────────── */
function HeroProject({ data }) {
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    setParticles(
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1.5,
        dur: `${9 + Math.random() * 10}s`,
        delay: `${Math.random() * 8}s`,
        drift: `${(Math.random() - 0.5) * 60}px`,
        hue: Math.random() > 0.5 ? data.color : data.colorAlt,
      }))
    );
  }, [data.color, data.colorAlt]);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: Math.round(entry.contentRect.width), h: Math.round(entry.contentRect.height) });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const onMouseMove = useCallback((e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x: px, y: py });
    setTilt({ x: (px - 50) / 50, y: (py - 50) / 50 });
  }, []);

  const onMouseLeave = useCallback(() => {
    setSpot({ x: 50, y: 50 });
    setTilt({ x: 0, y: 0 });
  }, []);

  const spawnRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const id = Date.now();
    const ripple = { id, x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((r) => [...r, ripple]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
  };

  return (
    <section className="hero-section">
      <div
        ref={wrapRef}
        className="hero-card"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          "--spot-x": `${spot.x}%`,
          "--spot-y": `${spot.y}%`,
          "--tilt-x": tilt.x,
          "--tilt-y": tilt.y,
          "--c1": data.color,
          "--c2": data.colorAlt,
        }}
      >
        {size.w > 0 && size.h > 0 && (
          <TravellingBorder color={data.color} colorAlt={data.colorAlt} width={size.w} height={size.h} radius={28} />
        )}

        <div className="hero-spotlight" />

        <div className="hero-particles">
          {particles.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                background: p.hue,
                boxShadow: `0 0 ${p.size * 3}px ${p.hue}`,
                animationDuration: p.dur,
                animationDelay: p.delay,
                "--drift": p.drift,
              }}
            />
          ))}
        </div>

        {/* ── LEFT: cinematic media (55–60%) ── */}
        <div className="hero-left">
          <div
            className="hero-media-scale"
            style={{
              transform: `scale(1.1) translate(${tilt.x * -10}px, ${tilt.y * -10}px)`,
            }}
          >
            {videoOk && data.coverVideo ? (
              <video
                className="hero-media-el"
                src={data.coverVideo}
                poster={data.coverImage}
                autoPlay
                muted
                loop
                playsInline
                onError={() => setVideoOk(false)}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="hero-media-el" src={data.coverImage} alt={data.title} />
            )}
          </div>
          <div className="hero-media-gradient" />
          <div className="hero-media-vignette" />
          <div className="hero-media-edge" />

          <div className="hero-badges">
            <span className="hero-badge hero-badge-star">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 2l2.9 6.9L22 9.7l-5.5 4.9L18 22l-6-3.9L6 22l1.5-7.4L2 9.7l7.1-.8z"/></svg>
              Featured Project
            </span>
            <span className="hero-badge hero-badge-engine">Unreal Engine 5</span>
          </div>
        </div>

        {/* ── RIGHT: content, vertically centered (40–45%) ── */}
        <div className="hero-right">
          <div className="hero-right-inner">
            <div className="hero-meta">
              <span className="hero-mbadge">{data.category}</span>
              <span className="hero-mdot">·</span>
              <span className="hero-myear">{data.year}</span>
              <span className="hero-mdot">·</span>
              <span className="hero-mstatus">{data.status}</span>
            </div>

            <h1 className="hero-title">
              {data.title}
              <span className="hero-title-accent">— {data.titleAccent}</span>
            </h1>
            <p className="hero-tagline">{data.tagline}</p>

            <div className="hero-tech">
              {data.tech.map((t) => (
                <span key={t} className="hero-chip">{t}</span>
              ))}
            </div>

            <div className="hero-summary">
              <p className="hero-summary-line"><span>Overview</span>{data.overview}</p>
              <p className="hero-summary-line"><span>Challenge</span>{data.challenge}</p>
              <p className="hero-summary-line"><span>Solution</span>{data.solution}</p>
            </div>

            <div className="hero-stats">
              {data.stats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <p className="hero-stat-label">{s.label}</p>
                  <p className="hero-stat-value">{s.value}</p>
                </div>
              ))}
            </div>

            <a
              href={data.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              onClick={spawnRipple}
            >
              <span className="hero-cta-play">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
              <span className="hero-cta-label">Watch Environment Demo</span>
              <span className="hero-cta-shine" />
              {ripples.map((r) => (
                <span key={r.id} className="hero-cta-ripple" style={{ left: r.x, top: r.y }} />
              ))}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    id: 1,
    type: "mobile",
    title: "Kiran Foundation App",
    tagline: "From Wireframes to Fully Functional Mobile UI",
    category: "Mobile App Design & UI/UX",
    year: "2024",
    status: "Live",
    tags: ["Figma", "Canva", "Sketch"],
    coverImage: "/Kiran Foundation 5.png",
    images: [
      "/Kiran Foundation 1.png",
      "/Kiran Foundation 2.png",
      "/Kiran Foundation 3.png",
      "/Kiran Foundation 4.png",
      "/Kiran Foundation 5.png",
      "/Kiran Foundation 6.png",
      "/Kiran Foundation 7.png",
      "/Kiran Foundation 8.png",
    ],
    description:
      "For the Kiran Foundation app, I followed a structured UI/UX design process from start to finish. I began with wireframing, focusing on user needs and defining the app's core functionality. After testing multiple low-fidelity layouts, I explored various design directions and user flows. Through iteration and user feedback, I refined the structure and moved to high-fidelity mockups, ensuring visual consistency and smooth navigation. Finally, I created an interactive prototype, validating the user journey and making adjustments for better usability. This step-by-step approach helped me deliver a clean, responsive, and functional mobile interface.📱✨",
    challenge:
      "Designing a mobile experience for the Kiran Foundation app that was easy to navigate for diverse users while keeping the interface visually clean, accessible, and functionally efficient.",
    solution:
      "Followed a complete user-centered UI/UX process starting from wireframes and flow exploration to high-fidelity designs and interactive prototyping. Multiple layout iterations, usability-focused refinements, and feedback-driven improvements helped create a responsive and intuitive mobile interface with smooth navigation and consistent visual design, developed in Figma, Canva and Sketch.",
    liveUrl: "https://www.figma.com/design/X4UmR3nO5IWDnx3ukwCv8n/Untitled?node-id=11-34&p=f&t=iC0ccWnTldhvyLur-0",
    color: "#7c3aed",
  },
  {
    id: 2,
    type: "mobile",
    title: "Swarikaro",
    tagline: "Your Ride, Your Rhythm",
    category: "UI/UX Design",
    year: "2025",
    status: "Live",
    tags: ["Figma", "Framer", "Canva Pro"],
    coverImage: "/S12.png",
    images: ["/S1.png","/S2.png","/S3.png","/S4.png","/S5.png","/S6.png","/S7.png","/S8.png","/S9.png","/S10.png","/S11.png","/S12.png","/S14.png","/S15.png"],
    description:
      "Swarikaro is a modern bike and car rental platform designed to simplify vehicle discovery, booking, and ride planning through an intuitive and seamless digital experience. The goal was to create a user-first ecosystem where users could easily explore vehicles, compare options, rent riding accessories, and complete bookings with minimal friction.",
    challenge:
      "Traditional rental platforms often suffer from: Complex booking flows, Poor information hierarchy, Overloaded interfaces, Limited trust-building elements, Lack of smooth mobile experiences. The challenge was to create a platform that reduces decision fatigue and allows users to complete rentals quickly while maintaining a premium and engaging visual experience.",
    solution:
      "As the Lead UI/UX Designer, I was responsible for transforming business requirements into a complete user experience and interface system while ensuring usability, responsiveness, and visual consistency across the application.",
    liveUrl: "https://www.figma.com/design/zA1rU4skhVsnIlSbZHxbsE/Untitled?node-id=0-1&p=f&t=cX5MJoiBM8y6MAEz-0",
    color: "#0ea5e9",
  },
  {
    id: 3,
    type: "mobile",
    title: "Ramayan",
    tagline: "Valmiki Ramayan User Journey & Vedapath App Design Excellence",
    category: "User Journey & App Design",
    year: "2024",
    status: "Live",
    tags: ["Figma"],
    coverImage: "/Ramayana 2.png",
    images: [
      "/Ramayana 1.png",
      "/Ramayana 2.png",
      "/Ramayana 3.png",
      "/Ramayan 4.png",
      "/Ramayana 5.png",
      "/Ramayana 6.png",
      "/Ramayana 7.png",
      "/Ramayana 8.png",
      "/Ramayana 9.png",
    ],
    description:
      "Designed the Valmiki Ramayan user journey and Vedapath app home page to enhance clarity, accessibility, and spiritual engagement. For Ramayan, I created an intuitive 3-step flow (Kanda → Sarga → Shloka) with contextual previews, scrollable navigation, and a clean Shloka reader showcasing Sanskrit, translations, and collapsible meanings, with icons for audio/commentary. For Vedapath, I restructured the home page to improve content hierarchy, introduced modular sections (Featured, Continue Listening, Popular), and used calming visuals aligned with the brand. A key highlight was a scroll-based Shloka reveal animation that adds a sense of spiritual depth. Designs were executed in Figma with proper structure, annotations, and user-centered focus.🕉️✨",
    challenge: "Project Visual Overview: Explore the spiritual design language and user interface",
    solution:
      "Designed a spiritually immersive and user-friendly digital experience for the Valmiki Ramayan and Vedapath platforms, blending sacred aesthetics with modern UI/UX principles. The project included intuitive navigation flows, structured content hierarchy, interactive Shloka reading experiences, and engaging scroll-based animations crafted in Figma with a strong focus on usability and visual harmony.",
    color: "#10b981",
  },
  {
    id: 4,
    type: "mobile",
    title: "Netflix Mobile App",
    tagline: "Pixel-Perfect UI Clone for UX Practice",
    category: "Mobile App UI Clone & UX Practice",
    year: "2024",
    status: "Live",
    tags: ["Framer", "Figma"],
    coverImage: "/Netflix 1.png",
    images: ["/Netflix 1.png","/Netflix 2.png","/Netflix 3.png","/Netflix 4.png"],
    description:
      "Designed a UI/UX Netflix mobile app clone that replicates the original app's interface and user flow with high accuracy. The goal was to study and recreate the design system, layout structure, and user interactions of Netflix. I matched the visual hierarchy, navigation patterns, and content presentation, including home screen, categories, video thumbnails, and player interface. This project helped me deepen my understanding of industry-grade design standards and mobile streaming UX. Built entirely in Figma, maintaining pixel-perfect alignment and consistency.📱🎬",
    challenge:
      "Recreating the complex and highly polished user experience of the Netflix mobile app while maintaining pixel-perfect consistency, intuitive navigation, and accurate content hierarchy across screens.",
    solution:
      "Carefully analyzed the original app's design system, layout patterns, and interaction flows, then recreated the interface in Figma and Framer with precise alignment, consistent spacing, and responsive mobile layouts. The project focused on replicating industry-standard streaming UX through detailed screen structures, navigation behavior, and visually balanced content presentation.",
    color: "#f59e0b",
  },
  {
    id: 5,
    type: "mobile",
    title: "Turf Zone",
    tagline: "— Play. Compete. Repeat",
    category: "Premium Sports Turf Booking Experience",
    year: "2026",
    status: "Live",
    tags: ["Figma","Wireframing","Design System","Responsive Design"],
    coverImage: "/tm.png",
    images: ["/tm.png","/turf2.png","/turf3.png","/turf4.png","/turf5.png"],
    description:
      "Turf Zone is a premium sports turf booking platform designed to simplify the way users discover, explore, and reserve sports facilities. The platform focuses on delivering a seamless and engaging booking experience while creating a strong sports-centric brand identity. The objective was to build a modern, conversion-focused digital experience that makes booking sports venues effortless while encouraging users to transition toward the mobile ecosystem. As the Lead UI/UX Designer, I was responsible for designing the complete product experience—from strategy and user journeys to interface design and developer handoff.",
    challenge:
      "Most turf booking platforms create friction during the discovery and booking process due to: Poor visual hierarchy, Complex reservation workflows, Outdated interfaces, Lack of engaging sports identity, Limited mobile optimization, Low conversion-focused structure. The challenge was to redesign the booking journey into an experience that feels premium, energetic, and effortless.",
    solution:
      "The objective was to build a modern, conversion-focused digital experience that makes booking sports venues effortless while encouraging users to transition toward the mobile ecosystem. Turf Zone was designed to go beyond booking infrastructure—it was built to create excitement around sports participation. The project strengthened my ability to combine branding, usability, and conversion-focused product thinking into one cohesive digital experience. Play. Compete. Repeat.",
    liveUrl: "https://www.figma.com/design/3IABVtMSgi4yidjtqFrFcu/Turf-Zone-Pritish-Advanced?node-id=0-1&p=f&t=cX5MJoiBM8y6MAEz-0",
    color: "#ec4899",
  },
  {
    id: 6,
    type: "mobile",
    title: "Abun",
    tagline: "AI-Powered Content Creation",
    category: "AI Content",
    year: "2024",
    status: "Live",
    tags: ["Figma", "Sketch", "Framer"],
    coverImage: "/abunm.png",
    images: ["/Abun1.png","/Abun2.png","/Abun3.png","/Abun4.png","/Abun5.png","/Abun6.png","/Abun7.png","/Abun8.png","/Abun9.png","/Abun10.png","/Abun11.png"],
    description:
      "Abun is an advanced AI content writing platform built to streamline digital content creation for marketers, bloggers, startups, and agencies. My task was to design a high-impact website that communicates Abun's diverse capabilities—from SEO-optimized blogs and product descriptions to ad copies and social posts—all driven by AI. The design highlights key features like real-time SEO integration, keyword suggestions, automated internal linking, and one-click content generation. I structured user journeys for different personas (writers, marketers, SMBs), ensuring the platform's value was clearly conveyed through compelling CTAs and modular UI sections. Testimonials, FAQs, and use cases were positioned strategically to build trust and demonstrate results. Special focus was given to showcasing Abun's powerful dashboard, ease of use, and automation features that help users publish faster without sacrificing quality. The final product reflects a clean, conversion-driven layout optimized for both desktop and mobile.🤖✨",
    challenge:
      "Designing a modern SaaS website for Abun that could clearly communicate multiple AI-driven features and workflows without overwhelming users, while also maintaining strong conversion-focused UX for different user personas.",
    solution:
      "Created a clean, modular, and conversion-driven UI/UX system in Figma that simplified complex AI content workflows through structured sections, strategic CTAs, and persona-based user journeys. Features like SEO tools, automation capabilities, dashboard previews, testimonials, and use cases were visually organized to improve clarity, engagement, and trust across both desktop and mobile experiences.",
    liveUrl: "https://www.figma.com/design/7Ppr5iwdieUsmGefLfHwQg/Untitled?node-id=149-2&p=f&t=iC0ccWnTldhvyLur-0",
    color: "#84cc16",
  },
  {
    id: 7,
    type: "mobile",
    title: "Prevacare App",
    tagline: "Revolutionizing Healthcare Through Intuitive Design",
    category: "Healthcare App Design & UI/UX",
    year: "2025",
    status: "Live",
    tags: ["Figma"],
    coverImage: "/prevam.png",
    images: ["/Prevacare 1.png","/PrevaCare 2.png","/PrevaCare 3.png","/PrevaCare 4.png","/PrevaCare 5.png","/PrevaCare 6.png","/Prevacare 7.png","/PrevaCare 8.png","/PrevaCare 9.png","/PrevaCare 10.png","/PrevaCare 11.png","/PrevaCare 12.png","/PrevaCare 13.png","/PrevaCare 14.png"],
    description:
      "Prevacare represents a comprehensive approach to healthcare application design, focusing on user-centric solutions that bridge the gap between patients and healthcare providers. Through extensive research, wireframing, and iterative design processes, I created an intuitive mobile interface that simplifies appointment scheduling, medical record management, and telehealth consultations. The design emphasizes accessibility, clarity, and trust-building elements essential for healthcare applications, ensuring users can navigate complex medical processes with confidence and ease.🏥✨",
    challenge:
      "Designing a healthcare application that could simplify complex medical interactions while maintaining user trust, accessibility, and ease of navigation for patients with varying levels of digital familiarity.",
    solution:
      "Developed a user-centric UI/UX design in Figma through research-driven wireframing and iterative prototyping. The interface streamlined key healthcare functions like appointment booking, medical records, and telehealth consultations using clean layouts, accessible design patterns, and trust-focused visuals to create a smooth and reassuring user experience.",
    liveUrl: "https://www.figma.com/design/7Ppr5iwdieUsmGefLfHwQg/Untitled?node-id=149-2&p=f&t=iC0ccWnTldhvyLur-0",
    color: "#c94ada",
  },
  {
    id: 8,
    type: "mobile",
    title: "ToletGlobe.in",
    tagline: "Revolutionizing Property Search for Modern India",
    category: "Real Estate Platform",
    year: "2025",
    status: "Live",
    tags: ["Figma", "Canva Pro"],
    coverImage: "/toletm.png",
    images: ["/Tolet Globe 1.png","/Tolet Globe 2.png","/Tolet Globe 3.png","/Tolet Globe 4.png","/Tolet Globe 5.png","/Tolet Globe 6.png","/Tolet Globe 7.png","/Tolet Globe 8.png"],
    description:
      "ToletGlobe.in is an emerging real estate and property management platform that assists users in finding affordable housing solutions, including houses, flats, warehouses, PGs, and offices. It offers a comprehensive suite of services for buying, selling, and renting both residential and commercial properties. Inspired by industry leaders like 99acres, the platform aims to simplify the property search process and make housing accessible for people relocating to new cities—all from the comfort of their homes. My contribution involved redesigning their landing page, focusing on improved usability, a cleaner visual hierarchy, and an overall more engaging user experience to increase user trust, enhance navigation clarity, and boost overall conversion.🏠🔍",
    challenge:
      "Improving the user experience of ToletGlobe.in by making property discovery more intuitive, trustworthy, and visually organized while handling multiple property categories and user intents within a single platform.",
    solution:
      "Redesigned the landing page in Figma with a stronger visual hierarchy, cleaner navigation flow, and conversion-focused layout inspired by modern real estate platforms. The updated experience simplified property exploration, improved content clarity, and introduced a more engaging interface that enhanced usability, user trust, and overall interaction across residential and commercial property searches.",
    color: "#5216df",
  },
  {
    id: 9,
    type: "mobile",
    title: "Kiran Foundation",
    tagline: "Lightweight Chat Interface, Built for Student Success",
    category: "Chat Interface Design",
    year: "2024",
    status: "Live",
    tags: ["Figma", "Canva", "Stitch"],
    coverImage: "/kirasnm.png",
    images: [
      "/Pink Kiran Foundation 1.png","/Pink Kiran Foundation 2.png","/Pink Kiran Foundation 3.png",
      "/Pink Kiran Foundation 4.png","/Pink Kiran Foundation 5.png","/Pink Kiran Foundation 6.png",
      "/Pink Kiran Foundation 7.png","/Pink Kiran Foundation 8.png","/Pink Kiran Foundation 9.png",
      "/Pink Kiran Foundation 10.png","/Pink Kiran Foundation 11.png","/Pink Kiran Foundation 12.png",
      "/Pink Kiran Foundation 13.png","/Pink Kiran Foundation 14.png","/Pink Kiran Foundation 15.png",
      "/Pink Kiran Foundation 16.png","/Pink Kiran Foundation 17.png","/Pink Kiran Foundation 18.png",
      "/Pink Kiran Foundation 19.png","/Pink Kiran Foundation 20.png","/Pink Kiran Foundation 21.png",
      "/Pink Kiran Foundation 22.png","/Pink Kiran Foundation 23.png","/Pink Kiran Foundation 24.png",
      "/Pink Kiran Foundation 25.png","/Pink Kiran Foundation 26.png",
    ],
    description:
      "The Kiran Foundation Chat App project aimed to design a lightweight, responsive chat interface tailored for students, inspired by platforms like WhatsApp and Slack. My role as a UI/UX designer involved identifying core usability issues such as unclear message flow and complex channel navigation in the older version. Through in-depth research and competitive analysis, I crafted a simplified, intuitive design with clear differentiation between sent and received messages using avatars, timestamps, and reactions. Key features include an In-Message Action Menu (reply, delete, pin), seamless channel switching without leaving the main screen, and a responsive mobile-friendly layout. A mini design system was developed with consistent spacing, color palettes, and reusable components to ensure scalability and clarity. The challenge was to balance feature-rich functionality with a clean, uncluttered UI, which we addressed by thoughtful layout planning and interaction design. The final result was a scalable, student-friendly chat platform ready for future enhancements while improving current user experience.💬✨",
    challenge:
      "Designing a student-friendly chat platform for the Kiran Foundation that could support feature-rich communication while avoiding cluttered interfaces, confusing message flows, and complex navigation commonly found in traditional chat systems.",
    solution:
      "Created a clean and scalable chat experience in Figma, Canva and Stitch by simplifying channel navigation, improving message clarity with avatars and timestamps, and introducing intuitive in-message actions like reply, pin, and delete. A responsive layout and mini design system with reusable UI components ensured consistency, usability, and future scalability while maintaining a lightweight and engaging user experience.",
    liveUrl: "https://www.figma.com/design/X4UmR3nO5IWDnx3ukwCv8n/Untitled?node-id=11-34&p=f&t=iC0ccWnTldhvyLur-0",
    color: "#df16df",
  },
];

/* ─── Travelling Border Light (project modal) ─────────────────────── */
function ModalTravellingBorder({ color, width, height, radius = 22 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const straight = 2 * (width - 2 * radius) + 2 * (height - 2 * radius);
    const curves = 2 * Math.PI * radius;
    const perimeter = straight + curves;
    let progress = 0;

    function rrPath() {
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.arcTo(width, 0, width, radius, radius);
      ctx.lineTo(width, height - radius);
      ctx.arcTo(width, height, width - radius, height, radius);
      ctx.lineTo(radius, height);
      ctx.arcTo(0, height, 0, height - radius, radius);
      ctx.lineTo(0, radius);
      ctx.arcTo(0, 0, radius, 0, radius);
      ctx.closePath();
    }

    function pointAt(d) {
      d = ((d % perimeter) + perimeter) % perimeter;
      const segTop = width - 2 * radius;
      const arcLen = (Math.PI / 2) * radius;
      const segRight = height - 2 * radius;
      const segBot = width - 2 * radius;
      const segLeft = height - 2 * radius;
      let rem = d;
      if (rem < segTop) return { x: radius + rem, y: 0 };
      rem -= segTop;
      if (rem < arcLen) { const a = -Math.PI / 2 + (rem / radius); return { x: width - radius + Math.cos(a) * radius, y: radius + Math.sin(a) * radius }; }
      rem -= arcLen;
      if (rem < segRight) return { x: width, y: radius + rem };
      rem -= segRight;
      if (rem < arcLen) { const a = 0 + (rem / radius); return { x: width - radius + Math.cos(a) * radius, y: height - radius + Math.sin(a) * radius }; }
      rem -= arcLen;
      if (rem < segBot) return { x: width - radius - rem, y: height };
      rem -= segBot;
      if (rem < arcLen) { const a = Math.PI / 2 + (rem / radius); return { x: radius + Math.cos(a) * radius, y: height - radius + Math.sin(a) * radius }; }
      rem -= arcLen;
      if (rem < segLeft) return { x: 0, y: height - radius - rem };
      rem -= segLeft;
      const a = Math.PI + (rem / radius);
      return { x: radius + Math.cos(a) * radius, y: radius + Math.sin(a) * radius };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      rrPath();
      ctx.strokeStyle = "rgba(167,139,250,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();
      const tailCount = 32;
      const tailLen = perimeter * 0.08;
      for (let i = 0; i <= tailCount; i++) {
        const t = i / tailCount;
        const dist = progress - (1 - t) * tailLen;
        const pt = pointAt(dist);
        const alpha = t * t;
        const r = t * 2.2 + 0.5;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        if (i === tailCount) { ctx.fillStyle = `rgba(255,255,255,${alpha})`; }
        else { const hex = Math.round(alpha * 0.9 * 255).toString(16).padStart(2, "0"); ctx.fillStyle = `${color}${hex}`; }
        ctx.fill();
      }
      const tip = pointAt(progress);
      const grd = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 12);
      grd.addColorStop(0, `${color}99`);
      grd.addColorStop(1, `${color}00`);
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      progress = (progress + perimeter / 220) % perimeter;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [color, width, height, radius]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10, borderRadius: radius }}
    />
  );
}

function ModalWithBorder({ color, children }) {
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: Math.round(entry.contentRect.width), h: Math.round(entry.contentRect.height) });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative", width: "100%", maxWidth: 860, flexShrink: 0,
        borderRadius: 22, boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        animation: "mPop 0.35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {size.w > 0 && size.h > 0 && (
        <ModalTravellingBorder color={color} width={size.w} height={size.h} radius={22} />
      )}
      {children}
    </div>
  );
}

/* ─── Lightbox (zoom overlay) ─────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  useEffect(() => { setZoomed(false); }, [idx]);

  const prev = (e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); };

  const onTouchStart = (e) => setDragStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (dragStart === null) return;
    const diff = dragStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? setIdx((i) => (i + 1) % images.length) : setIdx((i) => (i - 1 + images.length) % images.length);
    setDragStart(null);
  };

  return (
    <div
      className="lb-backdrop"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="lb-close" onClick={onClose} aria-label="Close lightbox">✕</button>
      <div className="lb-counter">{idx + 1} / {images.length}</div>
      <div
        className={`lb-img-wrap${zoomed ? " lb-zoomed" : ""}`}
        onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
        title={zoomed ? "Click to zoom out" : "Click to zoom in"}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={images[idx]}
          src={images[idx]}
          alt={`Image ${idx + 1}`}
          className="lb-img"
          draggable={false}
        />
        {!zoomed && (
          <div className="lb-zoom-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
            </svg>
            Click to zoom
          </div>
        )}
      </div>
      {images.length > 1 && (
        <>
          <button className="lb-arrow lb-prev" onClick={prev} aria-label="Previous image">‹</button>
          <button className="lb-arrow lb-next" onClick={next} aria-label="Next image">›</button>
        </>
      )}
      {images.length > 1 && (
        <div className="lb-dots" onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`lb-dot${i === idx ? " lb-dot-on" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [dots, setDots] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    setDots(
      Array.from({ length: 38 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.4 + 0.4,
        op: Math.random() * 0.5 + 0.15,
        dur: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 4}s`,
      }))
    );
  }, []);

  const openModal = (p) => { setSelected(p); setImgIndex(0); document.body.style.overflow = "hidden"; };
  const closeModal = () => { setSelected(null); setLightboxIndex(null); document.body.style.overflow = ""; };
  const openLightbox = (idx) => { setLightboxIndex(idx); };
  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && lightboxIndex === null) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const prevImg = () => setImgIndex((i) => (i - 1 + selected.images.length) % selected.images.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % selected.images.length);

  // Split the 9 Figma projects into 3 rows of 3.
  const rows = [PROJECTS.slice(0, 3), PROJECTS.slice(3, 6), PROJECTS.slice(6, 9)];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .pr-root {
          min-height: 100vh; padding: 110px 5vw 90px;
          font-family: 'Syne', sans-serif; color: #e8e0ff;
          position: relative; overflow-x: hidden;
        }
        .pr-dot {
          position: absolute; border-radius: 50%; background: #fff; pointer-events: none;
          animation: prTwinkle var(--dur) ease-in-out infinite alternate var(--delay);
        }
        @keyframes prTwinkle {
          from { opacity: var(--op); transform: scale(1); }
          to   { opacity: calc(var(--op) * 0.18); transform: scale(0.5); }
        }
        .pr-header { text-align: center; margin-bottom: 48px; position: relative; z-index: 2; }
        .pr-eyebrow { font-size: 10px; letter-spacing: .38em; text-transform: uppercase; color: #a78bfa; margin-bottom: 12px; }
        .pr-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 3.6vw, 46px); font-weight: 300; margin: 0;
          background: linear-gradient(135deg, #f0ebff 20%, #a78bfa 55%, #818cf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1.05;
        }
        .pr-divider { width: 70px; height: 1px; background: linear-gradient(90deg, transparent, #7c3aed, transparent); margin: 18px auto 0; }

        /* ══════════════════ HERO PROJECT — one viewport, two columns ══════════════════ */
        .hero-section {
          max-width: 1320px; margin: 0 auto 64px; position: relative; z-index: 2;
        }
        .hero-card {
          position: relative;
          display: flex; flex-direction: row; align-items: stretch;
          border-radius: 28px;
          overflow: hidden;
          height: min(88vh, 800px);
          min-height: 560px;
          background: linear-gradient(155deg, rgba(16,10,34,0.92) 0%, rgba(8,5,18,0.96) 100%);
          border: 1px solid rgba(139,123,255,0.16);
          box-shadow: 0 40px 120px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(139,123,255,0.08) inset;
          isolation: isolate;
        }
        .hero-spotlight {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: radial-gradient(480px circle at var(--spot-x) var(--spot-y),
            color-mix(in srgb, var(--c1) 22%, transparent) 0%,
            color-mix(in srgb, var(--c2) 10%, transparent) 35%,
            transparent 70%);
          transition: background 0.05s linear;
          mix-blend-mode: screen;
        }
        .hero-particles { position: absolute; inset: 0; z-index: 2; pointer-events: none; overflow: hidden; }
        .hero-particle {
          position: absolute; bottom: -10px; border-radius: 50%;
          animation: heroFloat linear infinite;
          opacity: 0;
        }
        @keyframes heroFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          8% { opacity: 0.85; }
          92% { opacity: 0.5; }
          100% { transform: translateY(-70vh) translateX(var(--drift)); opacity: 0; }
        }

        /* LEFT — cinematic media, 58% */
        .hero-left {
          position: relative; flex: 0 0 58%; max-width: 58%;
          overflow: hidden; background: #05030c;
        }
        .hero-media-scale {
          position: absolute; inset: 0;
          transition: transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .hero-media-el {
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          display: block; filter: saturate(1.08) contrast(1.04);
        }
        .hero-media-gradient {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to top, rgba(8,5,18,0.9) 0%, rgba(8,5,18,0.15) 38%, transparent 60%);
        }
        .hero-media-vignette {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          box-shadow: inset 0 0 140px 40px rgba(3,1,10,0.55);
        }
        .hero-media-edge {
          position: absolute; top: 0; right: 0; bottom: 0; width: 120px; z-index: 1; pointer-events: none;
          background: linear-gradient(to right, transparent, rgba(8,5,18,0.9));
        }
        .hero-badges {
          position: absolute; top: 22px; left: 24px; z-index: 4;
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Syne', sans-serif; font-size: 10.5px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          padding: 7px 14px; border-radius: 999px;
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
        }
        .hero-badge-star {
          background: linear-gradient(120deg, rgba(139,123,255,0.35), rgba(90,200,255,0.28));
          border: 1px solid rgba(200,190,255,0.5);
          color: #fff;
          box-shadow: 0 0 22px rgba(139,123,255,0.35);
        }
        .hero-badge-engine {
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(139,123,255,0.35);
          color: rgba(220,215,255,0.92);
        }

        /* RIGHT — content, 42%, vertically centered */
        .hero-right {
          position: relative; z-index: 3; flex: 0 0 42%; max-width: 42%;
          display: flex; align-items: center; overflow: hidden;
        }
        .hero-right-inner {
          width: 100%; padding: 0 clamp(22px, 2.6vw, 40px);
          display: flex; flex-direction: column; gap: clamp(8px, 1.3vh, 15px);
        }
        .hero-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .hero-mbadge { font-size: 9px; letter-spacing: .22em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; border: 0.5px solid rgba(139,123,255,0.35); background: rgba(139,123,255,0.14); color: rgba(190,180,255,0.95); }
        .hero-mdot { color: rgba(139,123,255,0.3); font-size: 11px; }
        .hero-myear { font-size: 11px; color: rgba(180,170,255,0.5); letter-spacing: .12em; }
        .hero-mstatus { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; background: rgba(16,185,129,0.14); border: 0.5px solid rgba(16,185,129,0.35); color: #6ee7b7; }
        .hero-title {
          font-family: 'Cormorant Garamond', serif; font-weight: 400;
          font-size: clamp(1.6rem, 2.6vw, 2.4rem); line-height: 1.08; margin: 0;
          color: #f3efff;
        }
        .hero-title-accent {
          display: block;
          font-size: 0.5em;
          margin-top: 6px;
          background: linear-gradient(120deg, var(--c1), var(--c2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-tagline {
          font-size: clamp(12px, 1vw, 14px); line-height: 1.6; color: rgba(210,200,255,0.55); margin: 0;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .hero-tech { display: flex; flex-wrap: wrap; gap: 6px; max-height: 62px; overflow: hidden; }
        .hero-chip {
          font-size: 10.5px; letter-spacing: .04em; font-weight: 500;
          color: rgba(210,200,255,0.85);
          background: rgba(139,123,255,0.1);
          border: 1px solid rgba(139,123,255,0.25);
          border-radius: 7px; padding: 5px 11px;
          transition: all 0.25s ease;
        }
        .hero-chip:hover { background: rgba(139,123,255,0.22); border-color: rgba(139,123,255,0.5); transform: translateY(-1px); }

        .hero-summary {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(139,123,255,0.14);
          border-radius: 14px; padding: 10px 14px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .hero-summary-line {
          font-size: 11.5px; line-height: 1.5; color: rgba(210,200,255,0.6); margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .hero-summary-line span {
          display: inline-block; font-family: 'Syne', sans-serif; font-size: 8.5px;
          letter-spacing: .22em; text-transform: uppercase; color: rgba(180,170,255,0.8);
          margin-right: 9px; font-weight: 600;
        }

        .hero-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
          background: rgba(139,123,255,0.14);
          border: 1px solid rgba(139,123,255,0.14);
          border-radius: 12px; overflow: hidden;
        }
        .hero-stat { background: rgba(12,7,26,0.9); padding: 9px 11px; }
        .hero-stat-label { font-size: 7.5px; letter-spacing: .2em; text-transform: uppercase; color: rgba(170,160,255,0.55); margin-bottom: 4px; }
        .hero-stat-value { font-family: 'Cormorant Garamond', serif; font-size: 0.88rem; color: #ede9fe; line-height: 1.2; }

        .hero-cta {
          position: relative; display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 24px 12px 17px; border-radius: 999px; text-decoration: none;
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .05em;
          color: #fff; overflow: hidden; cursor: pointer; isolation: isolate;
          width: fit-content;
          background: linear-gradient(115deg, var(--c1), var(--c2), var(--c1));
          background-size: 220% 220%;
          animation: heroGradientShift 6s ease infinite;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.12) inset, 0 14px 40px rgba(90,80,255,0.35);
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
        }
        @keyframes heroGradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .hero-cta:hover {
          transform: translateY(-3px) scale(1.015);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.22) inset, 0 20px 60px rgba(120,100,255,0.55);
        }
        .hero-cta-play {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          background: rgba(255,255,255,0.22);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.3) inset;
        }
        .hero-cta-shine {
          position: absolute; top: 0; left: -60%; width: 45%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: heroShine 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes heroShine {
          0% { left: -60%; }
          45% { left: 130%; }
          100% { left: 130%; }
        }
        .hero-cta-ripple {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: rgba(255,255,255,0.5);
          transform: translate(-50%, -50%);
          width: 8px; height: 8px;
          animation: heroRipple 0.65s ease-out forwards;
        }
        @keyframes heroRipple { to { width: 340px; height: 340px; opacity: 0; } }

        @media (max-width: 980px) {
          .hero-card { flex-direction: column; height: auto; min-height: 0; }
          .hero-left { flex-basis: auto; max-width: 100%; height: 44vh; min-height: 300px; }
          .hero-right { flex-basis: auto; max-width: 100%; }
          .hero-right-inner { padding: 26px clamp(20px, 4vw, 36px) 32px; gap: 13px; }
          .hero-tagline { -webkit-line-clamp: 4; }
        }

        /* ══════════════════ FIGMA PROJECTS — 3 rows of 3, each row ≈ one screen ══════════════════ */
        .pr-rows { max-width: 1080px; margin: 0 auto; position: relative; z-index: 2; }
        .pr-row {
          display: flex; align-items: center; justify-content: center;
          min-height: 86vh;
          padding: 24px 0;
        }
        .pr-row + .pr-row { margin-top: 8px; }
        .pr-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 32px; width: 100%;
        }
        @media (max-width: 900px) { .pr-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; } .pr-row { min-height: auto; padding: 16px 0; } }
        @media (max-width: 560px) { .pr-grid { grid-template-columns: 1fr; gap: 16px; } .pr-row { min-height: auto; } }
        .pr-card {
          display: flex; flex-direction: column; border-radius: 13px; overflow: hidden;
          border: 1px solid rgba(167,139,250,0.14);
          background: linear-gradient(160deg, rgba(14,8,28,0.98) 0%, rgba(10,5,20,0.98) 100%);
          box-shadow: 0 8px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(167,139,250,0.07) inset;
          cursor: pointer;
          transition: transform 0.38s cubic-bezier(.22,1,.36,1), border-color 0.3s, box-shadow 0.38s;
          animation: cardUp 0.65s cubic-bezier(.22,1,.36,1) both;
        }
        .pr-card:hover {
          transform: translateY(-8px) scale(1.015);
          border-color: rgba(167,139,250,0.4);
          box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(167,139,250,0.22) inset, 0 0 100px rgba(124,58,237,0.12);
        }
        @keyframes cardUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .card-img-wrap {
          position: relative; width: 100%; overflow: hidden;
          aspect-ratio: 3 / 4;
          background: rgba(0,0,0,0.45); flex-shrink: 0;
        }
        .card-img-scale {
          position: absolute; inset: 0;
          transition: transform 0.55s cubic-bezier(.22,1,.36,1);
        }
        .pr-card:hover .card-img-scale { transform: scale(1.07); }
        .card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(10,5,22,0.65) 100%);
          pointer-events: none; z-index: 1;
        }
        .card-img-accent { position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 2; }
        .card-num-badge {
          position: absolute; top: 10px; left: 11px; z-index: 2;
          font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 300;
          color: rgba(255,255,255,0.55); text-shadow: 0 2px 12px rgba(0,0,0,0.6);
        }
        .card-cat-badge {
          position: absolute; top: 8px; right: 8px; z-index: 2;
          font-size: 6.5px; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(232,224,255,0.85); background: rgba(20,10,40,0.9);
          border: 1px solid rgba(167,139,250,0.25); border-radius: 999px; padding: 3px 7px;
          max-width: calc(100% - 16px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .card-body { padding: 15px 15px 17px; display: flex; flex-direction: column; flex: 1; }
        .card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 500; color: #ede9fe; margin: 0 0 5px; line-height: 1.2; }
        .card-tagline {
          font-size: 10px; color: rgba(200,185,255,0.5); line-height: 1.6; margin: 0 0 12px; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .card-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
        .ctag { font-size: 7.5px; letter-spacing: .06em; color: rgba(167,139,250,0.65); background: rgba(124,58,237,0.14); border: 1px solid rgba(167,139,250,0.18); border-radius: 4px; padding: 2px 6px; }
        .card-btn {
          display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; border-radius: 999px;
          border: 1px solid rgba(167,139,250,0.25); background: rgba(255,255,255,0.06);
          color: rgba(200,185,255,0.85); font-family: 'Syne', sans-serif; font-size: 9px;
          font-weight: 500; letter-spacing: .05em; cursor: pointer; transition: all 0.25s ease;
          width: fit-content; margin-top: auto;
        }
        .card-btn:hover { border-color: rgba(167,139,250,0.55); background: rgba(124,58,237,0.28); color: #fff; transform: translateX(3px); box-shadow: 0 0 20px rgba(124,58,237,0.25); }
        .btn-arrow { transition: transform 0.25s; display: inline-block; }
        .card-btn:hover .btn-arrow { transform: translateX(4px); }

        /* ── MODAL ── */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(4, 2, 18, 0.55); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: flex-start; justify-content: center;
          padding: 80px 20px 24px; overflow-y: auto; animation: bfIn 0.25s ease;
        }
        @keyframes bfIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes mPop { from { transform: scale(0.94) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
        .modal-box {
          position: relative; width: 100%; background: rgba(8, 4, 22, 0.98);
          border-radius: 22px; overflow: hidden; display: flex; flex-direction: column;
          max-height: calc(100vh - 104px);
        }
        .modal-top-bar { height: 1px; width: 100%; flex-shrink: 0; }
        .modal-close {
          position: absolute; top: 14px; right: 14px; width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.06); border: 0.5px solid rgba(167,139,250,0.4);
          color: rgba(232,224,255,0.8); font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; z-index: 20; backdrop-filter: blur(10px);
        }
        .modal-close:hover { background: rgba(124,58,237,0.35); border-color: rgba(167,139,250,0.8); color: #fff; box-shadow: 0 0 12px rgba(124,58,237,0.5); }
        .modal-gallery {
          position: relative; width: 100%; height: 55vh; flex-shrink: 0;
          overflow: hidden; background: rgba(0,0,0,0.3);
        }
        .mgal-img-wrap {
          position: absolute; inset: 0;
          opacity: 0; transition: opacity 0.45s ease;
        }
        .mgal-img-wrap.show { opacity: 1; }
        .mgal-pdf { width: 100%; height: 100%; border: none; display: block; }
        .gal-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 75%, rgba(4,2,18,0.3) 100%);
          pointer-events: none; z-index: 2;
        }
        .gal-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(0,0,0,0.4); border: 0.5px solid rgba(167,139,250,0.35);
          color: rgba(255,255,255,0.85); font-size: 20px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 5; transition: all 0.2s; backdrop-filter: blur(8px);
        }
        .gal-arrow:hover { background: rgba(124,58,237,0.45); border-color: rgba(167,139,250,0.7); box-shadow: 0 0 12px rgba(124,58,237,0.4); }
        .gal-arrow.prev { left: 14px; }
        .gal-arrow.next { right: 14px; }
        .gal-dots {
          position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 7px; align-items: center; z-index: 5;
        }
        .gal-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.25); border: none; padding: 0; cursor: pointer; transition: all 0.25s; }
        .gal-dot.on { background: #a78bfa; width: 16px; border-radius: 3px; box-shadow: 0 0 6px rgba(167,139,250,0.6); }

        .gal-img-clickable {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: contain; object-position: center;
          cursor: zoom-in; z-index: 3;
          transition: transform 0.3s ease;
        }
        .gal-img-clickable:hover { transform: scale(1.02); }

        .modal-divider { width: 100%; height: 0.5px; flex-shrink: 0; background: linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent); }
        .modal-content {
          padding: 24px 32px 32px; overflow-y: auto; flex: 1;
          scrollbar-width: thin; scrollbar-color: rgba(124,58,237,0.3) transparent;
        }
        .modal-content::-webkit-scrollbar { width: 3px; }
        .modal-content::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.35); border-radius: 99px; }
        @media (max-width: 600px) { .modal-content { padding: 16px 16px 22px; } .modal-gallery { height: 42vh; } .modal-backdrop { padding: 70px 10px 16px; } }
        .modal-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
        .mbadge { font-size: 9px; letter-spacing: .24em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; border: 0.5px solid rgba(167,139,250,0.3); background: rgba(124,58,237,0.14); color: rgba(167,139,250,0.9); }
        .mdot { color: rgba(167,139,250,0.25); font-size: 10px; }
        .myear { font-size: 11px; color: rgba(167,139,250,0.45); letter-spacing: .12em; }
        .mstatus { font-size: 9px; letter-spacing: .22em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; background: rgba(16,185,129,0.12); border: 0.5px solid rgba(16,185,129,0.3); color: #6ee7b7; }
        .modal-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.7rem, 4vw, 2.5rem); font-weight: 400; color: #ede9fe; margin: 0 0 6px; line-height: 1.1; }
        .modal-tagline { font-size: 13px; color: rgba(200,185,255,0.42); margin: 0 0 18px; line-height: 1.65; }
        .modal-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 20px; }
        .mtag { font-size: 10.5px; letter-spacing: .08em; color: rgba(167,139,250,0.7); background: rgba(124,58,237,0.12); border: 0.5px solid rgba(167,139,250,0.18); border-radius: 7px; padding: 4px 11px; }
        .modal-overview { background: rgba(255,255,255,0.05); border: 0.5px solid rgba(167,139,250,0.12); border-radius: 12px; padding: 18px 20px; margin-bottom: 14px; }
        .sec-label { font-size: 8.5px; letter-spacing: .3em; text-transform: uppercase; color: rgba(167,139,250,0.7); margin-bottom: 8px; }
        .sec-text { font-size: 13px; line-height: 1.9; color: rgba(200,185,255,0.55); }
        .modal-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
        @media (max-width: 620px) { .modal-2col { grid-template-columns: 1fr; } }
        .modal-section { background: rgba(255,255,255,0.04); border: 0.5px solid rgba(167,139,250,0.1); border-radius: 12px; padding: 16px 18px; }
        .modal-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .cta-a { display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 999px; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .07em; text-decoration: none; transition: all 0.25s; cursor: pointer; }
        .cta-primary { background: rgba(124,58,237,0.85); color: #fff; border: 0.5px solid rgba(167,139,250,0.5); box-shadow: 0 0 18px rgba(124,58,237,0.35), inset 0 0 0 0.5px rgba(255,255,255,0.08); }
        .cta-primary:hover { transform: translateY(-2px); background: rgba(124,58,237,0.95); box-shadow: 0 0 32px rgba(124,58,237,0.55), inset 0 0 0 0.5px rgba(255,255,255,0.12); }
        .cta-ghost { background: rgba(255,255,255,0.06); color: rgba(200,185,255,.75); border: 0.5px solid rgba(167,139,250,.2); }
        .cta-ghost:hover { border-color: rgba(167,139,250,.5); background: rgba(124,58,237,.18); color: #fff; transform: translateY(-2px); box-shadow: 0 0 16px rgba(124,58,237,0.2); }

        /* ── LIGHTBOX ── */
        .lb-backdrop {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(2, 1, 12, 0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          display: flex; align-items: center; justify-content: center;
          animation: bfIn 0.2s ease;
          padding: 20px;
        }
        .lb-close {
          position: absolute; top: 18px; right: 18px; width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.07); border: 0.5px solid rgba(167,139,250,0.45);
          color: rgba(232,224,255,0.85); font-size: 17px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; z-index: 10; backdrop-filter: blur(10px);
        }
        .lb-close:hover { background: rgba(124,58,237,0.4); border-color: rgba(167,139,250,0.9); color: #fff; box-shadow: 0 0 14px rgba(124,58,237,0.55); }
        .lb-counter {
          position: absolute; top: 22px; left: 50%; transform: translateX(-50%);
          font-family: 'Syne', sans-serif; font-size: 11px; letter-spacing: .18em;
          color: rgba(167,139,250,0.7); background: rgba(20,10,40,0.6);
          border: 0.5px solid rgba(167,139,250,0.2); border-radius: 999px; padding: 4px 14px;
          backdrop-filter: blur(8px); z-index: 10;
        }
        .lb-img-wrap {
          position: relative; max-width: 90vw; max-height: 85vh;
          display: flex; align-items: center; justify-content: center;
          cursor: zoom-in;
          animation: lbImgPop 0.25s cubic-bezier(.22,1,.36,1);
        }
        @keyframes lbImgPop { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }
        .lb-img-wrap.lb-zoomed { cursor: zoom-out; overflow: auto; }
        .lb-img {
          max-width: 90vw; max-height: 85vh;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(167,139,250,0.15);
          display: block;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), border-radius 0.3s;
          user-select: none;
          -webkit-user-drag: none;
        }
        .lb-img-wrap.lb-zoomed .lb-img {
          max-width: none; max-height: none;
          width: 180%; height: auto;
          border-radius: 6px;
          cursor: zoom-out;
        }
        .lb-zoom-hint {
          position: absolute; bottom: 14px; right: 14px;
          display: flex; align-items: center; gap: 5px;
          font-family: 'Syne', sans-serif; font-size: 10px; letter-spacing: .12em;
          color: rgba(200,185,255,0.55); background: rgba(10,5,25,0.65);
          border: 0.5px solid rgba(167,139,250,0.18); border-radius: 999px;
          padding: 4px 10px; backdrop-filter: blur(8px);
          pointer-events: none;
          animation: hintFade 0.4s ease 1.2s both;
        }
        @keyframes hintFade { from { opacity: 0; } to { opacity: 1; } }
        .lb-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(0,0,0,0.5); border: 0.5px solid rgba(167,139,250,0.35);
          color: rgba(255,255,255,0.9); font-size: 24px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; transition: all 0.2s; backdrop-filter: blur(8px);
        }
        .lb-arrow:hover { background: rgba(124,58,237,0.5); border-color: rgba(167,139,250,0.75); box-shadow: 0 0 16px rgba(124,58,237,0.45); }
        .lb-prev { left: 18px; }
        .lb-next { right: 18px; }
        @media (max-width: 600px) { .lb-prev { left: 8px; } .lb-next { right: 8px; } .lb-arrow { width: 36px; height: 36px; font-size: 18px; } }
        .lb-dots {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 7px; align-items: center; z-index: 10;
          max-width: 90vw; overflow-x: auto; padding: 0 10px;
        }
        .lb-dot {
          flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.22); border: none; padding: 0; cursor: pointer; transition: all 0.22s;
        }
        .lb-dot.lb-dot-on { background: #a78bfa; width: 18px; border-radius: 3px; box-shadow: 0 0 6px rgba(167,139,250,0.65); }
      ` }} />

      <div className="pr-root" style={{ color: "#e8e0ff", position: "relative", zIndex: 10 }}>
        {dots.map((d) => (
          <span key={d.id} className="pr-dot" style={{ top: d.top, left: d.left, width: d.size, height: d.size, "--op": d.op, "--dur": d.dur, "--delay": d.delay }} />
        ))}

        <header className="pr-header">
          <p className="pr-eyebrow">My Work</p>
          <h1 className="pr-title">Projects</h1>
          <div className="pr-divider" />
        </header>

        <HeroProject data={HERO_PROJECT} />

        <div className="pr-rows">
          {rows.map((row, ri) => (
            <div className="pr-row" key={ri}>
              <div className="pr-grid">
                {row.map((p, i) => (
                  <div
                    key={p.id}
                    className="pr-card"
                    style={{ animationDelay: `${0.05 + (ri * 3 + i) * 0.07}s` }}
                    onClick={() => openModal(p)}
                  >
                    <div
                      className="card-img-wrap"
                      style={{ aspectRatio: p.type === "mobile" ? "3/4" : p.type === "pdf" ? "3/4" : "16/9" }}
                    >
                      <div className="card-img-accent" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                      <div className="card-img-scale">
                        <Image
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          sizes="(max-width: 420px) 50vw, (max-width: 680px) 50vw, (max-width: 980px) 33vw, (max-width: 1180px) 25vw, 20vw"
                          style={{ objectFit: "cover" }}
                          priority={ri === 0 && i < 3}
                          onError={() => {}}
                        />
                      </div>
                      <div className="card-img-overlay" />
                      <span className="card-cat-badge">{p.category}</span>
                    </div>

                    <div className="card-body">
                      <h2 className="card-title">{p.title}</h2>
                      <p className="card-tagline">{p.tagline}</p>
                      <div className="card-tags">
                        {p.tags.slice(0, 2).map((t) => <span key={t} className="ctag">{t}</span>)}
                        {p.tags.length > 2 && <span className="ctag">+{p.tags.length - 2}</span>}
                      </div>
                      <button className="card-btn" onClick={(e) => { e.stopPropagation(); openModal(p); }}>
                        View Details <span className="btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROJECT MODAL ── */}
      {selected && (
        <div
          className="modal-backdrop"
          ref={backdropRef}
          onClick={(e) => e.target === backdropRef.current && closeModal()}
        >
          <ModalWithBorder color={selected.color}>
            <div className="modal-box" role="dialog" aria-modal="true">
              <div className="modal-top-bar" style={{ background: `linear-gradient(90deg, transparent, ${selected.color}ee, rgba(167,139,250,1), ${selected.color}ee, transparent)` }} />
              <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>

              <div className="modal-gallery">
                {selected.type === "pdf" ? (
                  <iframe src={selected.images[0]} title={selected.title} className="mgal-pdf" />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={selected.images[imgIndex]}
                      src={selected.images[imgIndex]}
                      alt={`${selected.title} screenshot ${imgIndex + 1}`}
                      className="gal-img-clickable"
                      onClick={() => openLightbox(imgIndex)}
                      title="Click to view full size"
                    />

                    {selected.images[imgIndex + 1] && (
                      <link rel="preload" as="image" href={selected.images[imgIndex + 1]} />
                    )}

                    <div className="gal-overlay" style={{ pointerEvents: "none" }} />
                    {selected.images.length > 1 && (
                      <>
                        <button className="gal-arrow prev" onClick={prevImg} aria-label="Previous">‹</button>
                        <button className="gal-arrow next" onClick={nextImg} aria-label="Next">›</button>
                      </>
                    )}
                    <div className="gal-dots">
                      {selected.images.map((_, idx) => (
                        <button
                          key={idx}
                          className={`gal-dot${imgIndex === idx ? " on" : ""}`}
                          onClick={() => setImgIndex(idx)}
                          aria-label={`Image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="modal-divider" />

              <div className="modal-content">
                <div className="modal-meta">
                  <span className="mbadge">{selected.category}</span>
                  <span className="mdot">·</span>
                  <span className="myear">{selected.year}</span>
                  <span className="mdot">·</span>
                  <span className="mstatus">{selected.status}</span>
                </div>
                <h2 className="modal-title">{selected.title}</h2>
                <p className="modal-tagline">{selected.tagline}</p>
                <div className="modal-tags">
                  {selected.tags.map((t) => <span key={t} className="mtag">{t}</span>)}
                </div>
                <div className="modal-overview">
                  <p className="sec-label">Overview</p>
                  <p className="sec-text">{selected.description}</p>
                </div>
                <div className="modal-2col">
                  <div className="modal-section">
                    <p className="sec-label">The Challenge</p>
                    <p className="sec-text">{selected.challenge}</p>
                  </div>
                  <div className="modal-section">
                    <p className="sec-label">The Solution</p>
                    <p className="sec-text">{selected.solution}</p>
                  </div>
                </div>
                {(selected.liveUrl || selected.githubUrl) && (
                  <div className="modal-cta">
                    {selected.liveUrl && (
                      <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="cta-a cta-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {selected.githubUrl && (
                      <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="cta-a cta-ghost">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        View Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ModalWithBorder>
        </div>
      )}

      {/* ── LIGHTBOX ZOOM OVERLAY ── */}
      {selected && lightboxIndex !== null && (
        <Lightbox
          images={selected.images}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
