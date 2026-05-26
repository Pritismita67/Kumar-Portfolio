"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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

/* ─── Travelling Border Light ─────────────────────────────────────── */
function TravellingBorder({ color, width, height, radius = 22 }) {
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
        <TravellingBorder color={color} width={size.w} height={size.h} radius={22} />
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

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  // Reset zoom when image changes
  useEffect(() => { setZoomed(false); }, [idx]);

  const prev = (e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); };

  // Touch swipe
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
      {/* Close button */}
      <button className="lb-close" onClick={onClose} aria-label="Close lightbox">✕</button>

      {/* Counter */}
      <div className="lb-counter">{idx + 1} / {images.length}</div>

      {/* Main image */}
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
        {/* Zoom hint */}
        {!zoomed && (
          <div className="lb-zoom-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
            </svg>
            Click to zoom
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button className="lb-arrow lb-prev" onClick={prev} aria-label="Previous image">‹</button>
          <button className="lb-arrow lb-next" onClick={next} aria-label="Next image">›</button>
        </>
      )}

      {/* Dot strip */}
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
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed
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
      // Only close modal on Escape if lightbox is NOT open (lightbox handles its own Escape)
      if (e.key === "Escape" && lightboxIndex === null) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const prevImg = () => setImgIndex((i) => (i - 1 + selected.images.length) % selected.images.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % selected.images.length);

  return (
    <>
      <style>{`
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
        .pr-header { text-align: center; margin-bottom: 68px; position: relative; z-index: 2; }
        .pr-eyebrow { font-size: 10px; letter-spacing: .38em; text-transform: uppercase; color: #a78bfa; margin-bottom: 12px; }
        .pr-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 5.5rem); font-weight: 300; margin: 0;
          background: linear-gradient(135deg, #f0ebff 20%, #a78bfa 55%, #818cf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1.05;
        }
        .pr-divider { width: 70px; height: 1px; background: linear-gradient(90deg, transparent, #7c3aed, transparent); margin: 18px auto 0; }
        .pr-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 26px; max-width: 1200px; margin: 0 auto; position: relative; z-index: 2;
        }
        @media (max-width: 980px) { .pr-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .pr-grid { grid-template-columns: 1fr; } }
        .pr-card {
          display: flex; flex-direction: column; border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(167,139,250,0.14);
          background: linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(124,58,237,0.06) 100%);
          backdrop-filter: blur(18px) saturate(1.3); -webkit-backdrop-filter: blur(18px) saturate(1.3);
          box-shadow: 0 8px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(167,139,250,0.07) inset;
          cursor: pointer;
          transition: transform 0.38s cubic-bezier(.22,1,.36,1), border-color 0.3s, box-shadow 0.38s;
          animation: cardUp 0.65s cubic-bezier(.22,1,.36,1) both;
        }
        .pr-card:hover {
          transform: translateY(-9px) scale(1.012);
          border-color: rgba(167,139,250,0.4);
          box-shadow: 0 24px 64px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(167,139,250,0.22) inset, 0 0 90px rgba(124,58,237,0.11);
        }
        @keyframes cardUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .card-img-wrap {
          position: relative; width: 100%; overflow: hidden;
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
        .card-img-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 2; }
        .card-num-badge {
          position: absolute; top: 12px; left: 14px; z-index: 2;
          font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 300;
          color: rgba(255,255,255,0.55); text-shadow: 0 2px 12px rgba(0,0,0,0.6);
        }
        .card-cat-badge {
          position: absolute; top: 12px; right: 14px; z-index: 2;
          font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(232,224,255,0.85); background: rgba(20,10,40,0.65);
          border: 1px solid rgba(167,139,250,0.25); border-radius: 999px; padding: 4px 10px;
          backdrop-filter: blur(8px);
        }
        .card-body { padding: 22px 22px 20px; display: flex; flex-direction: column; flex: 1; }
        .card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #ede9fe; margin: 0 0 7px; line-height: 1.2; }
        .card-tagline { font-size: 12.5px; color: rgba(200,185,255,0.5); line-height: 1.65; margin: 0 0 16px; flex: 1; }
        .card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
        .ctag { font-size: 10px; letter-spacing: .1em; color: rgba(167,139,250,0.65); background: rgba(124,58,237,0.09); border: 1px solid rgba(167,139,250,0.18); border-radius: 6px; padding: 3px 9px; }
        .card-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 999px;
          border: 1px solid rgba(167,139,250,0.25); background: rgba(255,255,255,0.04);
          color: rgba(200,185,255,0.85); font-family: 'Syne', sans-serif; font-size: 12px;
          font-weight: 500; letter-spacing: .06em; cursor: pointer; transition: all 0.25s ease;
          width: fit-content; backdrop-filter: blur(8px); margin-top: auto;
        }
        .card-btn:hover { border-color: rgba(167,139,250,0.55); background: rgba(124,58,237,0.18); color: #fff; transform: translateX(3px); box-shadow: 0 0 20px rgba(124,58,237,0.25); }
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
          position: relative; width: 100%; background: rgba(8, 4, 22, 0.92);
          backdrop-filter: blur(28px) saturate(1.6); -webkit-backdrop-filter: blur(28px) saturate(1.6);
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

        /* ── CLICKABLE image + zoom-in cursor hint ── */
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
        .mbadge { font-size: 9px; letter-spacing: .24em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; border: 0.5px solid rgba(167,139,250,0.3); background: rgba(124,58,237,0.12); color: rgba(167,139,250,0.9); }
        .mdot { color: rgba(167,139,250,0.25); font-size: 10px; }
        .myear { font-size: 11px; color: rgba(167,139,250,0.45); letter-spacing: .12em; }
        .mstatus { font-size: 9px; letter-spacing: .22em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; background: rgba(16,185,129,0.08); border: 0.5px solid rgba(16,185,129,0.3); color: #6ee7b7; }
        .modal-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.7rem, 4vw, 2.5rem); font-weight: 400; color: #ede9fe; margin: 0 0 6px; line-height: 1.1; }
        .modal-tagline { font-size: 13px; color: rgba(200,185,255,0.42); margin: 0 0 18px; line-height: 1.65; }
        .modal-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 20px; }
        .mtag { font-size: 10.5px; letter-spacing: .08em; color: rgba(167,139,250,0.7); background: rgba(124,58,237,0.08); border: 0.5px solid rgba(167,139,250,0.18); border-radius: 7px; padding: 4px 11px; }
        .modal-overview { background: rgba(255,255,255,0.03); border: 0.5px solid rgba(167,139,250,0.12); border-radius: 12px; padding: 18px 20px; margin-bottom: 14px; }
        .sec-label { font-size: 8.5px; letter-spacing: .3em; text-transform: uppercase; color: rgba(167,139,250,0.7); margin-bottom: 8px; }
        .sec-text { font-size: 13px; line-height: 1.9; color: rgba(200,185,255,0.55); }
        .modal-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
        @media (max-width: 620px) { .modal-2col { grid-template-columns: 1fr; } }
        .modal-section { background: rgba(255,255,255,0.025); border: 0.5px solid rgba(167,139,250,0.1); border-radius: 12px; padding: 16px 18px; }
        .modal-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .cta-a { display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 999px; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .07em; text-decoration: none; transition: all 0.25s; cursor: pointer; }
        .cta-primary { background: rgba(124,58,237,0.7); color: #fff; border: 0.5px solid rgba(167,139,250,0.5); backdrop-filter: blur(10px); box-shadow: 0 0 18px rgba(124,58,237,0.35), inset 0 0 0 0.5px rgba(255,255,255,0.08); }
        .cta-primary:hover { transform: translateY(-2px); background: rgba(124,58,237,0.85); box-shadow: 0 0 32px rgba(124,58,237,0.55), inset 0 0 0 0.5px rgba(255,255,255,0.12); }
        .cta-ghost { background: rgba(255,255,255,0.04); color: rgba(200,185,255,.75); border: 0.5px solid rgba(167,139,250,.2); backdrop-filter: blur(8px); }
        .cta-ghost:hover { border-color: rgba(167,139,250,.5); background: rgba(124,58,237,.12); color: #fff; transform: translateY(-2px); box-shadow: 0 0 16px rgba(124,58,237,0.2); }

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
      `}</style>

      <div className="pr-root" style={{ color: "#e8e0ff", position: "relative", zIndex: 10 }}>
        {dots.map((d) => (
          <span key={d.id} className="pr-dot" style={{ top: d.top, left: d.left, width: d.size, height: d.size, "--op": d.op, "--dur": d.dur, "--delay": d.delay }} />
        ))}

        <header className="pr-header">
          <p className="pr-eyebrow">My Work</p>
          <h1 className="pr-title">Projects</h1>
          <div className="pr-divider" />
        </header>

        <div className="pr-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="pr-card"
              style={{ animationDelay: `${0.05 + i * 0.07}s` }}
              onClick={() => openModal(p)}
            >
              <div
                className="card-img-wrap"
                style={{ aspectRatio: p.type === "mobile" ? "9/16" : p.type === "pdf" ? "3/4" : "16/9" }}
              >
                <div className="card-img-accent" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                <div className="card-img-scale">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="(max-width: 580px) 100vw, (max-width: 980px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={i < 3}
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
                  {p.tags.slice(0, 3).map((t) => <span key={t} className="ctag">{t}</span>)}
                  {p.tags.length > 3 && <span className="ctag">+{p.tags.length - 3}</span>}
                </div>
                <button className="card-btn" onClick={(e) => { e.stopPropagation(); openModal(p); }}>
                  View Details <span className="btn-arrow">→</span>
                </button>
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
                    {/* Clickable image — opens lightbox on click */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={selected.images[imgIndex]}
                      src={selected.images[imgIndex]}
                      alt={`${selected.title} screenshot ${imgIndex + 1}`}
                      className="gal-img-clickable"
                      onClick={() => openLightbox(imgIndex)}
                      title="Click to view full size"
                    />

                    {/* Preload next image */}
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