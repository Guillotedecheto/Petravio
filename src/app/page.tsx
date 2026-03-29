"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as PricingCard from "@/components/ui/pricing-card";
import { CheckCircle2, XCircleIcon, Building2, Briefcase, Shield } from "lucide-react";

/* ─── Fade-in on scroll via Intersection Observer ─── */
function useFadeIn() {
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
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) {
      el.querySelectorAll(".fade-in").forEach((child) => observer.observe(child));
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── SVG Icons (geometric, no images) ─── */
const LogoIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Large triangle - dark ember */}
    <polygon points="35,10 5,85 65,85" fill="#BD3900" />
    {/* Small triangle - light amber/peach, overlapping */}
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

/* Cube icon — Fabricants de matériaux */
const CubeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M18 4L4 12v12l14 8 14-8V12L18 4z" />
    <path d="M4 12l14 8 14-8M18 20v12" />
  </svg>
);

/* Arrows icon — Négociants en matériaux */
const ArrowsIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M8 18h20M22 12l6 6-6 6" />
    <path d="M28 26H8M14 32l-6-6 6-6" />
  </svg>
);

/* Wrench icon — Artisans 2nd œuvre */
const WrenchIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M22 8a8 8 0 01-6.5 12.5L8 28l-2-2 7.5-7.5A8 8 0 0122 8z" />
    <circle cx="22" cy="14" r="3" />
  </svg>
);

/* Leaf/Energy icon — Rénovation énergétique */
const LeafIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M8 30C8 30 8 16 18 8c10 8 10 22 10 22" />
    <path d="M18 30V16" />
    <path d="M18 20c-3-2-6-2-6-2" />
    <path d="M18 24c3-2 5-2 5-2" />
  </svg>
);

/* Crane icon — Loueurs de matériel BTP */
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

/* Plus icon — Et bien d'autres */
const PlusIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <circle cx="18" cy="18" r="14" />
    <path d="M18 10v16M10 18h16" />
  </svg>
);

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center">
          <LogoIcon size={44} />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#approche" className="hover:text-white transition-colors">
            Notre approche
          </a>
          <a href="#livraison" className="hover:text-white transition-colors">
            Ce qu&apos;on livre
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a
            href="#contact"
            className="bg-flame text-white px-5 py-2 rounded-md font-sora font-semibold text-sm hover:bg-flame/90 transition-colors"
          >
            Prendre un RDV
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── 1. HERO ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-black pt-20 overflow-hidden">
      {/* Architectural wireframe background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="buildingGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FC4C00" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FC4C00" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="groundFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* ── Perspective lines from vanishing point ── */}
        <line x1="850" y1="250" x2="1440" y2="0" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1440" y2="120" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1440" y2="300" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1440" y2="500" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1350" y2="700" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1100" y2="900" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />

        {/* ── Main tower — tall, right side ── */}
        <rect x="1020" y="80" width="140" height="820" stroke="white" strokeOpacity="0.1" strokeWidth="0.7" fill="url(#buildingGlow)" />
        {/* Windows grid */}
        <rect x="1035" y="110" width="32" height="48" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="110" width="32" height="48" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" fill="none" />
        <rect x="1115" y="110" width="32" height="48" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1035" y="175" width="32" height="48" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="175" width="32" height="48" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1115" y="175" width="32" height="48" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1035" y="240" width="32" height="48" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="240" width="32" height="48" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1115" y="240" width="32" height="48" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1035" y="305" width="32" height="48" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="305" width="32" height="48" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1115" y="305" width="32" height="48" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1035" y="370" width="32" height="48" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="370" width="32" height="48" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="1035" y="435" width="32" height="48" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="435" width="32" height="48" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
        {/* Rooftop accent */}
        <line x1="1020" y1="80" x2="1090" y2="50" stroke="#FC4C00" strokeOpacity="0.12" strokeWidth="0.7" />
        <line x1="1160" y1="80" x2="1090" y2="50" stroke="#FC4C00" strokeOpacity="0.12" strokeWidth="0.7" />

        {/* ── Second building — medium ── */}
        <rect x="1190" y="280" width="110" height="620" stroke="white" strokeOpacity="0.08" strokeWidth="0.7" fill="none" />
        <rect x="1203" y="305" width="28" height="40" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1240" y="305" width="28" height="40" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1275" y="305" width="16" height="40" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1203" y="360" width="28" height="40" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1240" y="360" width="28" height="40" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1203" y="415" width="28" height="40" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1240" y="415" width="28" height="40" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1203" y="470" width="28" height="40" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="1240" y="470" width="28" height="40" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />

        {/* ── Small building — far right ── */}
        <rect x="1330" y="450" width="80" height="450" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1342" y="475" width="22" height="32" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1372" y="475" width="22" height="32" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1342" y="520" width="22" height="32" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="1372" y="520" width="22" height="32" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />

        {/* ── Crane ── */}
        <line x1="980" y1="60" x2="980" y2="900" stroke="white" strokeOpacity="0.08" strokeWidth="0.7" />
        <line x1="940" y1="80" x2="1080" y2="80" stroke="white" strokeOpacity="0.07" strokeWidth="0.7" />
        <line x1="980" y1="80" x2="940" y2="160" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" />
        <line x1="980" y1="80" x2="960" y2="160" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
        {/* Crane cable */}
        <line x1="1060" y1="80" x2="1060" y2="180" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
        {/* Crane top marker */}
        <rect x="974" y="55" width="12" height="12" stroke="#FC4C00" strokeOpacity="0.15" strokeWidth="0.5" fill="none" />

        {/* ── Ground line ── */}
        <line x1="800" y1="900" x2="1440" y2="900" stroke="url(#groundFade)" strokeWidth="1" />
        <line x1="850" y1="898" x2="1440" y2="898" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />

        {/* ── Horizontal floor lines through buildings ── */}
        <line x1="970" y1="550" x2="1420" y2="550" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" strokeDasharray="8 12" />
        <line x1="970" y1="700" x2="1420" y2="700" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" strokeDasharray="8 12" />

        {/* ── Left side — building cluster ── */}
        {/* Tall narrow building */}
        <rect x="30" y="200" width="80" height="700" stroke="white" strokeOpacity="0.08" strokeWidth="0.7" fill="none" />
        <rect x="42" y="230" width="20" height="30" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="72" y="230" width="20" height="30" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="42" y="275" width="20" height="30" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="72" y="275" width="20" height="30" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="42" y="320" width="20" height="30" stroke="white" strokeOpacity="0.045" strokeWidth="0.5" fill="none" />
        <rect x="72" y="320" width="20" height="30" stroke="white" strokeOpacity="0.045" strokeWidth="0.5" fill="none" />
        <rect x="42" y="365" width="20" height="30" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="72" y="365" width="20" height="30" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="42" y="410" width="20" height="30" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="72" y="410" width="20" height="30" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="42" y="455" width="20" height="30" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
        <rect x="72" y="455" width="20" height="30" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
        {/* Rooftop accent left building */}
        <line x1="30" y1="200" x2="70" y2="175" stroke="#FC4C00" strokeOpacity="0.1" strokeWidth="0.7" />
        <line x1="110" y1="200" x2="70" y2="175" stroke="#FC4C00" strokeOpacity="0.1" strokeWidth="0.7" />

        {/* Medium building left */}
        <rect x="140" y="380" width="100" height="520" stroke="white" strokeOpacity="0.07" strokeWidth="0.7" fill="none" />
        <rect x="155" y="405" width="25" height="35" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="190" y="405" width="25" height="35" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="155" y="455" width="25" height="35" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="190" y="455" width="25" height="35" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="155" y="505" width="25" height="35" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="190" y="505" width="25" height="35" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="155" y="555" width="25" height="35" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
        <rect x="190" y="555" width="25" height="35" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />

        {/* Small building far left */}
        <rect x="-20" y="500" width="60" height="400" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="-8" y="525" width="16" height="24" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="16" y="525" width="16" height="24" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" fill="none" />
        <rect x="-8" y="562" width="16" height="24" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
        <rect x="16" y="562" width="16" height="24" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />

        {/* Crane left side */}
        <line x1="270" y1="280" x2="270" y2="900" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" />
        <line x1="240" y1="300" x2="330" y2="300" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
        <line x1="270" y1="300" x2="245" y2="370" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        <line x1="310" y1="300" x2="310" y2="380" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" />
        <rect x="264" y="274" width="12" height="12" stroke="#FC4C00" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />

        {/* Perspective lines from left vanishing point */}
        <line x1="350" y1="350" x2="0" y2="100" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        <line x1="350" y1="350" x2="0" y2="250" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" />
        <line x1="350" y1="350" x2="0" y2="450" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        <line x1="350" y1="350" x2="0" y2="650" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
        <line x1="350" y1="350" x2="100" y2="900" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />

        {/* Horizontal dashed floor lines left */}
        <line x1="0" y1="600" x2="300" y2="600" stroke="white" strokeOpacity="0.025" strokeWidth="0.5" strokeDasharray="8 12" />
        <line x1="0" y1="750" x2="250" y2="750" stroke="white" strokeOpacity="0.025" strokeWidth="0.5" strokeDasharray="8 12" />

        {/* Ground line left */}
        <line x1="0" y1="900" x2="350" y2="900" stroke="white" strokeOpacity="0.06" strokeWidth="0.7" />
      </svg>

      {/* Warm ambient glows */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-flame/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-amber/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-ember/3 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 py-20 fade-in relative z-10">
        {/* Big logo + brand name block */}
        <div className="flex items-center gap-6 mb-8">
          <LogoIcon size={100} />
          <div className="flex flex-col">
            <span className="font-sora text-6xl sm:text-7xl md:text-8xl text-white tracking-tight">
              <span className="font-semibold">petra</span>
              <span className="font-light">vio</span>
            </span>
          </div>
        </div>

        <h1 className="font-sora font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl">
          Vos prochains chantiers commencent ici.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/70 font-sora font-light max-w-2xl leading-relaxed">
          Petravio identifie les décideurs dans le secteur du bâtiment, les contacte en votre nom,
          et vous livre des rendez-vous qualifiés.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="bg-flame text-white px-8 py-3.5 rounded-md font-sora font-semibold hover:bg-flame/90 transition-colors"
          >
            Prendre un RDV
          </a>
          <a
            href="#approche"
            className="border border-white/30 text-white px-8 py-3.5 rounded-md font-sora font-semibold hover:border-white/60 transition-colors"
          >
            Voir comment ça marche
          </a>
        </div>

        <p className="mt-14 font-sora text-xs tracking-[0.3em] uppercase text-white/30">
          Real Estate Lead Generation Agency
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-dark-gray" />
    </section>
  );
}

/* ─── 2. SOCIAL PROOF MARQUEE ─── */
function SocialProof() {
  const items = [
    "Architectes",
    "Entrepreneurs généraux",
    "Artisans 2nd œuvre",
    "Négociants matériaux",
    "Promoteurs",
  ];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-dark-gray py-5 overflow-hidden border-y border-white/5">
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
    },
    {
      title: "Pipeline imprévisible",
      desc: "Vous ne savez jamais d'où viendra le prochain chantier.",
    },
    {
      title: "Pas le temps",
      desc: "La prospection prend du temps que vous n'avez pas.",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Le problème
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-black leading-tight max-w-3xl fade-in">
          Vous êtes bons dans votre métier. Pas dans la prospection.
        </h2>
        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="fade-in bg-white border border-gray-200 rounded-lg p-8 relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-flame" />
              <h3 className="font-sora font-semibold text-xl text-black">{card.title}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{card.desc}</p>
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
    <section id="approche" className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Comment ça marche
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          On remplit votre agenda. Vous fermez les contrats.
        </h2>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-[60px] left-[16.6%] right-[16.6%] step-line" />

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="fade-in text-center md:text-left">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative">
                    {step.icon}
                    <span className="absolute -top-2 -right-3 font-sora font-semibold text-flame text-xs">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-sora font-semibold text-2xl text-white">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed max-w-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4b. COST COMPARISON — "LE VRAI COÛT D'UN RDV" ─── */
function CostComparison() {
  const stats = [
    { num: "87%", label: "de réduction moyenne vs. prospection interne" },
    { num: "7 jours", label: "pour être opérationnel — pas 3 mois de recrutement" },
    { num: "0€", label: "de charges sociales, CRM ou outils à votre charge" },
  ];

  return (
    <section className="relative bg-[#0A0A0A] py-[100px] px-6 border-t border-flame/20 overflow-hidden">
      {/* Subtle dotted grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 0.8px, transparent 0.8px)",
          backgroundSize: "14px 14px",
          maskImage:
            "radial-gradient(circle at 50% 10%, rgba(0,0,0,0.8), rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 75%)",
        }}
      />
      {/* Radial spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(252,76,0,0.06),transparent_50%)] blur-[30px]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Pourquoi Petravio
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-4xl fade-in">
          Chaque RDV que vous cherchez seul vous coûte entre 540€ et 1 370€.
          <br className="hidden sm:block" />
          <span className="text-white/60">
            {" "}La plupart des dirigeants ne le savent pas.
          </span>
        </h2>
        <p className="mt-6 text-white/50 font-sora font-light text-lg max-w-2xl leading-relaxed fade-in">
          Temps passé, salaires, outils, opportunités manquées — le vrai coût de la prospection interne est souvent invisible.
        </p>

        {/* Pricing Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 items-start">
          {/* Card 1 — En interne */}
          <div className="fade-in" style={{ transitionDelay: "0ms" }}>
            <PricingCard.Card className="max-w-none bg-transparent border-[#222] shadow-none">
              <PricingCard.Header className="bg-[#111]/80 border-[#222]">
                <PricingCard.Plan>
                  <PricingCard.PlanName className="text-white/60">
                    <Building2 aria-hidden="true" className="text-[#A32D2D]" />
                    <span>En interne</span>
                  </PricingCard.PlanName>
                </PricingCard.Plan>
                <PricingCard.Price>
                  <PricingCard.MainPrice className="text-[#A32D2D]">540–1 370€</PricingCard.MainPrice>
                </PricingCard.Price>
                <PricingCard.Description className="text-white/40">par RDV qualifié</PricingCard.Description>
              </PricingCard.Header>
              <PricingCard.Body>
                <PricingCard.List>
                  {["Salaire chargé commercial", "Temps dirigeant non facturé", "CRM & outils", "Recrutement & formation"].map((item) => (
                    <PricingCard.ListItem key={item} className="text-white/40">
                      <span className="mt-0.5">
                        <XCircleIcon className="h-4 w-4 text-[#A32D2D]" aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </PricingCard.ListItem>
                  ))}
                </PricingCard.List>
              </PricingCard.Body>
            </PricingCard.Card>
          </div>

          {/* Card 2 — Agence généraliste */}
          <div className="fade-in" style={{ transitionDelay: "100ms" }}>
            <PricingCard.Card className="max-w-none bg-transparent border-[#222] shadow-none">
              <PricingCard.Header className="bg-[#111]/80 border-[#222]">
                <PricingCard.Plan>
                  <PricingCard.PlanName className="text-white/60">
                    <Briefcase aria-hidden="true" className="text-ember" />
                    <span>Agence généraliste</span>
                  </PricingCard.PlanName>
                </PricingCard.Plan>
                <PricingCard.Price>
                  <PricingCard.MainPrice className="text-ember">300–600€</PricingCard.MainPrice>
                </PricingCard.Price>
                <PricingCard.Description className="text-white/40">par RDV — sans garantie secteur</PricingCard.Description>
              </PricingCard.Header>
              <PricingCard.Body>
                <PricingCard.List>
                  {["Templates génériques", "Pas de connaissance bâtiment", "No-show fréquents", "Engagement long terme imposé"].map((item) => (
                    <PricingCard.ListItem key={item} className="text-white/40">
                      <span className="mt-0.5">
                        <XCircleIcon className="h-4 w-4 text-ember" aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </PricingCard.ListItem>
                  ))}
                </PricingCard.List>
              </PricingCard.Body>
            </PricingCard.Card>
          </div>

          {/* Card 3 — Petravio (featured) */}
          <div className="fade-in" style={{ transitionDelay: "200ms" }}>
            <PricingCard.Card className="max-w-none bg-transparent border-flame shadow-[0_0_40px_rgba(252,76,0,0.1)]">
              <PricingCard.Header className="bg-[#111]/80 border-flame/30">
                <PricingCard.Plan>
                  <PricingCard.PlanName className="text-white/80">
                    <Shield aria-hidden="true" className="text-flame" />
                    <span className="font-semibold">Petravio</span>
                  </PricingCard.PlanName>
                  <PricingCard.Badge className="border-flame/40 text-flame">Recommandé</PricingCard.Badge>
                </PricingCard.Plan>
                <PricingCard.Price>
                  <PricingCard.MainPrice className="text-flame">3–7×</PricingCard.MainPrice>
                  <PricingCard.Period className="text-white/60">moins cher en moyenne</PricingCard.Period>
                </PricingCard.Price>
                <Button
                  className={cn(
                    "w-full font-sora font-semibold text-white",
                    "bg-gradient-to-b from-flame to-ember shadow-[0_10px_25px_rgba(252,76,0,0.3)]",
                    "hover:from-flame/90 hover:to-ember/90",
                  )}
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Prendre un RDV
                </Button>
              </PricingCard.Header>
              <PricingCard.Body>
                <PricingCard.List>
                  {[
                    "Spécialisé bâtiment & construction",
                    "Zéro charge sociale",
                    "Opérationnel en 7 jours",
                    "Sans recrutement",
                  ].map((item) => (
                    <PricingCard.ListItem key={item} className="text-green-400/80">
                      <span className="mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </PricingCard.ListItem>
                  ))}
                </PricingCard.List>
                <PricingCard.Separator className="text-flame/60">
                  En moyenne, une fraction du coût interne
                </PricingCard.Separator>
              </PricingCard.Body>
            </PricingCard.Card>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 fade-in flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="px-8 md:px-12 text-center">
              <p className="font-sora font-semibold text-[48px] leading-none text-flame">
                {stat.num}
              </p>
              <p className="mt-3 text-white/50 text-sm font-dm max-w-[220px] mx-auto">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center fade-in">
          <a
            href="#livraison"
            className="inline-block border border-white/30 text-white px-8 py-3.5 rounded-md font-sora font-semibold text-sm hover:border-white/60 transition-colors"
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
    {
      icon: <CubeIcon />,
      title: "Fabricants de matériaux",
      desc: "Développez votre réseau de distributeurs et prescripteurs.",
      featured: false,
    },
    {
      icon: <ArrowsIcon />,
      title: "Négociants en matériaux",
      desc: "Identifiez les chantiers avant vos concurrents.",
      featured: false,
    },
    {
      icon: <WrenchIcon />,
      title: "Artisans & entreprises 2nd œuvre",
      desc: "Accédez aux donneurs d\u0027ordre qui ont des chantiers actifs.",
      featured: false,
    },
    {
      icon: <LeafIcon />,
      title: "Sociétés de rénovation énergétique",
      desc: "Des leads exclusifs — pas partagés avec 5 concurrents.",
      featured: false,
    },
    {
      icon: <CraneIcon />,
      title: "Loueurs de matériel BTP",
      desc: "Soyez présent avant le démarrage du chantier.",
      featured: false,
    },
    {
      icon: <PlusIcon />,
      title: "Et bien d\u0027autres...",
      desc: "Vous êtes dans le bâtiment et vous prospectez trop peu ? Parlons-en.",
      featured: true,
    },
  ];

  return (
    <section className="bg-dark py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Pour qui
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          Spécialisé secteur du bâtiment &amp; de la construction.
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((p, i) => (
            <div
              key={i}
              className={`fade-in bg-dark-gray rounded-lg p-6 transition-colors group ${
                p.featured
                  ? "border border-flame hover:border-flame"
                  : "border border-white/10 hover:border-flame"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
              <h3 className="font-sora font-semibold text-lg text-white">{p.title}</h3>
              <p className="mt-2 text-white/50 text-sm leading-relaxed">{p.desc}</p>
              {p.featured && (
                <a
                  href="#contact"
                  className="mt-4 inline-block text-flame font-sora font-semibold text-sm hover:text-flame/80 transition-colors"
                >
                  Parlons-en →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. VALUE PROPOSITION ─── */
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
    <section id="livraison" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Ce qu&apos;on livre
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-black leading-tight max-w-3xl fade-in">
          Un retainer mensuel. Des rendez-vous dans votre agenda.
        </h2>

        <div className="mt-14 grid lg:grid-cols-3 gap-8">
          <div className="fade-in">
            <h3 className="font-sora font-semibold text-lg text-black mb-6">Ce qui est inclus</h3>
            <ul className="space-y-4">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-flame/10 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#FC4C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in">
            <h3 className="font-sora font-semibold text-lg text-black mb-6">
              Ce qu&apos;on ne fait pas
            </h3>
            <ul className="space-y-4">
              {excluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in">
            <div className="bg-black rounded-xl p-8 h-full flex flex-col justify-center">
              <h3 className="font-sora font-semibold text-2xl text-white">
                Prêt à remplir votre agenda ?
              </h3>
              <p className="mt-4 text-white/60 leading-relaxed">
                Prenons 20 minutes pour voir si Petravio est fait pour vous.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-block bg-flame text-white px-6 py-3 rounded-md font-sora font-semibold text-center hover:bg-flame/90 transition-colors"
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
    <footer id="contact" className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center fade-in">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase">
          Contact
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl text-white">
          Vos prochains chantiers commencent ici.
        </h2>
        <p className="mt-4 text-white/60 max-w-lg mx-auto">
          Réservez un appel découverte de 20 minutes. On vous montrera exactement comment
          Petravio peut remplir votre pipeline.
        </p>
        <a
          href="mailto:contact@petravio.com"
          className="mt-8 inline-block bg-flame text-white px-10 py-4 rounded-md font-sora font-semibold text-lg hover:bg-flame/90 transition-colors"
        >
          Prendre un RDV
        </a>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <span className="font-sora text-lg text-white/70">
              <span className="font-semibold">petra</span>
              <span className="font-light">vio</span>
            </span>
            <span className="text-white/30 text-sm ml-2">— Prospection B2B pour le bâtiment</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="mailto:contact@petravio.com" className="hover:text-white/70 transition-colors">
              contact@petravio.com
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              RGPD
            </a>
          </div>
          <span className="text-white/20 text-xs">© 2025 Petravio</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  const pageRef = useFadeIn();

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
