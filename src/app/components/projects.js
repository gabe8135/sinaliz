"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import ContactButton from "./ui/ContactButton";

export default function Projects() {
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
    setCardsVisible([]);

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visibleIndexes = [];

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const rawIndex = entry.target.dataset.cardIndex;
          const index = Number(rawIndex);
          if (!Number.isNaN(index)) {
            visibleIndexes.push(index);
            observer.unobserve(entry.target);
          }
        });

        if (visibleIndexes.length > 0) {
          setCardsVisible((prev) => {
            const updated = [...prev];
            visibleIndexes.forEach((index) => {
              updated[index] = true;
            });
            return updated;
          });
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px",
      }
    );

    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;
      ref.dataset.cardIndex = String(index);
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
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
      className="py-20 bg-gradient-to-br from-[#F4F6F8] via-[#E7EDF1] to-white overflow-x-hidden w-full"
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
          className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key)}
              aria-pressed={filter === category.key}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6B7A] focus-visible:ring-offset-2 ${
                filter === category.key
                  ? "bg-[#12324A] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-[#E7EDF1] hover:text-[#1F6B7A]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid responsivo de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 min-w-0 items-stretch">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`group relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500 border border-[#D3DEE6] bg-white/85 backdrop-blur-sm min-w-0 shadow-[0_16px_40px_-22px_rgba(18,50,74,0.45)]
                ${cardsVisible[index] ? "opacity-100 blur-0" : "opacity-0 blur-[2px]"}
                ${cardsVisible[index] ? "translate-y-0 scale-100" : "translate-y-10 scale-[0.98]"}
                motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.01] motion-safe:hover:shadow-[0_24px_54px_-24px_rgba(18,50,74,0.55)] motion-safe:hover:border-[#9FB3C0]
              `}
              style={{
                transitionDelay: `${index * 100 + 500}ms`,
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(31,107,122,0.2),transparent_55%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#12324A] via-[#1F6B7A] to-[#9FB3C0]"
              />

              {/* Badge para projetos em destaque */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-gradient-to-r from-[#12324A] to-[#1F6B7A] text-white text-[11px] font-bold tracking-wide uppercase px-4 py-2 rounded-full shadow-lg ring-1 ring-white/25">
                    Destaque
                  </span>
                </div>
              )}

              {/* Imagem do projeto ou placeholder */}
              <div className="relative z-10 h-44 sm:h-48 lg:h-52 bg-[#F7FAFC] flex items-center justify-center overflow-hidden">
                {project.image && project.image !== "/api/placeholder/600/400" ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={640}
                    height={420}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={72}
                    loading="lazy"
                    className="object-cover h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="text-[#5E7685] text-center">
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
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1623]/35 via-transparent to-transparent"
                />
                {/* Status badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold shadow-md ring-1 ${
                      project.status === "Concluído"
                        ? "bg-green-100 text-green-800 ring-green-200"
                        : "bg-[#E7EDF1] text-[#12324A] ring-[#C9D7E0]"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Conteúdo do card estilizado */}
              <div className="relative z-10 p-6 sm:p-7 flex flex-1 flex-col">
                <h3 className="text-xl sm:text-2xl leading-tight font-bold text-[#12324A] mb-2 min-h-[3rem]">
                  {project.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-[15px] sm:text-base text-[#334155] leading-relaxed min-h-[4.5rem]">
                  {project.description}
                </p>

                {/* Stack de tecnologias */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {(expandedTech[project.id]
                    ? project.technologies
                    : project.technologies.slice(0, 3)
                  ).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 bg-gradient-to-r from-[#F4F6F8] to-[#E7EDF1] text-[#183247] text-xs sm:text-sm rounded-full font-semibold shadow-sm border border-[#D7E3EA]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && !expandedTech[project.id] && (
                    <button
                      className="px-3 py-1.5 bg-gradient-to-r from-[#F4F6F8] via-[#E7EDF1] to-white text-[#183247] text-xs sm:text-sm rounded-full font-semibold shadow-sm border border-[#D7E3EA] hover:bg-[#DCE7EE] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6B7A] focus-visible:ring-offset-2"
                      onClick={() => toggleTech(project.id)}
                      aria-label={`Mostrar todas as tecnologias do projeto ${project.title}`}
                      type="button"
                    >
                      +{project.technologies.length - 3}
                    </button>
                  )}
                  {project.technologies.length > 3 && expandedTech[project.id] && (
                    <button
                      className="px-3 py-1.5 bg-gradient-to-r from-[#E7EDF1] via-[#D7E3EA] to-white text-[#12324A] text-xs rounded-full font-bold shadow-sm border-2 border-[#9FB3C0] hover:bg-[#DCE7EE] transition flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6B7A] focus-visible:ring-offset-2"
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
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  {project.links.live && (
                    <Button
                      onClick={() => openLink(project.links.live)}
                      variant="primary"
                      size="sm"
                      className="sm:flex-1 text-sm"
                    >
                      Ver Demo
                    </Button>
                  )}

                  {project.links.github && (
                    <Button
                      onClick={() => openLink(project.links.github)}
                      variant="secondary"
                      size="sm"
                      className="sm:flex-1 text-sm"
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
