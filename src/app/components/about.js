"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function About() {
  // Estados para controle de animações
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Observer para animar elementos quando entram na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: window.innerWidth < 768 ? 0.01 : 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Skills técnicas (somente nomes, sem barras ou porcentagens)
  const skills = [
    // Linguagens e frameworks
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",

    // Backend e banco de dados
    "Supabase",
    "PostgreSQL",
    "SQL",

    // UI/UX e animações
    "Tailwind CSS",
    "Radix UI",
    "Framer Motion",

    // Build/deploy
    "Webpack",
    "Vercel",
    "Netlify",

    // PWA
    "PWA",

    // Analytics
    "Google Analytics GA4",
    "Google Tag Manager",

    // Outras competências
    "UX/UI Design",
    "Git",
  ];

  // Principais diferenciais e características
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Desenvolvimento Rápido",
      description: "Entrego projetos com agilidade sem comprometer a qualidade",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "UX Focado",
      description: "Design centrado no usuário para máxima conversão",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Código Limpo",
      description: "Desenvolvimento com boas práticas e documentação",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: "Resultados Mensuráveis",
      description: "Foco em métricas e crescimento do seu negócio",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#050A12] border-t border-[#19293A]"
    >
      {/* Keyframes para ondas animadas na grade */}
      <style>{`
        @keyframes aboutWave1 {
          0%   { transform: translate(-30%, 10%);  opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.85; }
          100% { transform: translate(130%, 60%);  opacity: 0; }
        }
        @keyframes aboutWave2 {
          0%   { transform: translate(130%, 80%);  opacity: 0; }
          15%  { opacity: 0.8; }
          85%  { opacity: 0.7; }
          100% { transform: translate(-30%, 20%);  opacity: 0; }
        }
        @keyframes aboutWave3 {
          0%   { transform: translate(50%, -40%);  opacity: 0; }
          15%  { opacity: 0.6; }
          85%  { opacity: 0.6; }
          100% { transform: translate(10%, 130%);  opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-wave { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

      {/* Camadas de fundo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Glows radiais */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(31,107,122,0.24), transparent 34%), radial-gradient(circle at 83% 10%, rgba(90,141,160,0.16), transparent 32%), radial-gradient(circle at 50% 90%, rgba(90,141,160,0.18), transparent 48%)",
          }}
        />
        {/* Grade estática */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(176,193,206,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(176,193,206,0.08) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage: "radial-gradient(circle at center, black 55%, transparent 100%)",
          }}
        />
        {/* Onda 1 */}
        <div
          className="about-wave absolute"
          style={{
            width: "55%",
            height: "65%",
            background: "radial-gradient(ellipse, rgba(127,168,188,0.20) 0%, transparent 68%)",
            animation: "aboutWave1 7s ease-in-out infinite",
          }}
        />
        {/* Onda 2 */}
        <div
          className="about-wave absolute"
          style={{
            width: "45%",
            height: "55%",
            background: "radial-gradient(ellipse, rgba(31,107,122,0.16) 0%, transparent 68%)",
            animation: "aboutWave2 9s ease-in-out infinite",
            animationDelay: "-3.5s",
          }}
        />
        {/* Onda 3 */}
        <div
          className="about-wave absolute"
          style={{
            width: "35%",
            height: "45%",
            background: "radial-gradient(ellipse, rgba(90,141,160,0.14) 0%, transparent 68%)",
            animation: "aboutWave3 11s ease-in-out infinite",
            animationDelay: "-6s",
          }}
        />
      </div>

      {/* Conteúdo escuro */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Título */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-flex items-center rounded-full border border-[#2B3D51] bg-white/5 px-4 py-1.5 text-sm font-semibold text-[#D4E1EA] backdrop-blur-md">
            Sobre Mim
          </span>
          <p className="mt-4 text-xl text-[#B8CAD4] max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar soluções digitais que fazem a diferença
          </p>
        </div>

        {/* Layout responsivo em duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Coluna de conteúdo textual */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Criando experiências digitais que <span className="text-[#5A8DA0]">convertem</span>
            </h3>
            <div className="space-y-4 text-[#B5C6D2] leading-relaxed">
              <p>
                Sou um <strong className="text-[#E6EEF4]">desenvolvedor Full Stack</strong>{" "}
                especializado em UX/Product formado em{" "}
                <strong className="text-[#E6EEF4]">Análise e Desenvolvimento de Sistemas</strong>{" "}
                criando soluções web que realmente fazem a diferença para empresas e usuários.
              </p>
              <p>
                Minha paixão é{" "}
                <strong className="text-[#E6EEF4]">transformar ideias em produtos digitais</strong>{" "}
                que não apenas funcionam perfeitamente, mas também proporcionam experiências
                memoráveis. Combino conhecimento técnico sólido com visão estratégica de produto.
              </p>
              <p>
                Atualmente trabalho em projetos{" "}
                <strong className="text-[#E6EEF4]">freelance</strong> também sou o desenvolvedor da
                plataforma <strong className="text-[#E6EEF4]">VemPraCáApp</strong>, uma plataforma
                inovadora que conecta empresas locais com seus clientes.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="text-center">
                <div className="text-lg text-[#E6EEF4] font-semibold mb-2">
                  Projetos para diversos segmentos
                </div>
                <div className="text-sm text-[#8FAABB]">
                  Sites institucionais, landing pages, portfólios, sistemas web e soluções
                  personalizadas para empresas, profissionais e startups.
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg text-[#E6EEF4] font-semibold mb-2">
                  Foco em resultado e experiência
                </div>
                <div className="text-sm text-[#8FAABB]">
                  Design funcional, tecnologia atual e atendimento próximo para entregar sites que
                  realmente funcionam para o seu negócio.
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Imagem de perfil */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            } flex items-center justify-center w-full h-full`}
          >
            <div
              className="w-full flex items-center justify-center"
              style={{ maxWidth: "400px", minWidth: "260px" }}
            >
              <Image
                src="/images/about/perfil-svg.svg"
                alt="Gabriel Ramos"
                width={622}
                height={497}
                sizes="(max-width: 1024px) 100vw, 400px"
                loading="lazy"
                className="w-full rounded-xl h-auto"
              />
            </div>
          </div>
        </div>

        {/* Grid de características */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-[#2A3A4E] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-[#5A8DA0] mb-4">{feature.icon}</div>
              <h4 className="font-semibold text-[#E6EEF4] mb-2">{feature.title}</h4>
              <p className="text-[#B5C6D2] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Minhas Habilidades — Carrossel Coverflow */}
      <div className="relative bg-[#050A12] my-3 py-16 border-t border-[#19293A] overflow-hidden">
        <style>{`
          .skills-swiper {
            padding: 14px 0 22px;
          }
          .skills-swiper .swiper-slide {
            width: clamp(200px, 22vw, 280px) !important;
          }
          @media (max-width: 640px) {
            .skills-swiper .swiper-slide {
              width: 190px !important;
            }
          }
          .skills-swiper .swiper-wrapper {
            align-items: center;
          }
          .skills-swiper .swiper-slide-active .skill-card {
            border-color: rgba(90,141,160,0.75) !important;
            box-shadow: 0 0 40px rgba(90,141,160,0.40), 0 12px 35px rgba(0,0,0,0.55) !important;
            background: linear-gradient(135deg, rgba(90,141,160,0.18) 0%, rgba(255,255,255,0.07) 100%) !important;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-10">Minhas Habilidades</h3>
          </div>
          <Swiper
            className="skills-swiper"
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            speed={700}
            coverflowEffect={{
              rotate: 0,
              stretch: -24,
              depth: 260,
              modifier: 1.6,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Autoplay]}
          >
            {skills.map((skill, i) => (
              <SwiperSlide key={i}>
                <div className="skill-card min-h-[120px] rounded-2xl border border-[#2A3A4E] bg-gradient-to-br from-white/[0.09] via-white/[0.05] to-white/[0.03] backdrop-blur-xl px-7 py-8 text-center shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-grab flex items-center justify-center">
                  <span className="text-[#E6EEF4] font-semibold text-base md:text-lg leading-tight block select-none">
                    {skill}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
