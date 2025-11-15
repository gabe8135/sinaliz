"use client";
import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import IconsShowcase from "./ui/TechShowcase";

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
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal da seção */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sobre Mim</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Criando experiências digitais que <span className="text-blue-600">convertem</span>
            </h3>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Sou um <strong>desenvolvedor Full Stack</strong> especializado em UX/Product formado
                em
                <strong> Análise e Desenvolvimento de Sistemas</strong> criando soluções web que
                realmente fazem a diferença para empresas e usuários.
              </p>

              <p>
                Minha paixão é <strong>transformar ideias em produtos digitais</strong> que não
                apenas funcionam perfeitamente, mas também proporcionam experiências memoráveis.
                Combino conhecimento técnico sólido com visão estratégica de produto.
              </p>

              <p>
                Atualmente trabalho em projetos <strong>freelance</strong> também sou o desnvolvedor
                da plataforma
                <strong> VemPraCáApp</strong>, uma plataforma inovadora que conecta empresas locais
                com seus clientes.
              </p>
            </div>

            {/* Stats/números */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3+</div>
                <div className="text-sm text-gray-600">Anos Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-600">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Satisfação Cliente</div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Imagem pessoal no mesmo card do showcase */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            } flex items-center justify-center w-full h-full`}
          >
            <div
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl overflow-hidden flex items-center justify-center w-full h-full"
              style={{ aspectRatio: "5/4", maxWidth: "400px", minWidth: "260px" }}
            >
              <img
                src="/images/about/eu.webp"
                alt="Gabriel Ramos"
                className="object-cover w-full h-full"
                style={{ aspectRatio: "5/4" }}
              />
            </div>
          </div>
        </div>

        {/* Grid de características e diferenciais */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Seção de skills técnicas (somente nomes) */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Minhas Habilidades</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 text-sm font-semibold border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
