"use client";

import { useEffect, useState, useRef } from "react";

export default function Footer() {
  const canvasRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Itens de navegação principal
  const navItems = [
    { name: "Início", id: "hero" },
    { name: "Sobre", id: "about" },
    { name: "Projetos", id: "projects" },
    { name: "Contato", id: "contact" },
  ];

  // Links para redes sociais
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/gabe8135",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/gabriel-ramos-4a70a3185/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:ramos.analista@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Behance",
      url: "https://www.behance.net/cloud160/projects",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 5.487a2.25 2.25 0 0 1 3.182 3.182l-9.75 9.75a2 2 0 0 1-.707.464l-3.25 1.083a.5.5 0 0 1-.634-.634l1.083-3.25a2 2 0 0 1 .464-.707l9.75-9.75z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 7.5l1.5 1.5" />
        </svg>
      ),
    },
  ];

  // Navegação suave entre seções
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    let frame = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;
    // Variáveis de interação do canvas (não usadas, removidas para evitar warnings)
    const RADIUS = 70;
    const QUANTITY = 18;
    const palette = ["#3b82f6", "#a855f7", "#6366f1", "#818cf8", "#c7d2fe", "#f3f4f6"];
    let particles = [];

    function resize() {
      width = window.innerWidth;
      // Pega altura real do footer
      if (canvas.parentElement) {
        height = canvas.parentElement.offsetHeight;
      } else {
        height = 220;
      }
      canvas.width = width;
      canvas.height = height;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < QUANTITY; i++) {
        particles.push({
          size: 1,
          position: { x: mouseX, y: mouseY },
          offset: { x: 0, y: 0 },
          shift: { x: mouseX, y: mouseY },
          speed: 0.01 + Math.random() * 0.03,
          targetSize: 1,
          fillColor: palette[Math.floor(Math.random() * palette.length)],
          orbit: RADIUS * 0.5 + RADIUS * 0.5 * Math.random(),
        });
      }
    }

    function loop() {
      ctx.clearRect(0, 0, width, height);
      // Luz difusa suave que segue o mouse
      ctx.save();
      // Gradiente roxo escuro, harmonizando com o site
      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 80);
      grad.addColorStop(0, "rgba(88,51,139,0.22)"); // Roxo escuro, mais intenso no centro
      grad.addColorStop(1, "rgba(88,51,139,0)"); // Roxo escuro, transparente nas bordas
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 80, 0, Math.PI * 2, true);
      ctx.fillStyle = grad;
      ctx.filter = "blur(18px)";
      ctx.fill();
      ctx.filter = "none";
      ctx.restore();
      frame = requestAnimationFrame(loop);
    }

    function mouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY - (window.innerHeight - height); // ajusta para o footer
    }
    // ...existing code...

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", resize);
    resize();
    createParticles();
    loop();
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white overflow-x-hidden relative">
      {/* Canvas de partículas interativas */}
      <canvas
        ref={canvasRef}
        id="footer-particles"
        className="absolute inset-0 w-full h-full block z-0"
        style={{ pointerEvents: "none" }}
      />
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            className={`md:col-span-2 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Gabriel Ramos</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Desenvolvedor Full Stack especializado em UX/Product com expertise em lançamento de
              produtos digitais e desenvolvimento de marcas.
            </p>
            <p className="text-gray-400 text-sm">
              Criando experiências web inovadoras que conectam tecnologia e design.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2">
              <a
                href="mailto:ramos.analista@gmail.com"
                className="text-gray-300 hover:text-white transition-colors duration-300 block"
              >
                ramos.analista@gmail.com
              </a>
              <a
                href="https://vempracaapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300 block"
              >
                vempracaapp.com
              </a>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-400">Redes Sociais</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-gray-800 rounded-lg transform transition-transform duration-500 ${
                      isVisible ? "scale-100" : "scale-0"
                    }`}
                    style={{ transitionDelay: `${800 + idx * 100}ms` }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div
            className={`flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} Gabriel Ramos. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0">
              Feito com Next.js, Tailwind CSS e Muito Código
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
