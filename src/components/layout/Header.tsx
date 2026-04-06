'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Button from '../ui/Button';
import LocaleSwitcher from './LocaleSwitcher';
import MobileMenu from './MobileMenu';
import { APP_URL, REGISTER_URL } from '../../lib/constants';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('features'), href: '#features' },
    { label: t('pricing'), href: '#pricing' },
    { label: t('faq'), href: '#faq' },
    { label: t('help'), href: `/${locale}/help` },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Systemic" className="h-8 w-8 rounded-lg" />
              <img
                src="/images/logo-text.png"
                alt="Systemic"
                className={`h-5 transition-all ${scrolled ? 'brightness-0' : 'brightness-0 invert'}`}
              />
            </a>

            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${scrolled ? 'text-text-secondary' : 'text-white/80 hover:text-white'}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <LocaleSwitcher scrolled={scrolled} />
              <a
                href={APP_URL}
                className={`text-sm font-medium transition-colors ${scrolled ? 'text-text-secondary hover:text-primary' : 'text-white/80 hover:text-white'}`}
              >
                {t('login')}
              </a>
              <Button href={REGISTER_URL} size="sm">
                {t('tryFree')}
              </Button>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-2 ${scrolled ? 'text-text-primary' : 'text-white'}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} navLinks={navLinks} />
    </>
  );
}
