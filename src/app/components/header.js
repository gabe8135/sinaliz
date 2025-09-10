"use client";
import { useState, useEffect } from "react";
// ...existing code...

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detecta scroll para alterar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
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
    { name: "Sobre", id: "about" },
    { name: "Projetos", id: "projects" },
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
              className={`text-xl font-bold transition-colors duration-300 hover:text-blue-600 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Gabriel Ramos
            </button>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
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
                className={`block w-full text-center px-3 py-2 text-base font-medium transition-all duration-300 hover:text-blue-600 transform hover:translate-x-2 ${
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
