import type { Metadata } from 'next';
import { loadDocs } from '@/lib/docs';
import { en } from '@/lib/i18n/en';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { DocsLayout } from '@/components/docs/docs-layout';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Docs',
  description: `How to use ${siteConfig.name}: connection profiles, topic tree, charts, publish, recording and settings.`,
  alternates: {
    canonical: '/docs/',
    languages: {
      en: '/docs/',
      ko: '/ko/docs/',
      'x-default': '/docs/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${siteConfig.url}/docs/`,
    siteName: siteConfig.name,
    title: `Docs | ${siteConfig.name}`,
    description: `How to use ${siteConfig.name}: connection profiles, topic tree, charts, publish, recording and settings.`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
};

export default async function Page() {
  const sections = await loadDocs('en');
  return (
    <>
      <Nav t={en} lang="en" />
      <DocsLayout sections={sections} title={en.docs.title} tocTitle={en.docs.toc} />
      <Footer t={en} lang="en" />
    </>
  );
}
