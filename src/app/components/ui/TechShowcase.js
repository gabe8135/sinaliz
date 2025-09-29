"use client";
import { useEffect, useMemo, useRef, useState, createElement } from "react";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiGit,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiDocker,
  SiVite,
  SiSupabase,
  SiPrisma,
  SiExpress,
  SiVercel,
  SiGraphql,
  SiSass,
  SiJest,
} from "react-icons/si";

export default function IconsShowcase({
  technologies = [
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Vite",
    "Supabase",
    "Prisma",
    "Express",
    "Vercel",
    "GraphQL",
    "Sass",
    "Jest",
    "Git",
  ],
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [showStatic, setShowStatic] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const techList = useMemo(() => technologies.filter(Boolean), [technologies]);

  useEffect(() => {
    if (paused || techList.length === 0) return;
    intervalRef.current = setInterval(() => {
      setShowStatic(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % techList.length);
        setShowStatic(false);
      }, 420); // efeito mais longo/impactante
    }, 2400);
    return () => clearInterval(intervalRef.current);
  }, [paused, techList.length]);

  const current = techList[index] ?? "";

  return (
    <div
      className={
        "relative w-full h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0f1a] via-[#120a1a] to-[#0a0f1a] " +
        className
      }
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="img"
      aria-label="Ícones de tecnologias com transição estilo TV antiga"
    >
      {/* Camada de vidro + leve roxo */}
      <div className="absolute inset-0 rounded-2xl bg-black/30 backdrop-blur-xl ring-1 ring-white/10" />
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-purple-500/5 via-transparent to-purple-900/5 mix-blend-screen" />

      {/* Conteúdo do ícone atual */}
      <div className="relative z-10 w-full h-full grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className={
              (showStatic ? "animate-shake-strong glitch-chroma " : "") +
              "will-change-transform will-change-filter"
            }
            style={
              showStatic
                ? {
                    filter:
                      "drop-shadow(3px 0 0 rgba(255,0,0,0.9)) drop-shadow(-3px 0 0 rgba(0,255,255,0.9)) saturate(1.5) contrast(1.2)",
                  }
                : undefined
            }
          >
            {renderTechIcon(current)}
          </div>
        </div>
      </div>

      {/* Efeito de "chuvisco de TV" ao trocar (inline para evitar warn do linter) */}
      {showStatic && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-80 mix-blend-screen tv-static-lines" />
          <div className="absolute inset-0 opacity-50 tv-grain" />
          <div className="absolute left-0 right-0 h-10 tv-scanline" />
          <div className="absolute left-0 right-0 h-6 tv-scanline delay-100" />
        </div>
      )}
    </div>
  );
}

function renderTechIcon(name) {
  const lower = (name || "").toLowerCase().trim();

  const map = new Map([
    ["javascript", { Icon: SiJavascript, className: "text-yellow-400" }],
    ["js", { Icon: SiJavascript, className: "text-yellow-400" }],
    ["react", { Icon: SiReact, className: "text-cyan-300" }],
    ["next", { Icon: SiNextdotjs, className: "text-white" }],
    ["next.js", { Icon: SiNextdotjs, className: "text-white" }],
    ["node", { Icon: SiNodedotjs, className: "text-lime-400" }],
    ["node.js", { Icon: SiNodedotjs, className: "text-lime-400" }],
    ["tailwind", { Icon: SiTailwindcss, className: "text-cyan-300" }],
    ["tailwind css", { Icon: SiTailwindcss, className: "text-cyan-300" }],
    ["postgresql", { Icon: SiPostgresql, className: "text-sky-300" }],
    ["postgre", { Icon: SiPostgresql, className: "text-sky-300" }],
    ["git", { Icon: SiGit, className: "text-orange-400" }],
    ["typescript", { Icon: SiTypescript, className: "text-blue-400" }],
    ["html", { Icon: SiHtml5, className: "text-orange-500" }],
    ["html5", { Icon: SiHtml5, className: "text-orange-500" }],
    ["css", { Icon: SiCss3, className: "text-blue-500" }],
    ["css3", { Icon: SiCss3, className: "text-blue-500" }],
    ["mongodb", { Icon: SiMongodb, className: "text-green-500" }],
    ["docker", { Icon: SiDocker, className: "text-sky-400" }],
    ["vite", { Icon: SiVite, className: "text-purple-400" }],
    ["supabase", { Icon: SiSupabase, className: "text-emerald-400" }],
    ["prisma", { Icon: SiPrisma, className: "text-white" }],
    ["express", { Icon: SiExpress, className: "text-white" }],
    ["vercel", { Icon: SiVercel, className: "text-white" }],
    ["graphql", { Icon: SiGraphql, className: "text-pink-400" }],
    ["sass", { Icon: SiSass, className: "text-pink-400" }],
    ["jest", { Icon: SiJest, className: "text-red-400" }],
  ]);

  for (const [key, value] of map) {
    if (lower.includes(key)) {
      return createElement(value.Icon, {
        className: "w-28 h-28 md:w-44 md:h-44 " + value.className,
      });
    }
  }

  // fallback genérico
  return <SiJavascript className="w-28 h-28 md:w-44 md:h-44 text-white" />;
}
