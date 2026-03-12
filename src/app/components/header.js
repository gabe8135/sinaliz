"use client";
import { useState, useEffect } from "react";
import ContactButton from "./ui/ContactButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detecta scroll para alterar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navegação suave entre seções
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsMobileMenuOpen(false); // Fecha menu mobile após navegação
    }
  };

  const navItems = [
    { name: "Início", id: "hero" },
    { name: "Projetos", id: "projects" },
    { name: "Sobre", id: "about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 overscroll-contain ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
      style={{ overscrollBehavior: "contain" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Nome */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              aria-label="Ir para o início"
              className={`transition-colors duration-300 hover:text-[#1F6B7A] ${
                isScrolled ? "text-[#072747]" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2076.89 226.8"
                className="h-5 w-auto"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M402.81,2006.39l56.73-.23c6.58,21.82,30.1,32.72,74.09,32.72q30.12,0,46.32-8.38t16.21-20.79q0-9-7.35-16.68t-31.5-12l-60-11q-30.81-5.64-45.52-12.81A59.25,59.25,0,0,1,428.22,1937a48.73,48.73,0,0,1-8.85-27.89q0-29.49,31.26-47.31t80-17.81q40.46,0,72.3,12.41c21.23,8.28,34.76,29.76,40.58,44.91L588,1900.9c-8.28-16.65-25.81-25-56.16-25q-26.44,0-40.35,7.73t-13.91,19.67q0,18.86,43.68,26.44l53.34,9.35q48.51,8.54,65.06,25.22t16.56,36.84q0,32.4-34.83,51T531.1,2070.8q-46.68,0-81.73-13.7C426,2048,410.47,2025.74,402.81,2006.39Z"
                  transform="translate(-402.81 -1844)"
                />
                <path
                  d="M884.53,2067.42H851.09a26.58,26.58,0,0,1-26.57-26.57v-66.28l-94.14-112a9.23,9.23,0,0,1,7.07-15.17h48.68l74.49,90.75,71.27-90.75h54.26L884.53,1974.57Z"
                  transform="translate(-402.81 -1844)"
                />
                <path
                  d="M1312.91,2067.42h-55l-119.09-140.57-9-10.47q-2.76-3.23-8.5-10.16v161.2h-45.52v-175a45,45,0,0,1,45-45h0a37.74,37.74,0,0,1,28.8,13.33L1248.3,1977q1.38,1.6,20,23.69V1847.39h44.6Z"
                  transform="translate(-402.81 -1844)"
                />
                <path
                  d="M1982.29,2067.42H1789.17v-220h59.55v184.08h133.57Z"
                  transform="translate(-402.81 -1844)"
                />
                <path
                  d="M2142.14,2067.42h-56.55V1876.91a29.51,29.51,0,0,1,29.52-29.52h27Z"
                  transform="translate(-402.81 -1844)"
                />
                <path
                  d="M2479.71,2033.24v34.18h-232v-8.22a54.8,54.8,0,0,1,16.48-39.18l144.23-141.2h-118a31.43,31.43,0,0,1-31.43-31.43h216.11v31.43l-158.87,154.42Z"
                  transform="translate(-402.81 -1844)"
                />
                <path
                  d="M1543.34,1885.1l45.75,98.17h-62.81l-13.1,31.76h91.08l25.06,52.39h60.47l-105.3-220h-43.25a41.71,41.71,0,0,0-37.71,23.87l-92.85,196.16H1459Z"
                  transform="translate(-402.81 -1844)"
                />
              </svg>
            </button>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-[#1F6B7A] hover:scale-105 ${
                    isScrolled ? "text-gray-700" : "text-white/90"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <ContactButton onClick={() => scrollToSection("contact")} size="lg" showIcon={false}>
              Entre em Contato
              <svg
                className="w-5 h-5 ml-2 inline-block align-middle"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </ContactButton>
          </div>

          {/* Botão Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  : "text-white hover:text-gray-300 hover:bg-white/10"
              }`}
            >
              <span className="sr-only">Abrir menu principal</span>
              {/* Ícone Hamburger Animado */}
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2.5" : "rotate-0 translate-y-1"
                  }`}
                ></span>
                <span
                  className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100 translate-y-2.5"
                  }`}
                ></span>
                <span
                  className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "-rotate-45 translate-y-2.5" : "rotate-0 translate-y-4"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-2 pt-2 pb-3 space-y-1 transform transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
            } ${
              isScrolled
                ? "bg-white/95 backdrop-blur-md border-t border-gray-200"
                : "bg-black/20 backdrop-blur-md"
            }`}
          >
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-center px-3 py-2 text-base font-medium transition-all duration-300 hover:text-[#1F6B7A] transform hover:translate-x-2 ${
                  isScrolled ? "text-gray-700" : "text-white/90"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
                }}
              >
                {item.name}
              </button>
            ))}

            {/* CTA Button Mobile */}
            <div
              className="pt-4 transform transition-all duration-500"
              style={{
                transitionDelay: isMobileMenuOpen ? `${navItems.length * 100}ms` : "0ms",
              }}
            >
              <ContactButton
                onClick={() => scrollToSection("contact")}
                size="md"
                className="mx-auto block"
                showIcon={false}
              >
                Entre em Contato
                <svg
                  className="w-5 h-5 ml-2 inline-block align-middle"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </ContactButton>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
