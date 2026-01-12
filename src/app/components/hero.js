"use client";
import { useState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import ContactButton from "./ui/ContactButton";

export default function Hero() {
  const canvasRef = useRef(null);
  // Estado para controlar animações de entrada
  const [isVisible, setIsVisible] = useState(false);
  const parallaxRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);
  // ...existing code...

  // Trigger para animação suave após mount do componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Efeito parallax no background decorativo
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        // Parallax relativo à posição da hero na viewport
        const relativeY = -rect.top; // quanto a hero já subiu na tela
        setParallaxY(relativeY * 0.6); // intensidade aumentada
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efeito partículas interativas com canvas
  useEffect(() => {
    let frame = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Parâmetros da galáxia
    const STAR_COUNT = 180;
    const ARMS = 4;
    const ARM_SPREAD = (Math.PI * 2) / ARMS;
    const SPIRAL_TIGHTNESS = 0.12;
    const STAR_COLORS = ["#fff", "#c7d2fe", "#818cf8", "#a855f7", "#f3f4f6", "#6366f1"];
    let stars = [];

    function createGalaxy() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        // Espalha por toda a tela, não só centro
        const arm = i % ARMS;
        const angle = arm * ARM_SPREAD + Math.random() * ARM_SPREAD;
        // Espalha as estrelas por toda a tela
        const maxRadius = Math.sqrt(width * width + height * height) / 2;
        const distance = 40 + Math.random() * (maxRadius - 40);
        const spiralAngle = angle + distance * SPIRAL_TIGHTNESS * (Math.random() * 0.7 + 0.7);
        // Centro aleatório para espalhar
        const centerX = width * (0.2 + 0.6 * Math.random());
        const centerY = height * (0.2 + 0.6 * Math.random());
        stars.push({
          baseAngle: spiralAngle,
          distance,
          speed: 0.000045 + Math.random() * 0.00008, // Metade da velocidade anterior
          size: 1.2 + Math.random() * 1.8,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          twinkle: Math.random() * Math.PI * 2,
          centerX,
          centerY,
        });
      }
    }

    function loop(ts) {
      ctx.clearRect(0, 0, width, height);
      // Fundo escuro espacial
      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#0d0a1f"); // azul/roxo bem escuro
      grad.addColorStop(1, "#140a22"); // roxo profundo
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Desenha estrelas em espiral espalhadas
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Movimento orbital
        const t = ts * star.speed + star.baseAngle;
        const spiralRadius = star.distance * (1 + 0.08 * Math.sin(t * 0.2 + i));
        const x = star.centerX + Math.cos(t) * spiralRadius;
        const y = star.centerY + Math.sin(t) * spiralRadius * (0.98 + 0.04 * Math.cos(i));
        // Twinkle
        const twinkle = 0.7 + 0.5 * Math.sin(ts * 0.002 + star.twinkle);
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, star.size * twinkle, 0, Math.PI * 2, true);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.7 + 0.3 * twinkle;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
      }
      frame = requestAnimationFrame(loop);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createGalaxy();
    }

    window.addEventListener("resize", resize);
    createGalaxy();
    loop(0);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Navegação suave entre seções usando scroll behavior
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    // Section com ID para navegação + altura da tela
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Canvas de partículas interativas */}
      {/* Background gradient customizado com overlay */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 z-0"
        style={{ transform: `translateY(${parallaxY * 0.1}px)` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      {/* Canvas de partículas interativas */}
      <canvas
        ref={canvasRef}
        id="world"
        className="absolute inset-0 w-full h-full block z-10"
        style={{ pointerEvents: "none" }}
      />

      {/* Removido bloco de manchas animadas, agora o fundo é o canvas interativo */}

      {/* Container principal responsivo */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animação condicional baseada no state */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Saudação de entrada */}
          <p className="text-blue-300 text-lg md:text-xl mb-4 font-medium">Olá! Eu sou</p>

          {/* Nome principal com gradient typography */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gabriel Ramos
            </span>
          </h1>

          {/* Título profissional */}
          <h2 className="text-xl md:text-3xl lg:text-4xl text-gray-300 mb-8 font-light">
            Desenvolvedor Full Stack & UX Product
          </h2>

          {/* Descrição das especialidades */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Com experiência em{" "}
            <span className="text-blue-300 font-semibold">produtos digitais</span> e{" "}
            <span className="text-purple-300 font-semibold">construção de marcas</span>, ajudo
            empresas e pessoas a transformar ideias em soluções web que unem tecnologia, design e
            estratégia. Meu foco é entregar valor real, com visão prática e colaborativa.
          </p>

          {/* Botões de call-to-action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* CTA Principal */}
            <Button
              onClick={() => scrollToSection("projects")}
              variant="primary"
              size="xl"
              className="text-lg"
            >
              Ver Meus Projetos
            </Button>

            {/* CTA Secundário */}
            <ContactButton
              onClick={() => scrollToSection("contact")}
              variant="secondary"
              size="xl"
              className="text-lg"
              showIcon={false}
            />
          </div>

          {/* Indicador visual de scroll */}
          <div className="mt-16 animate-bounce">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Rolar para seção de projetos"
            >
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas/números impressionantes (opcional)
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
        <div className="flex space-x-8 text-center">
          <div className="text-white">
            <p className="text-2xl font-bold text-blue-400">3+</p>
            <p className="text-sm text-gray-400">Anos Experiência</p>
          </div>
          <div className="text-white">
            <p className="text-2xl font-bold text-purple-400">15+</p>
            <p className="text-sm text-gray-400">Projetos Concluídos</p>
          </div>
          <div className="text-white">
            <p className="text-2xl font-bold text-indigo-400">100%</p>
            <p className="text-sm text-gray-400">Satisfação</p>
          </div>
        </div>
      </div> */}
    </section>
  );
}
