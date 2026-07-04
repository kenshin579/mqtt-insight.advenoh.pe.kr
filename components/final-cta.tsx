import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function FinalCTA({ t }: { t: Dict }) {
  return (
    <section className="mi-cta">
      <div className="mi-container narrow">
        <h2 className="mi-h2">{t.cta.title}</h2>
        <p className="mi-lead">{t.cta.lead}</p>
        <a className="mi-btn primary" href={siteConfig.releases} target="_blank" rel="noreferrer">
          <Icon name="download" size={16} />
          {t.cta.button}
        </a>
      </div>
    </section>
  );
}
