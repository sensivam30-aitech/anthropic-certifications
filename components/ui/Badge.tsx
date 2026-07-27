export function Badge({ children, variant = 'domain' }: { children: React.ReactNode; variant?: 'domain' | 'difficulty' | 'status' }) {
  const styles = {
    domain: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    difficulty: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    status: 'bg-green-500/10 text-green-400 border-green-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
}
