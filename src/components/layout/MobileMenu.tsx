'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '../ui/Button';
import LocaleSwitcher from './LocaleSwitcher';
import { APP_URL, REGISTER_URL } from '../../lib/constants';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
};

export default function MobileMenu({ isOpen, onClose, navLinks }: Props) {
  const t = useTranslations('nav');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-72 bg-white shadow-xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Systemic" className="h-7 w-7 rounded-lg" />
            <img src="/images/logo-text.png" alt="Systemic" className="h-4 brightness-0" />
          </div>
          <button onClick={onClose} className="p-2 text-text-secondary cursor-pointer">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4 mb-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={onClose} className="text-lg text-text-primary hover:text-accent transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <LocaleSwitcher scrolled />
          <a href={APP_URL} className="text-center text-text-secondary hover:text-primary">{t('login')}</a>
          <Button href={REGISTER_URL} className="w-full">{t('tryFree')}</Button>
        </div>
      </div>
    </div>
  );
}
