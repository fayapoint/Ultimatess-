// src/components/ui/button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({ children, onClick, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
}
