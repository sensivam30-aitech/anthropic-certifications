'use client';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Menu, X, Sun, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuthContext();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/practice/', label: 'Practice' },
    { href: '/question-bank/', label: 'Question Bank' },
    { href: '/progress/', label: 'Progress' },
    { href: '/lessons/', label: 'Lessons' },
    { href: '/blog/', label: 'Blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-accent">anthropiccertifications.in</Link>
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors">
                {l.label}
              </Link>
            ))}
            <button onClick={toggle} className="text-text-secondary hover:text-text-primary">
              {theme === 'dark' ? <Sun size={18} /> : <Sparkles size={18} />}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-secondary">{user.name}</span>
                <Button size="sm" variant="ghost" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Link href="/login/"><Button size="sm">Login</Button></Link>
            )}
          </div>
          <button className="md:hidden text-text-primary" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-surface border-b border-border px-4 py-4 space-y-3">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="block text-text-secondary hover:text-text-primary" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <Button variant="ghost" onClick={() => { logout(); setOpen(false); }} className="w-full">Logout</Button>
          ) : (
            <Link href="/login/" onClick={() => setOpen(false)}><Button className="w-full">Login</Button></Link>
          )}
        </div>
      )}
    </nav>
  );
}
