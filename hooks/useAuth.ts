'use client';
import { useState, useEffect } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser, updateUserProfile } from '@/lib/auth';
import { User } from '@/lib/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const u = loginUser(email, password);
    setUser(u);
    return u;
  };

  const register = (name: string, email: string, password: string) => {
    const u = registerUser(name, email, password);
    setUser(u);
    return u;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const update = (updates: Partial<User>) => {
    const u = updateUserProfile(updates);
    setUser(u);
    return u;
  };

  return { user, loading, login, register, logout, update, isAuthenticated: !!user, isAdmin: user?.isAdmin || false };
}
