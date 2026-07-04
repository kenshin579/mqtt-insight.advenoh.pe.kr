export const siteConfig = {
  name: 'mqtt-insight',
  description: 'Open-source MQTT desktop client for IoT and embedded debugging.',
  url: 'https://mqtt-insight.advenoh.pe.kr',
  github: 'https://github.com/kenshin579/mqtt-insight',
  releases: 'https://github.com/kenshin579/mqtt-insight/releases',
  issues: 'https://github.com/kenshin579/mqtt-insight/issues',
  license: 'https://github.com/kenshin579/mqtt-insight/blob/main/LICENSE',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  ogImage: '/og.png',
} as const;
