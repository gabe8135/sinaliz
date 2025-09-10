"use client";
import Button from "./ui/Button";
import { useState, useEffect, useRef } from "react";
// ...existing code...

export default function Contact() {
  // Estados para controle de formulário e animações
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("form"); // "form" | "contact"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef(null);

  // Observer para animações na entrada da seção
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

  // Controle de mudanças nos inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validação simples
  const validateForm = () => {
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Processamento e envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
      setShowModal(true);
    } catch {
      setSubmitStatus("error");
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Métodos diretos de contato
  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      description: "ramos.analista@gmail.com",
      action: "mailto:ramos.analista@gmail.com",
      color: "text-red-600",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63" />
        </svg>
      ),
      title: "WhatsApp",
      description: "(13) 99739-9924",
      action: "https://wa.me/5513997399924",
      color: "text-green-600",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c4.97 0 9-4.03 9-9s-4.03-9-9-9m0 18c-4.97 0-9-4.03-9-9s4.03-9 9-9m0 9H3"
          />
        </svg>
      ),
      title: "Website",
      description: "vempracaapp.com",
      action: "https://vempracaapp.com",
      color: "text-blue-600",
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da seção */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vamos Trabalhar Juntos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pronto para transformar sua ideia em realidade? Entre em contato e vamos conversar sobre
            seu projeto.
          </p>
        </div>

        {/* Botões de Tab para Mobile */}
        <div className="lg:hidden mb-8 px-4">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative flex p-1 bg-gray-100 rounded-full max-w-full">
              {/* Slider animado - fundo que desliza */}
              <div
                className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md transition-all duration-500 ease-in-out transform ${
                  activeTab === "form" ? "translate-x-0" : "translate-x-full"
                }`}
              />

              {/* Botão Formulário */}
              <button
                onClick={() => setActiveTab("form")}
                className={`relative z-10 flex-1 py-3 px-3 rounded-full font-semibold transition-all duration-500 ease-in-out text-sm ${
                  activeTab === "form" ? "text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Formulário
              </button>

              {/* Botão Outras Formas */}
              <button
                onClick={() => setActiveTab("contact")}
                className={`relative z-10 flex-1 py-3 px-3 rounded-full font-semibold transition-all duration-500 ease-in-out text-sm ${
                  activeTab === "contact" ? "text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Outras Formas
              </button>
            </div>
          </div>
        </div>

        {/* Layout responsivo em duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-stretch">
          {/* Formulário de contato */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            } ${activeTab === "form" ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-2xl shadow-2xl h-full flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6">Envie uma Mensagem</h3>

              <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:border-white transition-colors duration-300"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:border-white transition-colors duration-300"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                {/* Empresa (opcional) */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:border-white transition-colors duration-300"
                    placeholder="Nome da sua empresa (opcional)"
                  />
                </div>

                {/* Mensagem */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:border-white transition-colors duration-300 resize-none"
                    placeholder="Conte-me sobre seu projeto, prazos, orçamento..."
                    required
                  />
                </div>

                {/* Feedback de status removido, agora via modal */}

                {/* Botão de envio padronizado */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outline"
                  size="lg"
                  className="w-full py-4 bg-white text-purple-900 border-white hover:bg-white/90 hover:text-purple-800"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Enviando...
                    </div>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Informações e métodos alternativos de contato */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            } ${activeTab === "contact" ? "block" : "hidden lg:block"}`}
          >
            <div className="space-y-8 h-full flex flex-col">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Outras Formas de Contato</h3>
                <p className="text-gray-600 mb-8">
                  Prefere um contato mais direto? Use um dos canais abaixo:
                </p>
              </div>

              {/* Cards com métodos de contato direto */}
              <div className="space-y-4 flex-1">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <div
                      className={`${method.color} mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{method.title}</h4>
                      <p className="text-gray-600">{method.description}</p>
                    </div>
                    <div className="ml-auto text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>

              {/* Informações adicionais */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Vamos Conversar Sobre:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Desenvolvimento de sites e aplicações web
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    UX/UI Design e prototipagem
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Lançamento de produtos digitais
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Consultoria em tecnologia
                  </li>
                </ul>
              </div>

              {/* Tempo de resposta */}
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Tempo de resposta: até 24 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de status de envio */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fundo vidro */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xl transition-all duration-300"
            onClick={() => setShowModal(false)}
          ></div>
          {/* Card modal */}
          <div className="relative z-10 max-w-sm w-full mx-auto rounded-2xl shadow-2xl border border-white/10 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 flex flex-col items-center animate-fade-in">
            {submitStatus === "success" ? (
              <>
                <svg
                  className="w-12 h-12 text-green-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">Mensagem enviada!</h3>
                <p className="text-base text-blue-100 mb-6 text-center">
                  Recebi sua mensagem e retornarei em breve. Obrigado pelo contato!
                </p>
                <button
                  className="mt-2 px-6 py-3 rounded-full bg-white text-purple-900 font-semibold shadow hover:bg-blue-50 transition-all"
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </button>
              </>
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-red-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">Erro ao enviar</h3>
                <p className="text-base text-blue-100 mb-6 text-center">
                  Não foi possível enviar sua mensagem. Verifique os campos e tente novamente.
                </p>
                <button
                  className="mt-2 px-6 py-3 rounded-full bg-white text-purple-900 font-semibold shadow hover:bg-blue-50 transition-all"
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
