"use client";
import Button from "./ui/Button";
import ContactButton from "./ui/ContactButton";
import MagicRings from "./ui/MagicRings";

export default function Hero() {
  const isVisible = true;

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
      {/* Background gradient customizado com overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1623] via-[#12324A] to-[#0F2234] z-0">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* MagicRings com a paleta de identidade do site (teal + azul-petróleo) */}
      <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }}>
        <MagicRings
          color="#1f6b7a"
          colorTwo="#9fb3c0"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={0.8}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>

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
          <h1 className="hero-name text-white mb-6">
            <span className="bg-gradient-to-r from-[#E6EEF4] via-[#B8D3DF] to-[#6CA2B5] bg-clip-text text-transparent">
              Gabriel Ramos
            </span>
          </h1>

          {/* Título profissional */}
          <h2 className="text-xl md:text-3xl lg:text-4xl text-gray-300 mb-8 font-light">
            Desenvolvedor Fullstack / UX Designer
          </h2>

          {/* Descrição das especialidades */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Crio sites institucionais, landing pages e sistemas web sob medida para empresas e
            profissionais. Combino design responsivo e desenvolvimento web para apresentar seus
            serviços e conectar seu negócio a novos clientes.
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
