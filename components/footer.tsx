import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function Footer({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const docs = lang === 'ko' ? '/ko/docs/' : '/docs/';
  return (
    <footer className="mi-footer">
      <div className="mi-container mi-footer-inner">
        <span>© {new Date().getFullYear()} advenoh · mqtt-insight</span>
        <nav className="mi-footer-links">
          <Link href={docs}>{t.footer.docs}</Link>
          <a href={siteConfig.github} target="_blank" rel="noreferrer">
            {t.footer.github}
          </a>
          <a href={siteConfig.issues} target="_blank" rel="noreferrer">
            {t.footer.issues}
          </a>
          <a href={siteConfig.license} target="_blank" rel="noreferrer">
            {t.footer.license}
          </a>
        </nav>
      </div>
    </footer>
  );
}
