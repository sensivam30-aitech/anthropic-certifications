'use client';
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    }
  }, [key]);
  const setStored = (v: T) => {
    setValue(v);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(v));
    }
  };
  return [value, setStored];
}
