import { useTranslations } from 'next-intl';
import { CONTACT_EMAIL } from '../../lib/constants';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-primary-dark text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <img src="/images/logo.png" alt="Systemic" className="h-8 w-8 rounded-lg" />
              <img src="/images/logo-text.png" alt="Systemic" className="h-5 brightness-0 invert" />
            </div>
            <p className="text-sm mb-4">{t('tagline')}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm hover:text-white transition-colors">
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Product links">
            <h4 className="text-sm font-semibold text-white mb-4">{t('product')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">{t('productLinks.features')}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('productLinks.pricing')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('productLinks.updates')}</a></li>
            </ul>
          </nav>

          <nav aria-label="Company links">
            <h4 className="text-sm font-semibold text-white mb-4">{t('company')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('companyLinks.about')}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">{t('companyLinks.contact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('companyLinks.blog')}</a></li>
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h4 className="text-sm font-semibold text-white mb-4">{t('legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('legalLinks.terms')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('legalLinks.privacy')}</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
