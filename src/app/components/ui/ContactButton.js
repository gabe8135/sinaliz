"use client";
import Button from "./Button";

export default function ContactButton({
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  showIcon = true,
  children = "Entre em Contato",
  ...props
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
      {showIcon && (
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      )}
    </Button>
  );
}
