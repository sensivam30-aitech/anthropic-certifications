const PREFIX = 'cca_';

export function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PREFIX + key);
}

export function clearAll(): void {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(localStorage);
  for (const key of keys) {
    if (key.startsWith(PREFIX)) {
      localStorage.removeItem(key);
    }
  }
}
