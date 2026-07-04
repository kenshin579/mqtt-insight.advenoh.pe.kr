import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteConfig.url}/`,
          ko: `${siteConfig.url}/ko/`,
        },
      },
    },
    { url: `${siteConfig.url}/ko/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    {
      url: `${siteConfig.url}/docs/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteConfig.url}/docs/`,
          ko: `${siteConfig.url}/ko/docs/`,
        },
      },
    },
    { url: `${siteConfig.url}/ko/docs/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
