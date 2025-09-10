"use client";
import { useState, useEffect, useRef } from "react";

export default function About() {
  // Estados para controle de animações
  const [isVisible, setIsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Observer para animar elementos quando entram na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay para skills aparecerem depois
          setTimeout(() => setSkillsVisible(true), 500);
        }
      },
      { threshold: window.innerWidth < 768 ? 0.01 : 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Skills técnicas com níveis de proficiência
  const skills = [
    { name: "JavaScript", level: 90, color: "bg-yellow-500" },
    { name: "React.js", level: 85, color: "bg-blue-500" },
    { name: "Next.js", level: 80, color: "bg-gray-800" },
    { name: "Node.js", level: 75, color: "bg-green-500" },
    { name: "SQL", level: 70, color: "bg-indigo-600" },
    { name: "TailwindCSS", level: 88, color: "bg-cyan-500" },
    { name: "UX/UI Design", level: 80, color: "bg-purple-500" },
    { name: "Git", level: 85, color: "bg-orange-500" },
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

          {/* Coluna 2: Imagem placeholder */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              {/* Placeholder para foto profissional */}
              <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <svg
                    className="w-24 h-24 mx-auto mb-4 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <p className="text-lg opacity-75">Sua foto aqui</p>
                  <p className="text-sm opacity-50">400x600px recomendado</p>
                </div>
              </div>
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

        {/* Seção de skills técnicas com barras de progresso */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Minhas Habilidades</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="text-gray-600 text-sm">{skill.level}%</span>
                </div>

                {/* Progress bar animada */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${skill.color} transition-all duration-1500 delay-${index * 100}`}
                    style={{
                      width: skillsVisible ? `${skill.level}%` : "0%",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
