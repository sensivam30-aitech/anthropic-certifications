import { getItem, setItem, removeItem } from './storage';
import { hashPassword, verifyPassword, generateUUID } from './utils';
import { User } from './types';
import usersData from './data/users.json';

const AUTH_KEY = 'auth_user';

function seedDemoUsers(): void {
  const existing = getItem<User[]>('users');
  if (!existing) {
    const seeded = usersData.map(u => ({ ...u, password: hashPassword('demo123') }));
    setItem('users', seeded);
  }
}

export function registerUser(name: string, email: string, password: string): User {
  seedDemoUsers();
  const users = getItem<User[]>('users') || [];
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }
  const newUser: User = {
    id: generateUUID(),
    name,
    email,
    password: hashPassword(password),
    tier: 'free',
    isAdmin: false,
    createdAt: Date.now(),
  };
  users.push(newUser);
  setItem('users', users);
  const { password: _, ...safeUser } = newUser;
  setItem(AUTH_KEY, safeUser);
  return safeUser as User;
}

export function loginUser(email: string, password: string): User | null {
  seedDemoUsers();
  const users = getItem<User[]>('users') || [];
  const user = users.find(u => u.email === email);
  if (!user || !verifyPassword(password, user.password)) {
    return null;
  }
  const { password: _, ...safeUser } = user;
  setItem(AUTH_KEY, safeUser);
  return safeUser as User;
}

export function logoutUser(): void {
  removeItem(AUTH_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  seedDemoUsers();
  return getItem<User>(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.isAdmin === true;
}

export function updateUserProfile(updates: Partial<User>): User {
  const current = getCurrentUser();
  if (!current) throw new Error('Not authenticated');
  const users = getItem<User[]>('users') || [];
  const idx = users.findIndex(u => u.id === current.id);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...updates };
  setItem('users', users);
  const { password: _, ...safeUser } = users[idx];
  setItem(AUTH_KEY, safeUser);
  return safeUser as User;
}
