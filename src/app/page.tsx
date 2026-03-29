"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as PricingCard from "@/components/ui/pricing-card";
import { CheckCircle2, XCircleIcon, Building2, Briefcase, Shield, Target, Send, CalendarCheck, Box, ArrowLeftRight, Wrench, Leaf, Crane, PlusCircle } from "lucide-react";

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

/* ─── Reusable background elements ─── */
function DotGrid({ opacity = 0.05, center = "50% 10%" }: { opacity?: number; center?: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(rgba(255,255,255,${opacity}) 0.8px, transparent 0.8px)`,
        backgroundSize: "14px 14px",
        maskImage: `radial-gradient(circle at ${center}, rgba(0,0,0,0.8), rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 75%)`,
      }}
    />
  );
}

function Spotlight({ color = "252,76,0", opacity = 0.06, position = "-top-1/3 left-1/2" }: { color?: string; opacity?: number; position?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${position} h-[80vmin] w-[80vmin] -translate-x-1/2 rounded-full blur-[40px]`}
      style={{ background: `radial-gradient(ellipse at center, rgba(${color},${opacity}), transparent 50%)` }}
    />
  );
}

/* ─── Glass card wrapper ─── */
function GlassCard({ children, className, featured = false }: { children: React.ReactNode; className?: string; featured?: boolean }) {
  return (
    <div className={cn(
      "relative rounded-xl p-[1px] backdrop-blur-xl",
      featured ? "bg-gradient-to-b from-flame/30 to-flame/5" : "bg-gradient-to-b from-white/10 to-white/[0.02]",
      className,
    )}>
      <div className={cn(
        "rounded-xl p-6 h-full",
        "bg-[#0A0A0A]/80 backdrop-blur-xl",
      )}>
        {/* Top glass gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[1px] top-[1px] h-32 rounded-t-xl pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

/* ─── SVG Logo ─── */
const LogoIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="35,10 5,85 65,85" fill="#BD3900" />
    <polygon points="62,40 45,85 80,85" fill="#FFA51F" opacity="0.75" />
  </svg>
);

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="mx-4 mt-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/[0.06] shadow-2xl">
          <a href="#" className="flex items-center">
            <LogoIcon size={40} />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
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
              className={cn(
                "px-5 py-2 rounded-lg font-sora font-semibold text-sm text-white",
                "bg-gradient-to-b from-flame to-ember shadow-[0_4px_15px_rgba(252,76,0,0.3)]",
                "hover:shadow-[0_4px_20px_rgba(252,76,0,0.5)] transition-all",
              )}
            >
              Prendre un RDV
            </a>
          </div>
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
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="buildingGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FC4C00" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FC4C00" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Perspective lines */}
        <line x1="850" y1="250" x2="1440" y2="0" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1440" y2="120" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1440" y2="300" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1440" y2="500" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
        <line x1="850" y1="250" x2="1350" y2="700" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        {/* Main tower */}
        <rect x="1020" y="80" width="140" height="820" stroke="white" strokeOpacity="0.1" strokeWidth="0.7" fill="url(#buildingGlow)" />
        <rect x="1035" y="110" width="32" height="48" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="110" width="32" height="48" stroke="white" strokeOpacity="0.07" strokeWidth="0.5" fill="none" />
        <rect x="1115" y="110" width="32" height="48" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1035" y="175" width="32" height="48" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="175" width="32" height="48" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1035" y="240" width="32" height="48" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="240" width="32" height="48" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1035" y="305" width="32" height="48" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="1075" y="305" width="32" height="48" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <line x1="1020" y1="80" x2="1090" y2="50" stroke="#FC4C00" strokeOpacity="0.12" strokeWidth="0.7" />
        <line x1="1160" y1="80" x2="1090" y2="50" stroke="#FC4C00" strokeOpacity="0.12" strokeWidth="0.7" />
        {/* Second building */}
        <rect x="1190" y="280" width="110" height="620" stroke="white" strokeOpacity="0.08" strokeWidth="0.7" fill="none" />
        <rect x="1203" y="305" width="28" height="40" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1240" y="305" width="28" height="40" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="1203" y="360" width="28" height="40" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="1240" y="360" width="28" height="40" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        {/* Small building */}
        <rect x="1330" y="450" width="80" height="450" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        {/* Crane */}
        <line x1="980" y1="60" x2="980" y2="900" stroke="white" strokeOpacity="0.08" strokeWidth="0.7" />
        <line x1="940" y1="80" x2="1080" y2="80" stroke="white" strokeOpacity="0.07" strokeWidth="0.7" />
        <line x1="980" y1="80" x2="940" y2="160" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" />
        <line x1="1060" y1="80" x2="1060" y2="180" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
        <rect x="974" y="55" width="12" height="12" stroke="#FC4C00" strokeOpacity="0.15" strokeWidth="0.5" fill="none" />
        {/* Left buildings */}
        <rect x="30" y="200" width="80" height="700" stroke="white" strokeOpacity="0.08" strokeWidth="0.7" fill="none" />
        <rect x="42" y="230" width="20" height="30" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="72" y="230" width="20" height="30" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <rect x="42" y="275" width="20" height="30" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="72" y="275" width="20" height="30" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="42" y="320" width="20" height="30" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <rect x="72" y="320" width="20" height="30" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
        <line x1="30" y1="200" x2="70" y2="175" stroke="#FC4C00" strokeOpacity="0.1" strokeWidth="0.7" />
        <line x1="110" y1="200" x2="70" y2="175" stroke="#FC4C00" strokeOpacity="0.1" strokeWidth="0.7" />
        <rect x="140" y="380" width="100" height="520" stroke="white" strokeOpacity="0.07" strokeWidth="0.7" fill="none" />
        <rect x="155" y="405" width="25" height="35" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        <rect x="190" y="405" width="25" height="35" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
        {/* Left crane */}
        <line x1="270" y1="280" x2="270" y2="900" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" />
        <line x1="240" y1="300" x2="330" y2="300" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
        <rect x="264" y="274" width="12" height="12" stroke="#FC4C00" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
        {/* Left perspective */}
        <line x1="350" y1="350" x2="0" y2="100" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        <line x1="350" y1="350" x2="0" y2="250" stroke="white" strokeOpacity="0.035" strokeWidth="0.5" />
        <line x1="350" y1="350" x2="0" y2="450" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
        {/* Dashed floors */}
        <line x1="970" y1="550" x2="1420" y2="550" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" strokeDasharray="8 12" />
        <line x1="970" y1="700" x2="1420" y2="700" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" strokeDasharray="8 12" />
      </svg>

      <DotGrid opacity={0.04} center="30% 50%" />
      <Spotlight opacity={0.08} position="-top-1/4 left-1/3" />
      <Spotlight color="255,165,31" opacity={0.04} position="top-1/2 -right-1/4" />

      <div className="max-w-7xl mx-auto px-6 py-20 fade-in relative z-10">
        <div className="flex items-center gap-6 mb-8">
          <LogoIcon size={100} />
          <span className="font-sora text-6xl sm:text-7xl md:text-8xl text-white tracking-tight">
            <span className="font-semibold">petra</span>
            <span className="font-light text-white/70">vio</span>
          </span>
        </div>

        <h1 className="font-sora font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl">
          Vos prochains chantiers commencent ici.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/60 font-sora font-light max-w-2xl leading-relaxed">
          Petravio identifie les décideurs dans le secteur du bâtiment, les contacte en votre nom,
          et vous livre des rendez-vous qualifiés.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className={cn(
              "px-8 py-3.5 rounded-lg font-sora font-semibold text-white",
              "bg-gradient-to-b from-flame to-ember",
              "shadow-[0_8px_30px_rgba(252,76,0,0.3)]",
              "hover:shadow-[0_8px_40px_rgba(252,76,0,0.5)] transition-all",
            )}
          >
            Prendre un RDV
          </a>
          <a
            href="#approche"
            className="border border-white/20 text-white px-8 py-3.5 rounded-lg font-sora font-semibold hover:border-white/40 hover:bg-white/[0.03] transition-all backdrop-blur-sm"
          >
            Voir comment ça marche
          </a>
        </div>

        <p className="mt-14 font-sora text-xs tracking-[0.3em] uppercase text-white/25">
          Real Estate Lead Generation Agency
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0A0A0A]" />
    </section>
  );
}

/* ─── 2. SOCIAL PROOF MARQUEE ─── */
function SocialProof() {
  const items = ["Fabricants de matériaux", "Entrepreneurs généraux", "Artisans 2nd œuvre", "Négociants matériaux", "Loueurs BTP", "Rénovation énergétique"];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-[#0A0A0A] py-5 overflow-hidden border-y border-white/[0.06]">
      <div className="marquee flex whitespace-nowrap gap-12 text-white/35 text-sm font-sora font-light">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-flame/50" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── 3. PROBLEM SECTION ─── */
function Problem() {
  const cards = [
    { title: "Pas de processus sortant", desc: "Vous comptez sur le bouche-à-oreille et les appels entrants.", icon: "📡" },
    { title: "Pipeline imprévisible", desc: "Vous ne savez jamais d'où viendra le prochain chantier.", icon: "📉" },
    { title: "Pas le temps", desc: "La prospection prend du temps que vous n'avez pas.", icon: "⏳" },
  ];

  return (
    <section className="relative bg-[#060606] py-24 px-6 overflow-hidden">
      <DotGrid opacity={0.04} center="50% 50%" />
      <Spotlight color="255,255,255" opacity={0.03} position="-top-1/4 left-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Le problème
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          Vous êtes bons dans votre métier. Pas dans la prospection.
        </h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="fade-in" style={{ transitionDelay: `${i * 100}ms` }}>
              <GlassCard>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-flame/50 to-transparent" />
                <span className="text-2xl mb-4 block">{card.icon}</span>
                <h3 className="font-sora font-semibold text-xl text-white">{card.title}</h3>
                <p className="mt-3 text-white/50 leading-relaxed">{card.desc}</p>
              </GlassCard>
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
    { icon: <Target className="w-8 h-8 text-flame" />, num: "01", title: "On identifie", desc: "Données sectorielles, signaux permis et appels d'offres. On cible les décideurs au bon moment." },
    { icon: <Send className="w-8 h-8 text-flame" />, num: "02", title: "On contacte", desc: "Séquences email personnalisées, 9 touches sur 30 jours. Votre nom, votre voix." },
    { icon: <CalendarCheck className="w-8 h-8 text-flame" />, num: "03", title: "Vous recevez", desc: "Des rendez-vous qualifiés directement dans votre agenda. Rien d'autre." },
  ];

  return (
    <section id="approche" className="relative bg-black py-24 px-6 overflow-hidden">
      <DotGrid opacity={0.03} center="50% 30%" />
      <Spotlight color="255,165,31" opacity={0.05} position="-top-1/4 right-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Comment ça marche
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          On remplit votre agenda. Vous fermez les contrats.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="fade-in" style={{ transitionDelay: `${i * 100}ms` }}>
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-flame/10 border border-flame/20 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-sora font-bold text-3xl text-white/10">{step.num}</span>
                </div>
                <h3 className="font-sora font-semibold text-2xl text-white">{step.title}</h3>
                <p className="mt-3 text-white/50 leading-relaxed">{step.desc}</p>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Connecting line */}
        <div className="hidden md:flex justify-center mt-8 fade-in">
          <div className="w-2/3 h-[2px] bg-gradient-to-r from-flame/0 via-flame/40 to-flame/0 rounded-full" />
        </div>
      </div>
    </section>
  );
}

/* ─── 4b. COST COMPARISON ─── */
function CostComparison() {
  const stats = [
    { num: "87%", label: "de réduction moyenne vs. prospection interne" },
    { num: "7 jours", label: "pour être opérationnel — pas 3 mois de recrutement" },
    { num: "0€", label: "de charges sociales, CRM ou outils à votre charge" },
  ];

  return (
    <section className="relative bg-[#0A0A0A] py-[100px] px-6 border-t border-flame/20 overflow-hidden">
      <DotGrid opacity={0.05} center="50% 10%" />
      <Spotlight opacity={0.06} />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Pourquoi Petravio
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-4xl fade-in">
          Chaque RDV que vous cherchez seul vous coûte entre 540€ et 1 370€.
          <br className="hidden sm:block" />
          <span className="text-white/60"> La plupart des dirigeants ne le savent pas.</span>
        </h2>
        <p className="mt-6 text-white/50 font-sora font-light text-lg max-w-2xl leading-relaxed fade-in">
          Temps passé, salaires, outils, opportunités manquées — le vrai coût de la prospection interne est souvent invisible.
        </p>

        {/* Pricing Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 items-start">
          {/* Card 1 — En interne */}
          <div className="fade-in" style={{ transitionDelay: "0ms" }}>
            <PricingCard.Card className="max-w-none bg-transparent border-white/[0.06] shadow-none backdrop-blur-xl">
              <PricingCard.Header className="bg-white/[0.03] border-white/[0.06]">
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
                      <span className="mt-0.5 flex-shrink-0">
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
            <PricingCard.Card className="max-w-none bg-transparent border-white/[0.06] shadow-none backdrop-blur-xl">
              <PricingCard.Header className="bg-white/[0.03] border-white/[0.06]">
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
                      <span className="mt-0.5 flex-shrink-0">
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
            <PricingCard.Card className="max-w-none bg-transparent border-flame/40 shadow-[0_0_60px_rgba(252,76,0,0.1)] backdrop-blur-xl">
              <PricingCard.Header className="bg-flame/[0.06] border-flame/20">
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
                <Button asChild className={cn(
                  "w-full font-sora font-semibold text-white",
                  "bg-gradient-to-b from-flame to-ember shadow-[0_10px_25px_rgba(252,76,0,0.3)]",
                  "hover:shadow-[0_10px_35px_rgba(252,76,0,0.5)] transition-all",
                )}>
                  <a href="#contact">Prendre un RDV</a>
                </Button>
              </PricingCard.Header>
              <PricingCard.Body>
                <PricingCard.List>
                  {["Spécialisé bâtiment & construction", "Zéro charge sociale", "Opérationnel en 7 jours", "Sans recrutement"].map((item) => (
                    <PricingCard.ListItem key={item} className="text-green-400/80">
                      <span className="mt-0.5 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </PricingCard.ListItem>
                  ))}
                </PricingCard.List>
                <PricingCard.Separator className="text-flame/60">
                  Une fraction du coût interne
                </PricingCard.Separator>
              </PricingCard.Body>
            </PricingCard.Card>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 fade-in">
          <GlassCard>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-white/10 py-4">
              {stats.map((stat, i) => (
                <div key={i} className="px-8 md:px-12 text-center">
                  <p className="font-sora font-semibold text-[48px] leading-none text-flame">{stat.num}</p>
                  <p className="mt-3 text-white/50 text-sm font-dm max-w-[220px] mx-auto">{stat.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center fade-in">
          <a
            href="#livraison"
            className="inline-block border border-white/20 text-white px-8 py-3.5 rounded-lg font-sora font-semibold text-sm hover:border-white/40 hover:bg-white/[0.03] transition-all"
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
    { icon: <Box className="w-6 h-6 text-flame" />, title: "Fabricants de matériaux", desc: "Développez votre réseau de distributeurs et prescripteurs.", featured: false },
    { icon: <ArrowLeftRight className="w-6 h-6 text-flame" />, title: "Négociants en matériaux", desc: "Identifiez les chantiers avant vos concurrents.", featured: false },
    { icon: <Wrench className="w-6 h-6 text-flame" />, title: "Artisans & entreprises 2nd œuvre", desc: "Accédez aux donneurs d'ordre qui ont des chantiers actifs.", featured: false },
    { icon: <Leaf className="w-6 h-6 text-flame" />, title: "Sociétés de rénovation énergétique", desc: "Des leads exclusifs — pas partagés avec 5 concurrents.", featured: false },
    { icon: <Crane className="w-6 h-6 text-flame" />, title: "Loueurs de matériel BTP", desc: "Soyez présent avant le démarrage du chantier.", featured: false },
    { icon: <PlusCircle className="w-6 h-6 text-flame" />, title: "Et bien d'autres...", desc: "Vous êtes dans le bâtiment et vous prospectez trop peu ? Parlons-en.", featured: true },
  ];

  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <DotGrid opacity={0.03} center="70% 50%" />
      <Spotlight color="255,165,31" opacity={0.04} position="-top-1/4 right-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Pour qui
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          Spécialisé secteur du bâtiment &amp; de la construction.
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((p, i) => (
            <div key={i} className="fade-in" style={{ transitionDelay: `${i * 80}ms` }}>
              <GlassCard featured={p.featured}>
                <div className="w-10 h-10 rounded-lg bg-flame/10 border border-flame/20 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-sora font-semibold text-lg text-white">{p.title}</h3>
                <p className="mt-2 text-white/50 text-sm leading-relaxed">{p.desc}</p>
                {p.featured && (
                  <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-flame font-sora font-semibold text-sm hover:text-flame/80 transition-colors">
                    Parlons-en <span>→</span>
                  </a>
                )}
              </GlassCard>
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
    <section id="livraison" className="relative bg-[#060606] py-24 px-6 overflow-hidden">
      <DotGrid opacity={0.04} center="30% 50%" />
      <Spotlight color="252,76,0" opacity={0.04} position="-top-1/4 left-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Ce qu&apos;on livre
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          Un retainer mensuel. Des rendez-vous dans votre agenda.
        </h2>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          <div className="fade-in">
            <GlassCard>
              <h3 className="font-sora font-semibold text-lg text-white mb-6">Ce qui est inclus</h3>
              <ul className="space-y-4">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </span>
                    <span className="text-white/60 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="fade-in" style={{ transitionDelay: "100ms" }}>
            <GlassCard>
              <h3 className="font-sora font-semibold text-lg text-white mb-6">Ce qu&apos;on ne fait pas</h3>
              <ul className="space-y-4">
                {excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0">
                      <XCircleIcon className="h-4 w-4 text-white/25" />
                    </span>
                    <span className="text-white/35 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div className="fade-in" style={{ transitionDelay: "200ms" }}>
            <GlassCard featured>
              <h3 className="font-sora font-semibold text-2xl text-white">
                Prêt à remplir votre agenda ?
              </h3>
              <p className="mt-4 text-white/50 leading-relaxed">
                Prenons 20 minutes pour voir si Petravio est fait pour vous.
              </p>
              <a
                href="#contact"
                className={cn(
                  "mt-8 inline-block w-full text-center px-6 py-3 rounded-lg font-sora font-semibold text-white",
                  "bg-gradient-to-b from-flame to-ember",
                  "shadow-[0_8px_30px_rgba(252,76,0,0.3)]",
                  "hover:shadow-[0_8px_40px_rgba(252,76,0,0.5)] transition-all",
                )}
              >
                Réserver un appel découverte
              </a>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 7. FOOTER ─── */
function Footer() {
  return (
    <footer id="contact" className="relative bg-black overflow-hidden">
      <DotGrid opacity={0.03} center="50% 30%" />
      <Spotlight opacity={0.08} position="-top-1/3 left-1/2" />

      <div className="max-w-7xl mx-auto px-6 py-20 text-center fade-in relative z-10">
        <p className="text-flame font-sora font-semibold text-sm tracking-widest uppercase">
          Contact
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl text-white">
          Vos prochains chantiers commencent ici.
        </h2>
        <p className="mt-4 text-white/50 max-w-lg mx-auto">
          Réservez un appel découverte de 20 minutes. On vous montrera exactement comment
          Petravio peut remplir votre pipeline.
        </p>
        <a
          href="mailto:contact@petravio.com"
          className={cn(
            "mt-8 inline-block px-10 py-4 rounded-lg font-sora font-semibold text-lg text-white",
            "bg-gradient-to-b from-flame to-ember",
            "shadow-[0_8px_30px_rgba(252,76,0,0.3)]",
            "hover:shadow-[0_8px_40px_rgba(252,76,0,0.5)] transition-all",
          )}
        >
          Prendre un RDV
        </a>
      </div>

      <div className="border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <span className="font-sora text-lg text-white/60">
              <span className="font-semibold">petra</span>
              <span className="font-light">vio</span>
            </span>
            <span className="text-white/25 text-sm ml-2">— Prospection B2B pour le bâtiment</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/30">
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
