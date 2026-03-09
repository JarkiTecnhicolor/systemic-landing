export default function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent ${className}`}>
      {children}
    </span>
  );
}
