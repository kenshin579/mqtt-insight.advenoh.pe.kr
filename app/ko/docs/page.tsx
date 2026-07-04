import type { Metadata } from 'next';
import { loadDocs } from '@/lib/docs';
import { ko } from '@/lib/i18n/ko';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { DocsLayout } from '@/components/docs/docs-layout';
import { SetHtmlLang } from '@/components/set-html-lang';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: `문서 | ${siteConfig.name}` },
  description: `${siteConfig.name} 사용법: 연결 프로필, 토픽 트리, 차트, 발행, 기록, 설정.`,
  alternates: {
    canonical: '/ko/docs/',
    languages: {
      en: '/docs/',
      ko: '/ko/docs/',
      'x-default': '/docs/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: `${siteConfig.url}/ko/docs/`,
    siteName: siteConfig.name,
    title: `문서 | ${siteConfig.name}`,
    description: `${siteConfig.name} 사용법: 연결 프로필, 토픽 트리, 차트, 발행, 기록, 설정.`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
};

export default async function Page() {
  const sections = await loadDocs('ko');
  return (
    <>
      <SetHtmlLang lang="ko" />
      <Nav t={ko} lang="ko" />
      <DocsLayout sections={sections} title={ko.docs.title} tocTitle={ko.docs.toc} />
      <Footer t={ko} lang="ko" />
    </>
  );
}
