import type { Metadata } from "next";
import { Cormorant_Garamond, Rajdhani } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const interfaceFont = Rajdhani({
  variable: "--font-interface",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Pactum X Team",
    template: "%s | Pactum X Team",
  },
  description:
    "Presentacion vertical y refinada del equipo de Pactum X con una interfaz oscura, limpia y optimizada para movil.",
  applicationName: "Pactum X Team",
  keywords: [
    "Pactum X",
    "equipo de desarrollo",
    "presentacion de videojuego",
    "Next.js",
    "Framer Motion",
  ],
  category: "games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${displayFont.variable} ${interfaceFont.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#050705] font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
