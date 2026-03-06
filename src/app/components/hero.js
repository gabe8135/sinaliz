"use client";
import { useEffect, useRef } from "react";
import Button from "./ui/Button";
import ContactButton from "./ui/ContactButton";

export default function Hero() {
  const canvasRef = useRef(null);
  const isVisible = true;
  // ...existing code...

  // Efeito partículas interativas com canvas
  useEffect(() => {
    let frame = null;
    let idleId = null;
    let timeoutId = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileView = window.matchMedia("(max-width: 767px)").matches;
    const hasSaveData =
      typeof navigator !== "undefined" &&
      navigator.connection &&
      navigator.connection.saveData === true;
    const lowPowerDevice =
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;

    const skipCanvasAnimation =
      prefersReducedMotion || (isMobileView && (hasSaveData || lowPowerDevice));

    if (skipCanvasAnimation) {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#0B1623");
      grad.addColorStop(1, "#12324A");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // Parâmetros da galáxia
    const STAR_COUNT = isMobileView ? 96 : 180;
    const ARMS = 4;
    const ARM_SPREAD = (Math.PI * 2) / ARMS;
    const SPIRAL_TIGHTNESS = 0.12;
    const STAR_COLORS = ["#ffffff", "#d9e2e8", "#a9bcc9", "#7e98a8", "#1f6b7a", "#9fb3c0"];
    const targetFps = isMobileView ? 30 : 60;
    const frameInterval = 1000 / targetFps;
    let lastTs = 0;
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
      if (ts - lastTs < frameInterval) {
        frame = requestAnimationFrame(loop);
        return;
      }
      lastTs = ts;

      if (document.hidden) {
        frame = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      // Fundo escuro espacial
      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#0B1623"); // azul petróleo escuro
      grad.addColorStop(1, "#12324A"); // navy institucional
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

    const startAnimation = () => {
      createGalaxy();
      loop(0);
    };

    window.addEventListener("resize", resize, { passive: true });

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startAnimation, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(startAnimation, 250);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1623] via-[#12324A] to-[#0F2234] z-0">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16 sm:mt-24">
        {/* Animação condicional baseada no state */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Saudação de entrada */}
          <p className="text-[#B8CAD4] text-lg md:text-xl mb-4 font-medium">Olá! Eu sou</p>

          {/* Nome principal com gradient typography */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-[#9FB3C0] to-[#5A8DA0] bg-clip-text text-transparent">
              Gabriel Ramos
            </span>
          </h1>

          {/* Título profissional */}
          <h2 className="text-xl md:text-3xl lg:text-4xl text-gray-300 mb-8 font-light">
            Desenvolvedor Fullstack / UX Designer
          </h2>

          {/* Descrição das especialidades */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transformo ideias em sites modernos, rápidos e fáceis de usar. Com experiência em
            projetos digitais, ajudo empresas e profissionais a ter presença online de verdade, com
            soluções sob medida, design funcional e tecnologia de ponta. Meu compromisso é entregar
            sites que realmente funcionam para o seu negócio, sem promessas exageradas só trabalho
            sério, transparente e eficiente.
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
            <p className="text-2xl font-bold text-[#9FB3C0]">3+</p>
            <p className="text-sm text-gray-400">Anos Experiência</p>
          </div>
          <div className="text-white">
            <p className="text-2xl font-bold text-[#1F6B7A]">15+</p>
            <p className="text-sm text-gray-400">Projetos Concluídos</p>
          </div>
          <div className="text-white">
            <p className="text-2xl font-bold text-[#2F7D57]">100%</p>
            <p className="text-sm text-gray-400">Satisfação</p>
          </div>
        </div>
      </div> */}
    </section>
  );
}
