"use client";

import {
  SiFigma,
  SiGoogle,
  SiGoogleanalytics,
  SiNextdotjs,
  SiNotion,
  SiVercel,
} from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const differentials = [
  {
    title: "SEO para Google",
    description:
      "Estruturo sites para ranquear melhor nos motores de busca, com foco em SEO técnico, performance e conteúdo rastreável.",
    Icon: SiGoogle,
    iconClassName: "text-[#4285F4]",
  },
  {
    title: "Hospedagem de ponta",
    description:
      "Trabalho com plataformas modernas como Vercel para deploy rápido, estabilidade, cache eficiente e boa experiência global.",
    Icon: SiVercel,
    iconClassName: "text-[#E6EEF4]",
  },
  {
    title: "Stack de última geração",
    description:
      "Utilizo Next.js e ecossistema React moderno para construir aplicações rápidas, escaláveis e preparadas para crescer.",
    Icon: SiNextdotjs,
    iconClassName: "text-[#E6EEF4]",
  },
  {
    title: "Projeto bem planejado",
    description:
      "Antes de codar, organizo fluxos e interfaces no Figma para reduzir retrabalho e garantir decisões visuais consistentes.",
    Icon: SiFigma,
    iconClassName: "text-[#A259FF]",
  },
  {
    title: "Documentação clara",
    description:
      "Registro etapas, decisões e entregas no Notion para que você acompanhe cada fase do projeto com transparência.",
    Icon: SiNotion,
    iconClassName: "text-[#E6EEF4]",
  },
  {
    title: "Métricas e melhoria contínua",
    description:
      "Acompanho métricas com Analytics para entender o comportamento real dos visitantes e evoluir o site com dados.",
    Icon: SiGoogleanalytics,
    iconClassName: "text-[#7FA8BC]",
  },
];

export default function Differentials() {
  return (
    <section
      id="diferenciais"
      className="relative overflow-hidden py-16 md:py-20 bg-[#050A12] border-y border-[#19293A]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(31,107,122,0.24), transparent 34%), radial-gradient(circle at 83% 10%, rgba(90,141,160,0.16), transparent 32%), radial-gradient(circle at 50% 100%, rgba(90,141,160,0.18), transparent 48%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(176,193,206,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(176,193,206,0.08) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(circle at center, black 55%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-[#2B3D51] bg-white/5 px-4 py-1.5 text-sm font-semibold text-[#D4E1EA] backdrop-blur-md">
            Diferenciais
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
            O que torna meus projetos únicos
          </h2>
          <p className="mt-4 text-lg text-[#B8CAD4] max-w-3xl mx-auto">
            Não entrego apenas um site bonito. Entrego estrutura técnica, processo e visão de
            resultado para o projeto performar de verdade.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          loopAdditionalSlides={2}
          speed={1100}
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={20}
          slidesPerView={1.25}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            768: { slidesPerView: 3.1, spaceBetween: 20 },
            1024: { slidesPerView: 3.7, spaceBetween: 22 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="!overflow-visible [&_.swiper-wrapper]:items-stretch"
          aria-label="Carrossel de diferenciais profissionais"
        >
          {differentials.map((item) => (
            <SwiperSlide key={item.title} className="!flex !h-auto pb-2">
              <article className="group flex h-full flex-col rounded-2xl border border-[#2A3A4E] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#3A516A] hover:shadow-[0_26px_46px_rgba(0,0,0,0.42)]">
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#33495F] bg-[#0D1622] shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105">
                    <item.Icon className={`h-6 w-6 ${item.iconClassName}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#E6EEF4]">{item.title}</h3>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#B5C6D2]">
                  {item.description}
                </p>

                <div className="mt-5 h-1.5 w-full rounded-full bg-gradient-to-r from-[#12324A] via-[#1F6B7A] to-[#8FB0C0] opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
