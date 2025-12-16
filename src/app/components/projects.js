"use client";
import { useState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import ContactButton from "./ui/ContactButton";

export default function Projects() {
  // Detecta se está em mobile (apenas no cliente)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Estado para controlar quais cards estão com tecnologias expandidas
  const [expandedTech, setExpandedTech] = useState({});

  // Função para alternar expansão de tecnologias por card
  const toggleTech = (id) => {
    setExpandedTech((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  // Estados para animações e sistema de filtros
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);

  // Observer para detectar quando seção entra na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: window.innerWidth < 768 ? 0.01 : 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Portfolio de projetos desenvolvidos
  const projects = [
    {
      id: 1,
      title: "Marketplace Local & App",
      category: "fullstack backend mobile frontend",
      description:
        "Plataforma inovadora que conecta empresas locais com clientes, oferecendo sistema de marketplace, geolocalização e pagamentos integrados.",
      longDescription:
        "O VemPraCá App é uma solução completa para negócios locais, desenvolvida com Next.js 15.2.4, React, Supabase, PostgreSQL e TailwindCSS. Utiliza Radix UI para componentes acessíveis, Swiper para carrosséis, Google Analytics GA4 e Google Tag Manager para análise e gestão de tags, hospedagem na Vercel, Webpack para build, HSTS para segurança e Priority Hints para performance.",
      image: "/images/projects/vempraca.webp",
      technologies: [
        "Next.js",
        "React",
        "Radix UI",
        "Supabase",
        "PostgreSQL",
        "Tailwind CSS",
        "Swiper",
        "Vercel",
        "Webpack",
        "HSTS",
        "Priority Hints",
        "Google Analytics GA4",
        "Google Tag Manager",
      ],
      links: {
        live: "https://vempracaapp.com",
        github: "https://github.com/gabe8135/VemPraCa",
      },
      featured: true,
      status: "Concluído",
    },
    {
      id: 2,
      title: "Catálogo Online de Produtos",
      category: "fullstack backend mobile frontend",
      description:
        "Loja virtual e mostruário online para joalheria, com catálogo de produtos, design elegante e responsivo.",
      longDescription:
        "O Bella Pratas é um mostruário online para uma loja de pratas e joalheria, desenvolvido com Next.js 15.3.5, React, Supabase, PostgreSQL e TailwindCSS. Utiliza Radix UI para componentes acessíveis, Font Awesome para ícones, hospedagem na Vercel, Webpack para build, HSTS para segurança, e Priority Hints para performance.",
      image: "/images/projects/bella-pratas.webp",
      technologies: [
        "Next.js",
        "React",
        "PostgreSQL",
        "Supabase",
        "Tailwind CSS",
        "Radix UI",
        "Font Awesome",
        "Vercel",
        "Webpack",
        "HSTS",
        "Priority Hints",
      ],
      links: {
        live: "https://bella-pratas.vercel.app/",
        github: "https://github.com/gabe8135/bella-pratas",
      },
      featured: false,
      status: "Concluído",
    },
    {
      id: 7,
      title: "Site Institucional Moderno",
      category: "fullstack mobile frontend",
      description:
        "Site empresarial moderno para a Geomind, com animações, performance e recursos avançados.",
      longDescription:
        "O site institucional da Geomind foi desenvolvido com Next.js 15.4.4, React, Tailwind CSS, Framer Motion e Vercel. Conta com recursos de PWA, Open Graph, Webpack, HSTS, Priority Hints e foco em performance e segurança.",
      image: "/images/projects/geomind.webp",
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Webpack",
        "PWA",
        "Open Graph",
        "Vercel",
        "HSTS",
        "Priority Hints",
      ],
      links: {
        live: "https://geomind.com.br",
        github: "https://github.com/gabe8135/Geomind-Website",
      },
      featured: false,
      status: "Concluído",
    },
    {
      id: 3,
      title: "Landing Page",
      category: "frontend",
      description:
        "Landing page moderna e otimizada para conversão, com animações suaves e design responsivo para empresa de tecnologia.",
      longDescription:
        "Landing page desenvolvida com foco em performance e conversão, utilizando Bootstrap 5.3.0, AOS para animações, Font Awesome 6.5.0, hospedagem na Netlify, e recursos de segurança como HSTS. Utiliza Google Analytics GA4, Google Tag Manager, e CDNs como Cloudflare, cdnjs e jsDelivr para performance.",
      image: "/images/projects/landin.webp",
      technologies: [
        "Bootstrap",
        "AOS",
        "Cloudflare",
        "Font Awesome",
        "Netlify",
        "HSTS",
        "Google Analytics GA4",
        "Google Tag Manager",
        "cdnjs",
        "jsDelivr",
      ],
      links: {
        live: "https://landin-vendas.netlify.app/",
        github: "https://github.com/gabe8135/landinfreela",
      },
      featured: false,
      status: "Concluído",
    },
    {
      id: 4,
      title: "Dashboard Analítico de Evento",
      category: "fullstack backend frontend",
      description:
        "Dashboard analítico para acompanhamento das avaliações dos estandes gastronômicos da Festa Caiçara, usando a plataforma VemPraCa como ferramenta central.",
      longDescription:
        "Desenvolvimento de sistema de métricas e relatórios em tempo real para o evento, com QR Codes individuais, gráficos de engajamento, exportação de dados e insights para os organizadores. Case de uso avançado do VemPraCa em eventos públicos.",
      image: "/images/projects/dados.webp", // Troque para o caminho real da imagem
      technologies: ["VemPraCa", "Next.js", "Supabase", "Chart.js", "Analytics"],
      links: {
        live: "https://vempracaapp.com/dashboard",
        github: "https://github.com/gabe8135/VemPraCa",
      },
      featured: true,
      status: "Concluído",
    },
    {
      id: 6,
      title: "Página de Agendamento Online",
      category: "fullstack backend frontend",
      description:
        "Página de agendamento de consultas para clínica multidisciplinar, com foco em Nutrição e Psicologia. Interface intuitiva, moderna e pensada para facilitar o acesso dos pacientes às especialidades.",
      longDescription:
        "O projeto BemViver foi desenvolvido para conectar pacientes às especialidades de Nutrição e Psicologia, oferecendo agendamento online, informações detalhadas e uma experiência acolhedora. Utiliza React e Next.js 14.2.33 para performance e SEO, Tailwind CSS para design responsivo, Framer Motion para animações suaves, hospedagem na Vercel, Webpack para build, HSTS para segurança e Priority Hints para otimização. O site reflete o cuidado e a atenção da clínica com cada paciente.",
      image: "/images/projects/bemviver.webp",
      technologies: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Vercel",
        "Webpack",
        "HSTS",
        "Priority Hints",
      ],
      links: {},
      featured: false,
      status: "Em desenvolvimento",
    },
  ];

  // Categorias para filtro
  const categories = [
    { key: "all", label: "Todos" },
    { key: "fullstack", label: "Full Stack" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "mobile", label: "Mobile" },
  ];

  // Sistema de filtros para organizar projetos por categoria
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category.split(" ").includes(filter));

  // Visibilidade individual dos cards
  const [cardsVisible, setCardsVisible] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filteredProjects.length);
    const observers = cardRefs.current.map((ref, idx) => {
      if (!ref) return null;
      return new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardsVisible((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
          }
        },
        // Dispara mais cedo: baixa sensibilidade e rootMargin positivo
        // para iniciar a animação antes do card entrar totalmente na viewport
        { threshold: 0, rootMargin: "0px 0px 300px 0px" }
      );
    });
    cardRefs.current.forEach((ref, idx) => {
      if (ref && observers[idx]) observers[idx].observe(ref);
    });
    return () => {
      observers.forEach((observer, idx) => {
        if (observer && cardRefs.current[idx]) observer.disconnect();
      });
    };
  }, [filteredProjects.length]);

  // Abertura de links externos em nova aba
  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-x-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Cabeçalho da seção */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projetos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi, desde MVPs até sistemas completos
          </p>
        </div>

        {/* Filtros de categoria */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid responsivo de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-w-0">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`relative rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 border border-blue-100 bg-[#f3f5f8a6] min-w-0
                ${cardsVisible[index] ? "opacity-100" : "opacity-0"}
                ${
                  isMobile
                    ? cardsVisible[index]
                      ? "translate-y-0 scale-100"
                      : "translate-y-8 scale-95"
                    : cardsVisible[index]
                      ? "translate-y-0"
                      : "translate-y-10"
                }
              `}
              style={{
                transitionDelay: `${index * 100 + 500}ms`,
              }}
            >
              {/* Badge para projetos em destaque */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    Destaque
                  </span>
                </div>
              )}

              {/* Imagem do projeto ou placeholder */}
              <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden">
                {project.image && project.image !== "/api/placeholder/600/400" ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <div className="text-purple-400 text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-2 opacity-80"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                    </svg>
                    <p className="text-sm font-semibold">Screenshot do projeto</p>
                  </div>
                )}
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-bold shadow-md ${
                      project.status === "Concluído"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Conteúdo do card estilizado */}
              <div className="p-8 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-blue-900 mb-1">{project.title}</h3>

                <p className="mb-5 line-clamp-3 text-base" style={{ color: "#779ECB" }}>
                  {project.description}
                </p>

                {/* Stack de tecnologias */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(expandedTech[project.id]
                    ? project.technologies
                    : project.technologies.slice(0, 3)
                  ).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 text-sm rounded-full font-semibold shadow border border-gray-100"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && !expandedTech[project.id] && (
                    <button
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 via-purple-50 to-white text-gray-800 text-sm rounded-full font-semibold shadow border border-gray-100 focus:outline-none hover:bg-blue-100 transition"
                      onClick={() => toggleTech(project.id)}
                      aria-label={`Mostrar todas as tecnologias do projeto ${project.title}`}
                      type="button"
                    >
                      +{project.technologies.length - 3}
                    </button>
                  )}
                  {project.technologies.length > 3 && expandedTech[project.id] && (
                    <button
                      className="px-3 py-1 bg-gradient-to-r from-purple-100 via-blue-100 to-white text-purple-700 text-xs rounded-full font-bold shadow border-2 border-blue-300 focus:outline-none hover:bg-purple-200 transition flex items-center gap-1"
                      onClick={() => toggleTech(project.id)}
                      aria-label={`Ocultar tecnologias do projeto ${project.title}`}
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      Ocultar tecnologias
                    </button>
                  )}
                </div>

                {/* Botões de ação padronizados */}
                <div className="flex gap-3">
                  {project.links.live && (
                    <Button
                      onClick={() => openLink(project.links.live)}
                      variant="primary"
                      size="sm"
                      className="flex-1 text-sm"
                    >
                      Ver Demo
                    </Button>
                  )}

                  {project.links.github && (
                    <Button
                      onClick={() => openLink(project.links.github)}
                      variant="secondary"
                      size="sm"
                      className="flex-1 text-sm"
                    >
                      GitHub
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para mais projetos */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-600 mb-6">
            Interessado em ver mais projetos ou discutir uma colaboração?
          </p>
          <ContactButton
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="primary"
            size="lg"
            showIcon={false}
          >
            Vamos Conversar
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
