import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import DeferredFooter from "./components/DeferredFooter";
import SwRegister from "./components/SwRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gabriel Ramos | Desenvolvedor Fullstack & UX para Sites",
  description:
    "Portfolio de Gabriel Ramos, desenvolvedor fullstack com foco em UX. Crio sites modernos, rapidos e orientados a resultado para empresas e profissionais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/favicon.png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <meta name="theme-color" content="#12324A" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <DeferredFooter />
        <SwRegister />
      </body>
    </html>
  );
}
