import Link from 'next/link';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25',
  secondary: 'bg-primary-light text-primary hover:bg-primary-light/80',
  outline: 'border-2 border-white/30 text-white hover:bg-white/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({ variant = 'primary', size = 'md', href, children, className = '', onClick }: ButtonProps) {
  const cls = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button onClick={onClick} className={cls}>{children}</button>;
}
