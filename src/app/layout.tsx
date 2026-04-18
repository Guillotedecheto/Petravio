import type { Metadata } from "next";
import { Sora, DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Petravio — Audit gratuit de prospection B2B pour le bâtiment",
  description:
    "Petravio identifie les décideurs dans le bâtiment, les contacte en votre nom, et vous livre des RDV qualifiés. Demandez votre audit gratuit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${sora.variable} ${dmSans.variable} ${plusJakarta.variable} font-dm antialiased`}>
        {children}
      </body>
    </html>
  );
}
