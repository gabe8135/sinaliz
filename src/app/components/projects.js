"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./projects.css";
import ProjectReveal from "./ProjectReveal";
import BorderGlow from "./BorderGlow";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
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
      id: 8,
      title: "Armazém dos Musgos",
      category: "frontend",
      description:
        "Site institucional com catálogo de musgos naturais para terrários, paisagismo e decoração. Design responsivo, apresentação de produtos e contato direto pelo WhatsApp.",
      image: "/images/projects/armazem-dos-musgos.png",
      technologies: [
        "Next.js 16.2.12",
        "React",
        "PWA",
        "Open Graph",
        "Turbopack",
        "Vercel",
        "Priority Hints",
      ],
      links: {
        live: "https://www.armazemdosmusgos.com.br/",
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
      title: "Bio-A",
      hidden: true,
      category: "fullstack mobile frontend",
      description:
        "Site institucional para empresa de design biofílico, com foco em composições vegetais para ambientes residenciais e corporativos. Interface moderna, responsiva e otimizada para performance.",
      image: "/images/projects/bio-a.webp",
      technologies: ["React", "Next.js", "Tailwind CSS", "Turbopack", "Vercel", "Priority Hints"],
      links: {
        live: "https://bio-a-orcin.vercel.app/",
        github: "https://github.com/gabe8135/bio-a",
      },
      featured: false,
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

  const visibleProjects = projects.filter((project) => !project.hidden);

  return (
    <section ref={sectionRef} id="projects" className="project-gallery">
      <div className="project-gallery__inner">
        <header className={"project-heading " + (isVisible ? "is-visible" : "")}>
          <h2>Projetos</h2>
          <p>
            Conheça alguns dos projetos que desenvolvi, de sites institucionais a sistemas
            completos.
          </p>
        </header>
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <ProjectReveal key={project.id} index={index}>
              <BorderGlow
                className="project-border-glow"
                edgeSensitivity={30}
                glowColor="192 55 80"
                backgroundColor="#101c25"
                borderRadius={18}
                glowRadius={24}
                glowIntensity={0.35}
                coneSpread={25}
                animated={false}
                colors={["#b8dce5", "#77bdcc", "#5a8da0"]}
                fillOpacity={0.08}
              >
                <article
                  className={
                    "project-showcase is-visible " +
                    (project.featured ? "project-showcase--featured" : "")
                  }
                >
                  <div className="project-preview">
                    <div className="project-preview__meta">
                      <span>
                        {project.featured
                          ? "EM DESTAQUE"
                          : "PROJETO " +
                            String(
                              projects
                                .filter((p) => !p.hidden)
                                .findIndex((p) => p.id === project.id) + 1
                            ).padStart(2, "0")}
                      </span>
                      <span
                        className={
                          "project-status " +
                          (project.status !== "Concluído" ? "project-status--pending" : "")
                        }
                      >
                        <i />
                        {project.status}
                      </span>
                    </div>
                    <div className="project-browser">
                      <Image
                        src={project.image}
                        alt={"Interface do projeto " + project.title}
                        width={900}
                        height={560}
                        sizes="(max-width: 767px) 90vw, (max-width: 1100px) 46vw, 30vw"
                        quality={85}
                        className="project-preview__image"
                      />
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-info__title">
                      <h3>{project.title}</h3>
                      <span aria-hidden="true">↗</span>
                    </div>
                    <p>{project.description}</p>
                    <div className="project-stack">
                      {(expandedTech[project.id]
                        ? project.technologies
                        : project.technologies.slice(0, 3)
                      ).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <button
                          type="button"
                          onClick={() => toggleTech(project.id)}
                          aria-expanded={!!expandedTech[project.id]}
                          aria-label={
                            (expandedTech[project.id] ? "Ocultar" : "Mostrar") +
                            " tecnologias de " +
                            project.title
                          }
                        >
                          {expandedTech[project.id]
                            ? "Mostrar menos"
                            : "+" + (project.technologies.length - 3) + " tecnologias"}
                        </button>
                      )}
                    </div>
                    <div className="project-actions">
                      {project.links.live ? (
                        <a
                          className="project-live"
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Explorar projeto <FiArrowUpRight />
                        </a>
                      ) : (
                        <span className="project-in-progress">Em construção · em breve</span>
                      )}
                      {project.links.github && (
                        <a
                          className="project-source"
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={"Código de " + project.title + " no GitHub"}
                        >
                          <FiGithub />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </BorderGlow>
            </ProjectReveal>
          ))}
        </div>
        <div className="project-footer">
          <div>
            <h3>Vamos criar algo que se destaca?</h3>
          </div>
          <ContactButton
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            variant="primary"
            size="lg"
            showIcon={false}
          >
            Vamos conversar ↗
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
