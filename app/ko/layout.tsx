import type { Metadata } from 'next';
import { ko } from '@/lib/i18n/ko';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} — IoT 디버깅용 MQTT 데스크톱 클라이언트`,
  description: ko.hero.lead,
  openGraph: {
    locale: 'ko_KR',
    title: `${siteConfig.name} — IoT 디버깅용 MQTT 데스크톱 클라이언트`,
    description: ko.hero.lead,
  },
  alternates: {
    canonical: '/ko/',
    languages: {
      en: '/',
      ko: '/ko/',
      'x-default': '/',
    },
  },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
