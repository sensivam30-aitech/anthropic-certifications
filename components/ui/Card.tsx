import { ReactNode } from 'react';

export function Card({ children, className = '', hover = false, onClick }: { children: ReactNode; className?: string; hover?: boolean; onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-surface border border-border rounded-xl p-6 ${hover ? 'hover:border-accent transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
