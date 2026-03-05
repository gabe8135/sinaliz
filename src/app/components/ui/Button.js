"use client";

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  // Variações de estilo
  const variants = {
    primary:
      "bg-gradient-to-r from-[#12324A] to-[#1F6B7A] text-white hover:from-[#0F2A3E] hover:to-[#175764]",
    secondary: "border-2 border-[#1F6B7A] text-[#1F6B7A] hover:bg-[#1F6B7A] hover:text-white",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-[#1F6B7A] hover:text-[#1F6B7A]",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-[#1F6B7A]",
    white:
      "bg-white border-2 text-[#12324A] hover:bg-[#E7EDF1] hover:border-[#1F6B7A] hover:text-[#1F6B7A]",
  };

  // Tamanhos
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
    xl: "px-10 py-4 text-lg",
  };

  const baseClasses = `
    relative rounded-full font-semibold transition-all duration-300 
    hover:scale-105 shadow-lg hover:shadow-xl group overflow-hidden
    active:scale-[0.99]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6B7A] focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${variants[variant]} 
    ${sizes[size]} 
    ${className}
  `;

  return (
    <button onClick={onClick} disabled={disabled} className={baseClasses} {...props}>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* Efeito de brilho animado apenas para botões primary */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      )}
    </button>
  );
}
