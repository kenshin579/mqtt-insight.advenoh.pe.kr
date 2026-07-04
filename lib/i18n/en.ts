export const en = {
  nav: { features: 'Features', docs: 'Docs', install: 'Install', faq: 'FAQ' },
  hero: {
    badge: 'Open source · macOS & Windows',
    title1: 'Your MQTT traffic,',
    title2: 'beautifully visible',
    lead: 'mqtt-insight is an open-source MQTT desktop client for IoT and embedded debugging — live topic tree, real-time charts, MQTT 5.0 and recording, on macOS and Windows.',
    download: 'Download',
    github: 'GitHub',
    pills: ['Topic tree', 'Real-time charts', 'MQTT 5.0', 'Recording', 'TLS / WebSocket', 'Dark theme'],
    mockTitle: 'mqtt-insight — broker.local:1883',
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything you need to debug MQTT',
    lead: 'Connect to a broker and see what your devices are really saying.',
    more: 'Learn more',
    items: [
      {
        icon: 'tree',
        title: 'Auto-aggregating topic tree',
        desc: 'Subscribe with # or + wildcards and watch the tree build itself, with live values on every node.',
        slug: 'topic-tree',
      },
      {
        icon: 'chart',
        title: 'Real-time charts',
        desc: 'Numeric payloads become per-key small multiples with now / min / max / avg stats.',
        slug: 'charts',
      },
      {
        icon: 'diff',
        title: 'Formats & diff highlighting',
        desc: 'View any payload as Plain, JSON, Hex or Base64 — changed values are highlighted as they arrive.',
        slug: 'messages',
      },
      {
        icon: 'send',
        title: 'Publish panel',
        desc: 'QoS, retained flag, and full MQTT 5.0 properties including user properties and content type.',
        slug: 'publish',
      },
      {
        icon: 'record',
        title: 'Per-topic recording',
        desc: 'Record selected topics to a local SQLite file and inspect the history later.',
        slug: 'recording',
      },
      {
        icon: 'shield',
        title: 'Connection profiles',
        desc: 'TCP, TLS and WebSocket over MQTT 3.1.1 and 5.0, saved as one-click connection profiles.',
        slug: 'connection-profiles',
      },
    ],
  },
  install: {
    eyebrow: 'Install',
    title: 'Up and running in a minute',
    macTitle: 'macOS',
    macBody: 'Universal build for Apple Silicon & Intel. Unzip and move mqtt-insight.app to Applications.',
    macNote: 'The app is not code-signed yet — on first launch use right-click → Open, or run:',
    macCmd: 'xattr -cr /Applications/mqtt-insight.app',
    winTitle: 'Windows',
    winBody: 'Run the installer, or use the portable zip if you prefer no installation.',
    winNote: 'If SmartScreen warns, choose "More info" → "Run anyway".',
    button: 'Download from GitHub Releases',
  },
  faq: { eyebrow: 'FAQ', title: 'Frequently asked questions' },
  cta: {
    title: 'See what your devices are really saying',
    lead: 'Download mqtt-insight and connect to your broker in a minute.',
    button: 'Download',
  },
  footer: { docs: 'Docs', github: 'GitHub', issues: 'Issues', license: 'MIT License' },
  docs: { title: 'Documentation', toc: 'Contents' },
};

export type Dict = typeof en;
