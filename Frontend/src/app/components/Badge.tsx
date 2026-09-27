import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/20 text-primary border border-primary/30',
    secondary: 'bg-secondary/20 text-secondary border border-secondary/30',
    success: 'bg-[#8fa68a]/20 text-[#6b8a66] border border-[#8fa68a]/30',
    warning: 'bg-[#d4a574]/20 text-[#b8894f] border border-[#d4a574]/30',
    danger: 'bg-[#c85a54]/20 text-[#a84942] border border-[#c85a54]/30',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
