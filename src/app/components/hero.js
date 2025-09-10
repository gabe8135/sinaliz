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
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseIsDown = false;
    const RADIUS = 70;
    let RADIUS_SCALE = 1;
    const RADIUS_SCALE_MIN = 1;
    const RADIUS_SCALE_MAX = 1.5;
    const QUANTITY = 22;
    // Paleta hero
    const palette = ["#3b82f6", "#a855f7", "#6366f1", "#818cf8", "#c7d2fe", "#f3f4f6"];
    let particles = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
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
      if (mouseIsDown) {
        RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02;
      } else {
        RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02;
      }
      RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);
      ctx.clearRect(0, 0, width, height);
      // Removido fundo preto, só desenha as bolinhas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const lp = { x: p.position.x, y: p.position.y };
        p.offset.x += p.speed;
        p.offset.y += p.speed;
        p.shift.x += (mouseX - p.shift.x) * p.speed;
        p.shift.y += (mouseY - p.shift.y) * p.speed;
        p.position.x = p.shift.x + Math.cos(i + p.offset.x) * (p.orbit * RADIUS_SCALE);
        p.position.y = p.shift.y + Math.sin(i + p.offset.y) * (p.orbit * RADIUS_SCALE);
        p.position.x = Math.max(Math.min(p.position.x, width), 0);
        p.position.y = Math.max(Math.min(p.position.y, height), 0);
        p.size += (p.targetSize - p.size) * 0.05;
        if (Math.round(p.size) === Math.round(p.targetSize)) {
          p.targetSize = 1 + Math.random() * 7;
        }
        ctx.save();
        // Cauda tipo cometa
        ctx.beginPath();
        ctx.moveTo(lp.x, lp.y);
        ctx.lineTo(p.position.x, p.position.y);
        ctx.strokeStyle = p.fillColor;
        ctx.globalAlpha = 0.18;
        ctx.lineWidth = p.size * 2.5;
        ctx.shadowColor = p.fillColor;
        ctx.shadowBlur = 32;
        ctx.stroke();

        // Bolinha principal
        ctx.beginPath();
        ctx.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, true); // tamanho dobrado
        ctx.fillStyle = p.fillColor;
        ctx.globalAlpha = 0.45;
        ctx.shadowBlur = 64;
        ctx.fill();
        ctx.restore();
      }
      frame = requestAnimationFrame(loop);
    }

    function mouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    function mouseDown() {
      mouseIsDown = true;
    }
    function mouseUp() {
      mouseIsDown = false;
    }

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("resize", resize);
    resize();
    createParticles();
    loop();
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 z-0">
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
            Especialista em{" "}
            <span className="text-blue-300 font-semibold">lançamento de produtos digitais</span> e
            <span className="text-purple-300 font-semibold"> desenvolvimento de marcas</span>.
            Criando experiências web inovadoras que conectam tecnologia, design e estratégia.
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
              onClick={() => scrollToSection("about")}
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Rolar para próxima seção"
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

      {/* Estatísticas/números impressionantes (opcional) */}
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
      </div>
    </section>
  );
}
