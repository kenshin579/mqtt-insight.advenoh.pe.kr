import { Nav } from './nav';
import { Hero } from './hero';
import { Features } from './features';
import { Install } from './install';
import { FAQ } from './faq';
import { FinalCTA } from './final-cta';
import { Footer } from './footer';
import type { Dict } from '@/lib/i18n/types';

export function Landing({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  return (
    <>
      <Nav t={t} lang={lang} />
      <main>
        <Hero t={t} lang={lang} />
        <Features t={t} lang={lang} />
        <Install t={t} />
        <FAQ t={t} lang={lang} />
        <FinalCTA t={t} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
