import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function Install({ t }: { t: Dict }) {
  return (
    <section className="mi-section" id="install">
      <div className="mi-container narrow">
        <div className="mi-section-head">
          <div className="mi-eyebrow">{t.install.eyebrow}</div>
          <h2 className="mi-h2">{t.install.title}</h2>
        </div>
        <div className="mi-install-grid">
          <div className="mi-install-card">
            <h3>{t.install.macTitle}</h3>
            <p>{t.install.macBody}</p>
            <p>{t.install.macNote}</p>
            <code className="mi-code">{t.install.macCmd}</code>
          </div>
          <div className="mi-install-card">
            <h3>{t.install.winTitle}</h3>
            <p>{t.install.winBody}</p>
            <p>{t.install.winNote}</p>
          </div>
        </div>
        <div className="mi-install-cta">
          <a className="mi-btn primary" href={siteConfig.releases} target="_blank" rel="noreferrer">
            <Icon name="download" size={16} />
            {t.install.button}
          </a>
        </div>
      </div>
    </section>
  );
}
