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
              aria-label="Synaliz — Ir para o início"
              className={`transition-colors duration-300 hover:text-[#1F6B7A] ${
                isScrolled ? "text-[#072747]" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3000 3000"
                className="block h-10 w-10"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2516.1,128c-222.7-3.1-404.3,176.5-404.3,398.5c0,3.7,0.1,7.3,0.2,11c-8.4,72.1-54.7,272.1-310.9,387.6 c-406.1,183.1-954,423.7-954,423.7s-30.8,14.7-75.8,26.8c-77.3,20.8-159.1,12.5-232.2-20c-5.3-2.4-10.7-4.6-16.2-6.7 c0,0-0.1-0.1-0.1-0.1c0,0,0,0,0,0.1c-40.5-15.4-84.9-22.8-131.4-20.2c-161.8,9.1-292.2,140.5-300,302.4 c-8.9,183.2,137.1,334.6,318.4,334.6c44.6,0,87.1-9.2,125.7-25.8l0,0c170.1-82.1,688.7,126.5,688.7,126.5s235.2,78.4,231.5,178 c-3.8,103.3-197.9,166.5-350.2,241.1c-71.6,35.1-192.4,17.7-245.6,7.5c-8.5-2.4-17.2-4.3-26.1-5.5c-0.2,0-0.3-0.1-0.3-0.1s0,0,0,0 c-8.7-1.2-17.7-1.9-26.7-1.9c-109.3,0-197.5,90.8-193.1,201.1c4,100.6,86.3,182.2,186.9,185.3c95.7,3,176.3-63.6,195.2-153 c0.2,0,0.5,0,0.7,0c30.6-114.8,204.3-207.3,371.2-283.2c126.3-57.4,260.1-7.9,260.1-7.9s0,0,0,0c30.2,9.9,63,14.1,97.3,10.9 c118.7-11,212-109.7,216.5-228.9c5.2-136.3-103.8-248.5-239-248.5c-45.4,0-87.8,12.6-123.9,34.5c0,0,0,0,0,0c0,0,0,0,0,0 c-7.2,4.3-14.1,9.1-20.7,14.1c-100,58-240,4.7-240,4.7s-228.5-83.3-424.8-156.9c-143-53.6-163.1-151.5-165-192.3 c0.3,0.3,0.4,0.5,0.4,0.5s-0.2-0.7-0.5-2.1c0.3-4.8,0.4-9.6,0.4-14.4c6.7-41.2,64.8-159.1,467-346.6 c496.2-231.3,932.6-493.9,1153.5-411.9c49.4,21.9,104,34.1,161.5,34.1c222,0,401.6-181.5,398.5-404.3 C2906,306.2,2730.8,131,2516.1,128z" />
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
