import { Exo_2 } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import DeferredFooter from "./components/DeferredFooter";
import SwRegister from "./components/SwRegister";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Gabriel Ramos | Desenvolvedor Fullstack & UX para Sites",
  description:
    "Portfolio de Gabriel Ramos, desenvolvedor fullstack com foco em UX. Crio sites modernos, rapidos e orientados a resultado para empresas e profissionais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={exo2.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/favicon.png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <meta name="theme-color" content="#12324A" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <DeferredFooter />
        <SwRegister />
      </body>
    </html>
  );
}
