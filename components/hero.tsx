import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import { AppMock } from './app-mock';
import type { Dict } from '@/lib/i18n/types';

export function Hero({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  return (
    <section className="mi-hero">
      <div className="mi-container">
        <div className="mi-hero-badge">{t.hero.badge}</div>
        <h1>
          {t.hero.title1}
          <br />
          <span className="mi-grad-text">{t.hero.title2}</span>
        </h1>
        <p className="mi-hero-lead">{t.hero.lead}</p>
        <div className="mi-hero-actions">
          <a className="mi-btn primary" href={siteConfig.releases} target="_blank" rel="noreferrer">
            <Icon name="download" size={16} />
            {t.hero.download}
          </a>
          <a className="mi-btn ghost" href={siteConfig.github} target="_blank" rel="noreferrer">
            <Icon name="github" size={16} />
            {t.hero.github}
          </a>
        </div>
        <div className="mi-pills">
          {t.hero.pills.map((p) => (
            <span key={p} className="mi-pill">
              {p}
            </span>
          ))}
        </div>
        <AppMock lang={lang} title={t.hero.mockTitle} />
      </div>
    </section>
  );
}
