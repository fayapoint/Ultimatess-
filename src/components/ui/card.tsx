// src/components/ui/card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className="border rounded-md shadow-md p-4">{children}</div>;
}

export function CardHeader({ children }: CardProps) {
  return <div className="font-bold text-lg mb-2">{children}</div>;
}

export function CardContent({ children }: CardProps) {
  return <div className="text-sm">{children}</div>;
}

export function CardTitle({ children }: CardProps) {
  return <div className="text-xl font-semibold">{children}</div>;
}
