import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Petravio — Prospection B2B pour le bâtiment",
  description:
    "Petravio identifie vos prospects dans le secteur du bâtiment, les contacte en votre nom, et vous livre des rendez-vous qualifiés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${sora.variable} ${dmSans.variable} font-dm antialiased`}>
        {children}
      </body>
    </html>
  );
}
