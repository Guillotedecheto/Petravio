"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Enhanced Intersection Observer with multiple animation types ─── */
function useAnimations() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) {
      el.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right, .fade-in-scale").forEach((child) =>
        observer.observe(child)
      );
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration: number = 1500, suffix: string = "") {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { ref, count: `${count}${suffix}` };
}

/* ─── SVG Icons ─── */
const LogoIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="35,10 5,85 65,85" fill="#BD3900" />
    <polygon points="62,40 45,85 80,85" fill="#FFA51F" opacity="0.75" />
  </svg>
);

const TargetIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#FC4C00" strokeWidth="2">
    <circle cx="20" cy="20" r="16" />
    <circle cx="20" cy="20" r="10" />
    <circle cx="20" cy="20" r="4" fill="#FC4C00" stroke="none" />
  </svg>
);

const SendIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#FC4C00" strokeWidth="2">
    <path d="M6 20l28-12-12 28-4-12-12-4z" />
    <path d="M18 22l6-6" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#FC4C00" strokeWidth="2">
    <rect x="6" y="10" width="28" height="24" rx="3" />
    <path d="M6 18h28M14 6v8M26 6v8" />
    <rect x="14" y="22" width="4" height="4" rx="1" fill="#FC4C00" stroke="none" />
  </svg>
);

const CubeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M18 4L4 12v12l14 8 14-8V12L18 4z" />
    <path d="M4 12l14 8 14-8M18 20v12" />
  </svg>
);

const ArrowsIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M8 18h20M22 12l6 6-6 6" />
    <path d="M28 26H8M14 32l-6-6 6-6" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M22 8a8 8 0 01-6.5 12.5L8 28l-2-2 7.5-7.5A8 8 0 0122 8z" />
    <circle cx="22" cy="14" r="3" />
  </svg>
);

const LeafIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M8 30C8 30 8 16 18 8c10 8 10 22 10 22" />
    <path d="M18 30V16" />
    <path d="M18 20c-3-2-6-2-6-2" />
    <path d="M18 24c3-2 5-2 5-2" />
  </svg>
);

const CraneIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <line x1="12" y1="6" x2="12" y2="32" />
    <line x1="6" y1="10" x2="30" y2="10" />
    <line x1="12" y1="10" x2="8" y2="18" />
    <line x1="28" y1="10" x2="28" y2="20" />
    <rect x="24" y="20" width="8" height="6" rx="1" />
    <line x1="8" y1="32" x2="16" y2="32" />
  </svg>
);

const PlusIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <circle cx="18" cy="18" r="14" />
    <path d="M18 10v16M10 18h16" />
  </svg>
);

/* ─── NAV — Sticky shrink on scroll ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-500 ${
        scrolled
          ? "bg-black/90 border-white/8 py-2"
          : "bg-black/40 border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <a href="#" className="flex items-center">
          <LogoIcon size={scrolled ? 34 : 44} />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#approche" className="hover:text-white transition-colors relative group">
            Notre approche
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-flame transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#livraison" className="hover:text-white transition-colors relative group">
            Ce qu&apos;on livre
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-flame transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#contact" className="hover:text-white transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-flame transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#contact"
            className="bg-flame text-white px-5 py-2 rounded-lg font-sora font-semibold text-sm hover:bg-flame/90 transition-all hover:shadow-lg hover:shadow-flame/20"
          >
            Prendre un RDV
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Isometric City Canvas ─── */
function IsometricCity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const mouse = { x: -9999, y: -9999 };

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Isometric projection helpers
    const isoX = (x: number, y: number) => (x - y) * 0.866;
    const isoY = (x: number, y: number, z: number) => (x + y) * 0.5 - z;

    type Block = {
      gx: number; gy: number; w: number; d: number; h: number;
      color: string; glow: boolean; delay: number;
    };

    const buildCity = (): Block[] => {
      const blocks: Block[] = [];
      // City grid — each block is a building
      const layout = [
        // Right cluster — tall buildings
        { gx: 6, gy: 2, w: 2, d: 2, h: 7, glow: true },
        { gx: 6, gy: 5, w: 2, d: 3, h: 4, glow: false },
        { gx: 9, gy: 2, w: 1.5, d: 2, h: 5.5, glow: true },
        { gx: 9, gy: 5, w: 2, d: 2, h: 3, glow: false },
        { gx: 11, gy: 3, w: 1.5, d: 1.5, h: 6, glow: false },
        { gx: 11, gy: 6, w: 2, d: 2, h: 2.5, glow: true },
        // Center
        { gx: 4, gy: 4, w: 1.5, d: 1.5, h: 3.5, glow: false },
        { gx: 4, gy: 7, w: 2, d: 1.5, h: 2, glow: true },
        // Left cluster
        { gx: 0, gy: 3, w: 2, d: 2, h: 5, glow: false },
        { gx: 0, gy: 6, w: 1.5, d: 2, h: 3, glow: true },
        { gx: 2, gy: 5, w: 1.5, d: 1.5, h: 4, glow: false },
        { gx: -1, gy: 8, w: 2, d: 1.5, h: 2, glow: false },
        // Far buildings
        { gx: 7, gy: 8, w: 3, d: 1, h: 1.5, glow: false },
        { gx: 13, gy: 5, w: 1, d: 1, h: 8, glow: true },
        { gx: 3, gy: 1, w: 1, d: 1, h: 3, glow: false },
        // Small details
        { gx: 5, gy: 0, w: 0.8, d: 0.8, h: 2, glow: false },
        { gx: 8, gy: 8, w: 1, d: 1, h: 1, glow: false },
        { gx: 12, gy: 1, w: 1.5, d: 1, h: 4, glow: false },
      ];

      layout.forEach((b, i) => {
        blocks.push({
          ...b,
          color: b.glow ? "#FC4C00" : "#ffffff",
          delay: i * 0.3,
        });
      });

      return blocks;
    };

    const blocks = buildCity();

    // Sort by depth for correct draw order
    blocks.sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, W(), H());

      const scale = Math.min(W(), H()) * 0.045;
      const offsetX = W() * 0.5;
      const offsetY = H() * 0.55;

      // Isometric grid lines (ground plane)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 0.5;
      for (let i = -4; i <= 16; i++) {
        const x1 = isoX(i, -4) * scale + offsetX;
        const y1 = isoY(i, -4, 0) * scale + offsetY;
        const x2 = isoX(i, 12) * scale + offsetX;
        const y2 = isoY(i, 12, 0) * scale + offsetY;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      for (let j = -4; j <= 12; j++) {
        const x1 = isoX(-4, j) * scale + offsetX;
        const y1 = isoY(-4, j, 0) * scale + offsetY;
        const x2 = isoX(16, j) * scale + offsetX;
        const y2 = isoY(16, j, 0) * scale + offsetY;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      const mouseRadius = 250;

      // Draw buildings
      blocks.forEach((b) => {
        const cx = (b.gx + b.w / 2) * scale;
        const cy = (b.gy + b.d / 2) * scale;
        const screenCx = isoX(b.gx + b.w / 2, b.gy + b.d / 2) * scale + offsetX;
        const screenCy = isoY(b.gx + b.w / 2, b.gy + b.d / 2, b.h / 2) * scale + offsetY;
        const distToMouse = Math.sqrt((screenCx - mouse.x) ** 2 + (screenCy - mouse.y) ** 2);
        const mouseBoost = distToMouse < mouseRadius ? (1 - distToMouse / mouseRadius) : 0;

        const baseAlpha = b.glow ? 0.12 : 0.06;
        const alpha = baseAlpha + mouseBoost * 0.12;

        // 8 corners of the box
        const corners = [
          // Bottom face
          [b.gx, b.gy, 0],
          [b.gx + b.w, b.gy, 0],
          [b.gx + b.w, b.gy + b.d, 0],
          [b.gx, b.gy + b.d, 0],
          // Top face
          [b.gx, b.gy, b.h],
          [b.gx + b.w, b.gy, b.h],
          [b.gx + b.w, b.gy + b.d, b.h],
          [b.gx, b.gy + b.d, b.h],
        ].map(([x, y, z]) => ({
          sx: isoX(x, y) * scale + offsetX,
          sy: isoY(x, y, z) * scale + offsetY,
        }));

        const c = corners;
        const col = b.glow ? `rgba(252, 76, 0, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
        const fillCol = b.glow ? `rgba(252, 76, 0, ${alpha * 0.3})` : `rgba(255, 255, 255, ${alpha * 0.15})`;

        // Top face (filled)
        ctx.fillStyle = b.glow
          ? `rgba(252, 76, 0, ${(alpha * 0.4) + Math.sin(time * 2 + b.delay) * 0.02})`
          : `rgba(255, 255, 255, ${alpha * 0.08})`;
        ctx.beginPath();
        ctx.moveTo(c[4].sx, c[4].sy);
        ctx.lineTo(c[5].sx, c[5].sy);
        ctx.lineTo(c[6].sx, c[6].sy);
        ctx.lineTo(c[7].sx, c[7].sy);
        ctx.closePath();
        ctx.fill();

        // Left face
        ctx.fillStyle = b.glow
          ? `rgba(189, 57, 0, ${alpha * 0.35})`
          : `rgba(255, 255, 255, ${alpha * 0.04})`;
        ctx.beginPath();
        ctx.moveTo(c[0].sx, c[0].sy);
        ctx.lineTo(c[4].sx, c[4].sy);
        ctx.lineTo(c[7].sx, c[7].sy);
        ctx.lineTo(c[3].sx, c[3].sy);
        ctx.closePath();
        ctx.fill();

        // Right face
        ctx.fillStyle = b.glow
          ? `rgba(252, 76, 0, ${alpha * 0.2})`
          : `rgba(255, 255, 255, ${alpha * 0.02})`;
        ctx.beginPath();
        ctx.moveTo(c[1].sx, c[1].sy);
        ctx.lineTo(c[5].sx, c[5].sy);
        ctx.lineTo(c[6].sx, c[6].sy);
        ctx.lineTo(c[2].sx, c[2].sy);
        ctx.closePath();
        ctx.fill();

        // Wireframe edges
        ctx.strokeStyle = col;
        ctx.lineWidth = b.glow ? 0.8 : 0.5;

        // Top face outline
        ctx.beginPath();
        ctx.moveTo(c[4].sx, c[4].sy);
        ctx.lineTo(c[5].sx, c[5].sy);
        ctx.lineTo(c[6].sx, c[6].sy);
        ctx.lineTo(c[7].sx, c[7].sy);
        ctx.closePath();
        ctx.stroke();

        // Vertical edges
        [[0, 4], [1, 5], [2, 6], [3, 7]].forEach(([a, b2]) => {
          ctx.beginPath();
          ctx.moveTo(c[a].sx, c[a].sy);
          ctx.lineTo(c[b2].sx, c[b2].sy);
          ctx.stroke();
        });

        // Bottom face outline
        ctx.strokeStyle = b.glow ? `rgba(252, 76, 0, ${alpha * 0.5})` : `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(c[0].sx, c[0].sy);
        ctx.lineTo(c[1].sx, c[1].sy);
        ctx.lineTo(c[2].sx, c[2].sy);
        ctx.lineTo(c[3].sx, c[3].sy);
        ctx.closePath();
        ctx.stroke();

        // Glow halo for highlighted buildings
        if (b.glow) {
          const pulse = Math.sin(time * 1.5 + b.delay) * 0.5 + 0.5;
          const grad = ctx.createRadialGradient(screenCx, screenCy, 0, screenCx, screenCy, 60 + pulse * 20);
          grad.addColorStop(0, `rgba(252, 76, 0, ${0.06 + mouseBoost * 0.08})`);
          grad.addColorStop(1, "rgba(252, 76, 0, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(screenCx, screenCy, 60 + pulse * 20, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const handleResize = () => {
      cancelAnimationFrame(animId);
      resize();
      draw();
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
    />
  );
}

/* ─── 1. HERO — with isometric city ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-black pt-20 overflow-hidden grain">
      {/* Isometric city canvas */}
      <IsometricCity />

      {/* Warm ambient glows */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-flame/4 rounded-full blur-[120px]" />
      <div className="absolute bottom-40 left-10 w-64 h-64 bg-amber/3 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-ember/3 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 py-20 fade-in relative z-10">
        {/* Logo + brand name */}
        <div className="flex items-center gap-6 mb-8">
          <LogoIcon size={100} />
          <span className="font-sora text-6xl sm:text-7xl md:text-8xl tracking-tight">
            <span className="font-semibold gradient-text-white">petra</span>
            <span className="font-light gradient-text">vio</span>
          </span>
        </div>

        <h1 className="font-sora font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl gradient-text-white">
          Vos prochains chantiers commencent ici.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/60 font-sora font-light max-w-2xl leading-relaxed">
          Petravio identifie les décideurs dans le secteur du bâtiment, les contacte en votre nom,
          et vous livre des rendez-vous qualifiés.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="bg-flame text-white px-8 py-3.5 rounded-lg font-sora font-semibold hover:bg-flame/90 transition-all hover:shadow-lg hover:shadow-flame/25 hover:-translate-y-0.5"
          >
            Prendre un RDV
          </a>
          <a
            href="#approche"
            className="border border-white/20 text-white px-8 py-3.5 rounded-lg font-sora font-semibold hover:border-white/40 hover:bg-white/5 transition-all"
          >
            Voir comment ça marche
          </a>
        </div>

        <p className="mt-14 font-sora text-xs tracking-[0.3em] uppercase text-white/25">
          Real Estate Lead Generation Agency
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#111]" />
    </section>
  );
}

/* ─── 2. SOCIAL PROOF MARQUEE ─── */
function SocialProof() {
  const items = ["Architectes", "Entrepreneurs généraux", "Artisans 2nd œuvre", "Négociants matériaux", "Promoteurs"];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-[#111] py-5 overflow-hidden border-y border-white/5">
      <div className="marquee flex whitespace-nowrap gap-12 text-white/40 text-sm font-sora font-light">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-flame/60" />
            Fait pour les {item}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── 3. PROBLEM SECTION ─── */
function Problem() {
  const cards = [
    {
      title: "Pas de processus sortant",
      desc: "Vous comptez sur le bouche-à-oreille et les appels entrants.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FC4C00" strokeWidth="1.5">
          <circle cx="16" cy="16" r="12" />
          <path d="M16 10v6l4 3" />
        </svg>
      ),
    },
    {
      title: "Pipeline imprévisible",
      desc: "Vous ne savez jamais d'où viendra le prochain chantier.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FC4C00" strokeWidth="1.5">
          <path d="M4 24l6-8 5 4 6-10 7 6" />
          <path d="M4 28h24" />
        </svg>
      ),
    },
    {
      title: "Pas le temps",
      desc: "La prospection prend du temps que vous n'avez pas.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FC4C00" strokeWidth="1.5">
          <rect x="4" y="6" width="24" height="20" rx="3" />
          <path d="M4 12h24" />
          <path d="M10 18h4M18 18h4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#111] py-24 px-6 relative grain">
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Le problème
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          Vous êtes bons dans votre métier.{" "}
          <span className="gradient-text">Pas dans la prospection.</span>
        </h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="fade-in relative rounded-xl p-8 overflow-hidden glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-flame/5 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-flame to-amber" />
              <div className="relative z-10">
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                <h3 className="font-sora font-semibold text-xl text-white">{card.title}</h3>
                <p className="mt-3 text-white/50 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. SOLUTION SECTION ─── */
function Solution() {
  const steps = [
    {
      icon: <TargetIcon />,
      num: "01",
      title: "On identifie",
      desc: "Données sectorielles, signaux permis et appels d'offres. On cible les décideurs au bon moment.",
    },
    {
      icon: <SendIcon />,
      num: "02",
      title: "On contacte",
      desc: "Séquences email personnalisées, 9 touches sur 30 jours. Votre nom, votre voix.",
    },
    {
      icon: <CalendarIcon />,
      num: "03",
      title: "Vous recevez",
      desc: "Des rendez-vous qualifiés directement dans votre agenda. Rien d'autre.",
    },
  ];

  return (
    <section id="approche" className="bg-black py-24 px-6 relative grain">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-50" style={{
        maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Comment ça marche
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          On remplit votre agenda.{" "}
          <span className="gradient-text">Vous fermez les contrats.</span>
        </h2>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-[60px] left-[16.6%] right-[16.6%] h-[2px] bg-gradient-to-r from-ember via-flame to-amber opacity-30" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="fade-in-scale group"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative rounded-xl p-6 glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-flame/5">
                  <div className="relative z-10 flex flex-col items-center md:items-start gap-4">
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                      <span className="absolute -top-2 -right-3 font-sora font-semibold text-xs gradient-text">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-sora font-semibold text-2xl text-white">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed max-w-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4b. COST COMPARISON ─── */
function CostComparison() {
  const cards = [
    {
      title: "En interne",
      cost: "540–1 370€",
      costColor: "#A32D2D",
      subtitle: "par RDV qualifié",
      items: ["Salaire chargé commercial", "Temps dirigeant non facturé", "CRM & outils", "Recrutement & formation"],
      featured: false,
    },
    {
      title: "Agence généraliste",
      cost: "300–600€",
      costColor: "#BD3900",
      subtitle: "par RDV — sans garantie secteur",
      items: ["Templates génériques", "Pas de connaissance bâtiment", "No-show fréquents", "Engagement long terme imposé"],
      featured: false,
    },
    {
      title: "Petravio",
      cost: "3–7×",
      costColor: "#FC4C00",
      subtitle: "moins cher en moyenne",
      items: ["Spécialisé bâtiment & construction", "Zéro charge sociale", "Opérationnel en 7 jours", "Sans recrutement"],
      featured: true,
    },
  ];

  const stat1 = useCounter(87, 1200, "%");
  const stat2 = useCounter(7, 800, "");
  const stat3 = useCounter(0, 400, "€");

  return (
    <section className="bg-[#0A0A0A] py-[100px] px-6 border-t border-flame/20 relative grain">
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Pourquoi Petravio
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-4xl fade-in">
          Chaque RDV que vous cherchez seul vous coûte{" "}
          <span className="gradient-text">entre 540€ et 1 370€.</span>
          <br className="hidden sm:block" />
          <span className="text-white/50"> La plupart des dirigeants ne le savent pas.</span>
        </h2>
        <p className="mt-6 text-white/40 font-sora font-light text-lg max-w-2xl leading-relaxed fade-in">
          Temps passé, salaires, outils, opportunités manquées — le vrai coût de la prospection interne est souvent invisible.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`fade-in-scale relative rounded-xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                card.featured
                  ? "glass-card glow-border border border-flame/50"
                  : "glass-card hover:shadow-xl"
              } ${i === 2 ? "md:order-last order-last" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="font-sora font-semibold text-sm tracking-widest uppercase text-white/60 mb-6">
                  {card.title}
                  {card.featured && (
                    <span className="ml-3 text-[10px] px-2 py-0.5 rounded-full border border-flame/40 text-flame">
                      Recommandé
                    </span>
                  )}
                </h3>
                <p className="font-sora font-bold text-4xl md:text-5xl" style={{ color: card.costColor }}>
                  {card.cost}
                </p>
                <p className="mt-2 text-white/40 text-sm font-sora">{card.subtitle}</p>

                <ul className="mt-8 space-y-3 flex-1">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      {card.featured ? (
                        <>
                          <span className="mt-0.5 text-[#3B6D11] flex-shrink-0">✓</span>
                          <span className="text-[#3B6D11]">{item}</span>
                        </>
                      ) : (
                        <>
                          <span className="mt-0.5 text-white/20 flex-shrink-0">·</span>
                          <span className="text-white/35">{item}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                {card.featured && (
                  <p className="mt-8 pt-4 border-t border-flame/20 font-sora font-semibold text-xs tracking-widest uppercase text-flame text-center">
                    Une fraction du coût interne
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Animated Stats row */}
        <div className="mt-20 fade-in flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-white/10">
          <div ref={stat1.ref} className="px-8 md:px-12 text-center">
            <p className="font-sora font-bold text-[52px] leading-none gradient-text">{stat1.count}</p>
            <p className="mt-3 text-white/40 text-sm font-dm max-w-[220px] mx-auto">de réduction moyenne vs. prospection interne</p>
          </div>
          <div ref={stat2.ref} className="px-8 md:px-12 text-center">
            <p className="font-sora font-bold text-[52px] leading-none gradient-text">{stat2.count} jours</p>
            <p className="mt-3 text-white/40 text-sm font-dm max-w-[220px] mx-auto">pour être opérationnel — pas 3 mois de recrutement</p>
          </div>
          <div ref={stat3.ref} className="px-8 md:px-12 text-center">
            <p className="font-sora font-bold text-[52px] leading-none gradient-text">{stat3.count}</p>
            <p className="mt-3 text-white/40 text-sm font-dm max-w-[220px] mx-auto">de charges sociales, CRM ou outils à votre charge</p>
          </div>
        </div>

        <div className="mt-14 text-center fade-in">
          <a
            href="#livraison"
            className="inline-block border border-white/20 text-white px-8 py-3.5 rounded-lg font-sora font-semibold text-sm hover:border-white/40 hover:bg-white/5 transition-all"
          >
            Voir nos offres
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. ICP SECTION ─── */
function ICP() {
  const profiles = [
    { icon: <CubeIcon />, title: "Fabricants de matériaux", desc: "Développez votre réseau de distributeurs et prescripteurs.", featured: false },
    { icon: <ArrowsIcon />, title: "Négociants en matériaux", desc: "Identifiez les chantiers avant vos concurrents.", featured: false },
    { icon: <WrenchIcon />, title: "Artisans & entreprises 2nd œuvre", desc: "Accédez aux donneurs d\u0027ordre qui ont des chantiers actifs.", featured: false },
    { icon: <LeafIcon />, title: "Sociétés de rénovation énergétique", desc: "Des leads exclusifs — pas partagés avec 5 concurrents.", featured: false },
    { icon: <CraneIcon />, title: "Loueurs de matériel BTP", desc: "Soyez présent avant le démarrage du chantier.", featured: false },
    { icon: <PlusIcon />, title: "Et bien d\u0027autres...", desc: "Vous êtes dans le bâtiment et vous prospectez trop peu ? Parlons-en.", featured: true },
  ];

  return (
    <section className="bg-dark py-24 px-6 relative grain">
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Pour qui
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          Spécialisé secteur du bâtiment{" "}
          <span className="gradient-text">&amp; de la construction.</span>
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((p, i) => (
            <div
              key={i}
              className={`fade-in-scale relative rounded-xl p-6 glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-flame/5 group ${
                p.featured ? "border border-flame/50 glow-border" : ""
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative z-10">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
                <h3 className="font-sora font-semibold text-lg text-white">{p.title}</h3>
                <p className="mt-2 text-white/45 text-sm leading-relaxed">{p.desc}</p>
                {p.featured && (
                  <a href="#contact" className="mt-4 inline-block text-flame font-sora font-semibold text-sm hover:text-amber transition-colors">
                    Parlons-en →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. VALUE PROPOSITION — Bento Grid ─── */
function ValueProp() {
  const included = [
    "Identification des prospects ICP",
    "Enrichissement email & téléphone",
    "Séquences outreach personnalisées",
    "Suivi et relances sur 30 jours",
    "Reporting mensuel",
  ];
  const excluded = [
    "Listes froides non qualifiées",
    "Templates génériques",
    "Engagement à l'année",
    "Résultats opaques",
  ];

  return (
    <section id="livraison" className="bg-[#111] py-24 px-6 relative grain">
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Ce qu&apos;on livre
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          Un retainer mensuel.{" "}
          <span className="gradient-text">Des rendez-vous dans votre agenda.</span>
        </h2>

        {/* Bento grid layout */}
        <div className="mt-14 grid lg:grid-cols-12 gap-4">
          {/* Included — large card */}
          <div className="fade-in-left lg:col-span-5 relative rounded-xl p-8 glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-flame/5">
            <div className="relative z-10">
              <h3 className="font-sora font-semibold text-lg text-white mb-6">Ce qui est inclus</h3>
              <ul className="space-y-4">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-flame/10 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#FC4C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Excluded — medium card */}
          <div className="fade-in lg:col-span-4 relative rounded-xl p-8 glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative z-10">
              <h3 className="font-sora font-semibold text-lg text-white mb-6">Ce qu&apos;on ne fait pas</h3>
              <ul className="space-y-4">
                {excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="#555" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="text-white/30">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA card */}
          <div className="fade-in-right lg:col-span-3 relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-flame/10 group">
            <div className="absolute inset-0 bg-gradient-to-br from-flame/20 to-ember/20" />
            <div className="absolute inset-[1px] rounded-xl bg-[#0A0A0A]" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-center">
              <h3 className="font-sora font-semibold text-xl text-white">
                Prêt à remplir votre agenda ?
              </h3>
              <p className="mt-4 text-white/50 leading-relaxed text-sm">
                Prenons 20 minutes pour voir si Petravio est fait pour vous.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-block bg-flame text-white px-6 py-3 rounded-lg font-sora font-semibold text-center text-sm hover:bg-flame/90 transition-all hover:shadow-lg hover:shadow-flame/25"
              >
                Réserver un appel découverte
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 7. FOOTER ─── */
function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/5 relative grain">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center fade-in relative z-10">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase">
          Contact
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl gradient-text-white">
          Vos prochains chantiers commencent ici.
        </h2>
        <p className="mt-4 text-white/50 max-w-lg mx-auto">
          Réservez un appel découverte de 20 minutes. On vous montrera exactement comment
          Petravio peut remplir votre pipeline.
        </p>
        <a
          href="mailto:contact@petravio.com"
          className="mt-8 inline-block bg-flame text-white px-10 py-4 rounded-lg font-sora font-semibold text-lg hover:bg-flame/90 transition-all hover:shadow-xl hover:shadow-flame/25 hover:-translate-y-0.5"
        >
          Prendre un RDV
        </a>
      </div>

      <div className="border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <span className="font-sora text-lg">
              <span className="font-semibold text-white/70">petra</span>
              <span className="font-light text-flame/70">vio</span>
            </span>
            <span className="text-white/25 text-sm ml-2">— Prospection B2B pour le bâtiment</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/35">
            <a href="mailto:contact@petravio.com" className="hover:text-white/60 transition-colors">
              contact@petravio.com
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white/60 transition-colors">RGPD</a>
          </div>
          <span className="text-white/15 text-xs">© 2025 Petravio</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  const pageRef = useAnimations();

  return (
    <div ref={pageRef}>
      <Nav />
      <Hero />
      <SocialProof />
      <Problem />
      <Solution />
      <CostComparison />
      <ICP />
      <ValueProp />
      <Footer />
    </div>
  );
}
