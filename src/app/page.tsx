"use client";

import { useEffect, useRef } from "react";

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

const BuildingIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <rect x="6" y="4" width="24" height="28" rx="2" />
    <path d="M12 10h4M20 10h4M12 16h4M20 16h4M12 22h4M20 22h4" />
    <rect x="14" y="26" width="8" height="6" />
  </svg>
);

const HardhatIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M6 22h24M10 22c0-7 3-12 8-12s8 5 8 12" />
    <rect x="6" y="22" width="24" height="6" rx="2" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M22 8a8 8 0 01-6.5 12.5L8 28l-2-2 7.5-7.5A8 8 0 0122 8z" />
    <circle cx="22" cy="14" r="3" />
  </svg>
);

const BoxIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M18 4L4 12v12l14 8 14-8V12L18 4z" />
    <path d="M4 12l14 8 14-8M18 20v12" />
  </svg>
);

const TowerIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#FC4C00" strokeWidth="1.5">
    <path d="M10 32V8l8-4 8 4v24" />
    <path d="M10 14h16M10 20h16M10 26h16" />
    <rect x="16" y="26" width="4" height="6" />
  </svg>
);

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <LogoIcon />
          <span className="font-sora text-xl text-white">
            <span className="font-semibold">petra</span>
            <span className="font-light">vio</span>
          </span>
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
    <section className="relative min-h-screen flex items-center bg-black pt-20">
      <div className="absolute top-20 right-10 w-64 h-64 bg-flame/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-amber/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-20 fade-in">
        <h1 className="font-sora font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl">
          Vos prochains clients sont déjà dans la donnée.
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

/* ─── 5. ICP SECTION ─── */
function ICP() {
  const profiles = [
    {
      icon: <BuildingIcon />,
      title: "Architectes",
      pain: "Dépendent des concours et du réseau pour décrocher de nouveaux projets.",
    },
    {
      icon: <HardhatIcon />,
      title: "Entrepreneurs généraux",
      pain: "Pipeline irrégulier entre les gros chantiers, difficile de lisser l'activité.",
    },
    {
      icon: <WrenchIcon />,
      title: "Artisans 2nd œuvre",
      pain: "Submergés par le chantier en cours, zéro temps pour prospecter le suivant.",
    },
    {
      icon: <BoxIcon />,
      title: "Négociants matériaux",
      pain: "Marché concurrentiel, besoin constant de nouveaux comptes pros.",
    },
    {
      icon: <TowerIcon />,
      title: "Promoteurs",
      pain: "Cycles longs, besoin de remplir le pipeline 12 mois en avance.",
    },
  ];

  return (
    <section className="bg-dark py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-amber font-sora font-semibold text-sm tracking-widest uppercase fade-in">
          Pour qui
        </p>
        <h2 className="mt-4 font-sora font-semibold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-3xl fade-in">
          Spécialisé bâtiment. Pas généraliste.
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {profiles.map((p, i) => (
            <div
              key={i}
              className="fade-in bg-dark-gray border border-white/10 rounded-lg p-6 hover:border-flame transition-colors group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
              <h3 className="font-sora font-semibold text-lg text-white">{p.title}</h3>
              <p className="mt-2 text-white/50 text-sm leading-relaxed">{p.pain}</p>
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
            <span className="text-white/50 text-sm">
              Petravio — Prospection B2B pour le bâtiment
            </span>
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
      <ICP />
      <ValueProp />
      <Footer />
    </div>
  );
}
