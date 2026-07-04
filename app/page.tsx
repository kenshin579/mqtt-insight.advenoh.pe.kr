import type { Metadata } from 'next';
import { en } from '@/lib/i18n/en';
import { Landing } from '@/components/landing';
import { AutoLangRedirect } from '@/components/auto-lang-redirect';
import { siteConfig } from '@/lib/site-config';

const title = `${siteConfig.name} — MQTT desktop client for IoT debugging`;

export const metadata: Metadata = {
  title,
  description: en.hero.lead,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title,
    description: en.hero.lead,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: en.hero.lead,
    images: [siteConfig.ogImage],
  },
};

export default function Page() {
  return (
    <>
      <AutoLangRedirect />
      <Landing t={en} lang="en" />
    </>
  );
}
