import { ReactNode } from 'react';

export function Card({ children, className = '', hover = false }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-surface border border-border rounded-xl p-6 ${hover ? 'hover:border-accent transition-colors' : ''} ${className}`}>
      {children}
    </div>
  );
}
