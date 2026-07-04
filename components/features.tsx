import { Icon } from '@/lib/icons';
import type { Dict } from '@/lib/i18n/types';

export function Features({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const docsBase = lang === 'ko' ? '/ko/docs/' : '/docs/';
  return (
    <section className="mi-section alt" id="features">
      <div className="mi-container">
        <div className="mi-section-head">
          <div className="mi-eyebrow">{t.features.eyebrow}</div>
          <h2 className="mi-h2">{t.features.title}</h2>
          <p className="mi-lead">{t.features.lead}</p>
        </div>
        <div className="mi-grid">
          {t.features.items.map((item) => (
            <a key={item.slug} className="mi-card" href={`${docsBase}#${item.slug}`}>
              <span className="mi-card-icon">
                <Icon name={item.icon} size={18} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="mi-card-more">
                {t.features.more}
                <Icon name="arrow" size={13} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
