# mqtt-insight Landing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** mqtt-insight 데스크톱 앱의 랜딩 페이지(`/`, `/ko/`)와 markdown 기반 기능 매뉴얼(`/docs/`, `/ko/docs/`)을 Next.js static export로 구축해 Netlify에 배포 가능한 상태로 만든다.

**Architecture:** markora.advenoh.pe.kr의 구조(App Router + `output: 'export'` + i18n Dict 타입 강제 + next-themes)를 재사용하고, 시각 레이어는 신규 스킨 CSS(네이비 그라데이션 Hero, 블루-바이올렛 accent). 매뉴얼 본문은 `content/docs/{en,ko}/*.md`를 빌드 타임에 remark/rehype로 HTML 변환하며, en/ko 파일 세트 불일치는 빌드 에러로 잡는다.

**Tech Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · next-themes · gray-matter + unified/remark/rehype · Tailwind(유틸리티 최소) · vitest(md 파이프라인만) · Netlify

**Spec:** `docs/superpowers/specs/2026-07-04-landing-site-design.md`
**Branch:** `feature/landing-site` (이미 생성되어 스펙이 커밋되어 있음)
**Working dir:** 모든 명령은 `/Users/user/src/workspace_mqtt_insight/mqtt-insight.advenoh.pe.kr`에서 실행

**참고 리소스:**
- markora 참고 구현: `../markora.advenoh.pe.kr/` (구조·패턴의 원본)
- 앱 본체: `../mqtt-insight/` (스크린샷 원본, README의 기능 설명)

---

### Task 1: 프로젝트 스캐폴딩

**Files:**
- Create: `package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `netlify.toml`, `.env.example`
- Modify: `.gitignore`
- Copy: `public/fonts/PretendardVariable.woff2` (markora에서)

- [ ] **Step 1: package.json 작성**

```json
{
  "name": "mqtt-insight-landing",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "npx serve@latest out -l 3000",
    "check": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "next": "^16.0.7",
    "next-themes": "^0.4.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "rehype-stringify": "^10.0.1",
    "remark-gfm": "^4.0.0",
    "remark-parse": "^11.0.0",
    "remark-rehype": "^11.1.1",
    "unified": "^11.0.5"
  },
  "devDependencies": {
    "@types/node": "^20.16.11",
    "@types/react": "^18.3.26",
    "@types/react-dom": "^18.3.7",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.3",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: next.config.js 작성**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 3: tsconfig.json 작성**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules", "out", ".next"]
}
```

- [ ] **Step 4: tailwind.config.ts / postcss.config.js 작성**

`tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
```

`postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: netlify.toml / .env.example 작성**

`netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "22"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

`.env.example`:

```
NEXT_PUBLIC_GA_ID=
```

- [ ] **Step 6: .gitignore에 Next.js 항목 추가**

기존 `.gitignore` 끝에 아래 블록을 추가한다 (이미 있는 항목은 중복 추가하지 않음):

```
# Next.js
node_modules/
.next/
out/
.env*.local
```

- [ ] **Step 7: 폰트 복사**

```bash
mkdir -p public/fonts
cp ../markora.advenoh.pe.kr/public/fonts/PretendardVariable.woff2 public/fonts/
```

- [ ] **Step 8: 의존성 설치 및 확인**

```bash
npm install
```

Expected: 에러 없이 완료, `package-lock.json` 생성

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json next.config.js tsconfig.json tailwind.config.ts postcss.config.js netlify.toml .env.example .gitignore public/fonts/
git commit -m "chore: scaffold Next.js static export project"
```

---

### Task 2: site-config + 디자인 토큰 + 스킨 CSS + 아이콘

**Files:**
- Create: `lib/site-config.ts`, `lib/icons.tsx`, `styles/tokens.css`, `styles/site.css`, `app/globals.css`

- [ ] **Step 1: lib/site-config.ts 작성**

```ts
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
```

- [ ] **Step 2: lib/icons.tsx 작성**

```tsx
type IconName =
  | 'logo'
  | 'github'
  | 'sun'
  | 'moon'
  | 'chev'
  | 'download'
  | 'arrow'
  | 'tree'
  | 'chart'
  | 'diff'
  | 'send'
  | 'record'
  | 'shield';

const paths: Record<IconName, React.ReactNode> = {
  logo: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#mi-logo-grad)" stroke="none" />
      <path d="M6 15.5 9.5 10l3 4 2.5-5 3 6.5" stroke="#fff" strokeWidth="1.8" fill="none" />
    </>
  ),
  github: (
    <path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2Z" fill="currentColor" stroke="none" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  chev: <path d="m6 9 6 6 6-6" />,
  download: <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" />,
  arrow: <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  tree: <path d="M6 3v18M6 8h7a3 3 0 0 1 3 3v0M6 15h9a3 3 0 0 1 3 3v0" />,
  chart: <path d="M3 21h18M5 17l4-6 3 3 4-8 3 5" />,
  diff: <path d="M9 7h11M9 12h11M9 17h11M4 7h.01M4 12h.01M4 17h.01" />,
  send: <path d="m3 11 18-8-8 18-2.5-7.5L3 11Z" />,
  record: <circle cx="12" cy="12" r="6" fill="currentColor" stroke="none" />,
  shield: <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />,
};

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'logo' && (
        <defs>
          <linearGradient id="mi-logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f8cff" />
            <stop offset="1" stopColor="#9f6bff" />
          </linearGradient>
        </defs>
      )}
      {paths[name]}
    </svg>
  );
}
```

- [ ] **Step 3: styles/tokens.css 작성**

```css
:root {
  /* light theme */
  --mi-bg: #ffffff;
  --mi-bg-alt: #f6f8fc;
  --mi-text: #1a2233;
  --mi-text-dim: #66708a;
  --mi-border: #e5e9f0;
  --mi-card: #ffffff;
  --mi-code-bg: #f1f4f9;

  /* brand (테마 무관) */
  --mi-accent: #4f8cff;
  --mi-accent-2: #9f6bff;
  --mi-grad: linear-gradient(90deg, #4f8cff, #9f6bff);
  --mi-hero-bg: linear-gradient(180deg, #0e1524 0%, #182338 100%);
  --mi-hero-bg-rev: linear-gradient(180deg, #182338 0%, #0e1524 100%);
  --mi-dark-surface: #0e1524;
  --mi-hero-text: #ffffff;
  --mi-hero-dim: #8a96ad;
  --mi-hero-border: rgba(255, 255, 255, 0.14);
  --mi-hero-glass: rgba(255, 255, 255, 0.07);

  --mi-radius: 10px;
  --mi-radius-lg: 14px;
  --mi-font-mono: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace;
  --mi-shadow: 0 8px 30px rgba(20, 40, 90, 0.08);
}

[data-theme='dark'] {
  --mi-bg: #0c1017;
  --mi-bg-alt: #11161f;
  --mi-text: #dde3ee;
  --mi-text-dim: #8b94a7;
  --mi-border: #1d2430;
  --mi-card: #11161f;
  --mi-code-bg: #171e2a;
  --mi-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}
```

- [ ] **Step 4: styles/site.css 작성**

```css
/* ===== base ===== */
body {
  background: var(--mi-bg);
  color: var(--mi-text);
  font-family: var(--font-pretendard), -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.mi-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}
.mi-container.narrow {
  max-width: 760px;
}

.mi-section {
  padding: 80px 0;
}
.mi-section.alt {
  background: var(--mi-bg-alt);
}
.mi-section-head {
  text-align: center;
  margin-bottom: 48px;
}
.mi-eyebrow {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--mi-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 10px;
}
.mi-h2 {
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.mi-lead {
  margin-top: 12px;
  color: var(--mi-text-dim);
  font-size: 17px;
}

/* ===== buttons ===== */
.mi-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--mi-radius);
  font-size: 15px;
  font-weight: 700;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.mi-btn:hover {
  transform: translateY(-1px);
}
.mi-btn.primary {
  background: var(--mi-grad);
  color: #fff;
  box-shadow: 0 6px 20px rgba(79, 140, 255, 0.35);
}
.mi-btn.ghost {
  border: 1px solid var(--mi-hero-border);
  color: var(--mi-hero-text);
}
.mi-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: inherit;
}
.mi-icon-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ===== nav (다크 고정 — hero와 연결) ===== */
.mi-nav {
  background: var(--mi-dark-surface);
  color: #e6ebf5;
}
.mi-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}
.mi-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 16px;
  color: #fff;
}
.mi-nav-links {
  display: flex;
  gap: 28px;
  font-size: 14px;
  color: #aab3c5;
}
.mi-nav-links a:hover {
  color: #fff;
}
.mi-nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.mi-pill-toggle {
  display: inline-flex;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 700;
}
.mi-pill-toggle button {
  padding: 5px 12px;
  color: #aab3c5;
}
.mi-pill-toggle button.active {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
@media (max-width: 720px) {
  .mi-nav-links {
    display: none;
  }
}

/* ===== hero ===== */
.mi-hero {
  background: var(--mi-hero-bg);
  color: var(--mi-hero-text);
  text-align: center;
  padding: 88px 0 0;
  overflow: hidden;
}
.mi-hero-badge {
  display: inline-block;
  font-size: 13px;
  color: var(--mi-hero-dim);
  border: 1px solid var(--mi-hero-border);
  border-radius: 999px;
  padding: 5px 14px;
  margin-bottom: 22px;
}
.mi-hero h1 {
  font-size: clamp(38px, 6vw, 62px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.025em;
}
.mi-grad-text {
  background: var(--mi-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.mi-hero-lead {
  max-width: 640px;
  margin: 20px auto 0;
  color: var(--mi-hero-dim);
  font-size: 18px;
  line-height: 1.6;
}
.mi-hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}
.mi-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 26px;
}
.mi-pill {
  font-size: 12.5px;
  font-weight: 600;
  color: #cdd6e6;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid var(--mi-hero-border);
  border-radius: 999px;
  padding: 5px 13px;
}

/* ===== hero app mock ===== */
.mi-mock {
  max-width: 880px;
  margin: 52px auto 0;
  background: var(--mi-hero-glass);
  border: 1px solid var(--mi-hero-border);
  border-bottom: none;
  border-radius: var(--mi-radius-lg) var(--mi-radius-lg) 0 0;
  padding: 14px 14px 0;
  backdrop-filter: blur(6px);
  text-align: left;
}
.mi-mock-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 4px 10px;
}
.mi-mock-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
}
.mi-mock-title {
  margin-left: 8px;
  font-size: 11.5px;
  color: var(--mi-hero-dim);
}
.mi-mock-panes {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 10px;
  height: 240px;
}
.mi-mock-pane {
  background: rgba(10, 16, 28, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px 8px 0 0;
  border-bottom: none;
  padding: 10px 12px;
  overflow: hidden;
  font-family: var(--mi-font-mono);
  font-size: 11.5px;
  line-height: 1.9;
  color: #9aa5ba;
}
.mi-mock-pane-label {
  font-family: var(--font-pretendard), sans-serif;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5f6b82;
  margin-bottom: 6px;
}
.mi-mock-value {
  color: #7fb0ff;
  font-weight: 700;
}
.mi-mock-topic {
  color: #c0c9da;
}
.mi-mock-stats {
  display: flex;
  gap: 12px;
  font-size: 10.5px;
  color: #5f6b82;
  margin-top: 6px;
}
@media (max-width: 720px) {
  .mi-mock-panes {
    grid-template-columns: 1fr;
    height: auto;
  }
  .mi-mock-pane:nth-child(3) {
    display: none;
  }
}

/* ===== features grid ===== */
.mi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 900px) {
  .mi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .mi-grid {
    grid-template-columns: 1fr;
  }
}
.mi-card {
  display: block;
  background: var(--mi-card);
  border: 1px solid var(--mi-border);
  border-radius: var(--mi-radius-lg);
  padding: 24px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.mi-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--mi-shadow);
}
.mi-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(79, 140, 255, 0.12);
  color: var(--mi-accent);
  margin-bottom: 14px;
}
.mi-card h3 {
  font-size: 16.5px;
  font-weight: 700;
  margin-bottom: 6px;
}
.mi-card p {
  font-size: 14px;
  color: var(--mi-text-dim);
  line-height: 1.6;
}
.mi-card-more {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 700;
  color: var(--mi-accent);
}

/* ===== install ===== */
.mi-install-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}
@media (max-width: 720px) {
  .mi-install-grid {
    grid-template-columns: 1fr;
  }
}
.mi-install-card {
  background: var(--mi-card);
  border: 1px solid var(--mi-border);
  border-radius: var(--mi-radius-lg);
  padding: 26px;
}
.mi-install-card h3 {
  font-size: 17px;
  font-weight: 800;
  margin-bottom: 10px;
}
.mi-install-card p {
  font-size: 14px;
  color: var(--mi-text-dim);
  line-height: 1.65;
  margin-bottom: 8px;
}
.mi-code {
  display: block;
  background: var(--mi-code-bg);
  border: 1px solid var(--mi-border);
  border-radius: 8px;
  padding: 10px 14px;
  font-family: var(--mi-font-mono);
  font-size: 12.5px;
  overflow-x: auto;
  margin-top: 10px;
}
.mi-install-cta {
  text-align: center;
}

/* ===== faq ===== */
.mi-faq {
  border: 1px solid var(--mi-border);
  border-radius: var(--mi-radius-lg);
  overflow: hidden;
}
.mi-faq-item + .mi-faq-item {
  border-top: 1px solid var(--mi-border);
}
.mi-faq-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 18px 22px;
  font-size: 15px;
  font-weight: 700;
  gap: 12px;
}
.mi-faq-chev {
  color: var(--mi-text-dim);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
.mi-faq-item.open .mi-faq-chev {
  transform: rotate(180deg);
}
.mi-faq-a {
  display: none;
  padding: 0 22px 20px;
  font-size: 14.5px;
  color: var(--mi-text-dim);
  line-height: 1.7;
}
.mi-faq-item.open .mi-faq-a {
  display: block;
}
.mi-faq-a a {
  color: var(--mi-accent);
  font-weight: 600;
}
.mi-faq-a code {
  background: var(--mi-code-bg);
  border-radius: 4px;
  padding: 1px 6px;
  font-family: var(--mi-font-mono);
  font-size: 13px;
}

/* ===== final cta + footer ===== */
.mi-cta {
  background: var(--mi-hero-bg-rev);
  color: var(--mi-hero-text);
  text-align: center;
  padding: 88px 0;
}
.mi-cta .mi-h2 {
  color: #fff;
}
.mi-cta .mi-lead {
  color: var(--mi-hero-dim);
}
.mi-cta .mi-btn {
  margin-top: 26px;
}
.mi-footer {
  background: var(--mi-dark-surface);
  color: var(--mi-hero-dim);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 28px 0;
  font-size: 13.5px;
}
.mi-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.mi-footer a:hover {
  color: #fff;
}
.mi-footer-links {
  display: flex;
  gap: 20px;
}

/* ===== docs ===== */
.mi-docs {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 48px;
  padding: 56px 0 88px;
}
.mi-docs-toc {
  position: sticky;
  top: 24px;
  align-self: start;
  font-size: 14px;
}
.mi-docs-toc-title {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mi-text-dim);
  margin-bottom: 12px;
}
.mi-docs-toc a {
  display: block;
  padding: 6px 10px;
  border-left: 2px solid var(--mi-border);
  color: var(--mi-text-dim);
}
.mi-docs-toc a:hover {
  color: var(--mi-accent);
  border-left-color: var(--mi-accent);
}
.mi-docs-body h1 {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 40px;
}
.mi-doc-section {
  margin-bottom: 56px;
  scroll-margin-top: 24px;
}
.mi-doc-section > h2 {
  font-size: 24px;
  font-weight: 800;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--mi-border);
  margin-bottom: 18px;
}
.mi-prose {
  font-size: 15.5px;
  line-height: 1.75;
  color: var(--mi-text);
}
.mi-prose p {
  margin: 14px 0;
}
.mi-prose h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 26px 0 10px;
}
.mi-prose ul,
.mi-prose ol {
  padding-left: 22px;
  margin: 14px 0;
}
.mi-prose ul {
  list-style: disc;
}
.mi-prose ol {
  list-style: decimal;
}
.mi-prose li {
  margin: 5px 0;
}
.mi-prose code {
  background: var(--mi-code-bg);
  border-radius: 4px;
  padding: 1px 6px;
  font-family: var(--mi-font-mono);
  font-size: 13.5px;
}
.mi-prose pre {
  background: var(--mi-code-bg);
  border: 1px solid var(--mi-border);
  border-radius: 8px;
  padding: 14px 16px;
  overflow-x: auto;
  margin: 16px 0;
}
.mi-prose pre code {
  background: none;
  padding: 0;
}
.mi-prose img {
  border-radius: 8px;
  border: 1px solid var(--mi-border);
  margin: 16px 0;
  max-width: 100%;
}
.mi-prose table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin: 16px 0;
}
.mi-prose th,
.mi-prose td {
  border: 1px solid var(--mi-border);
  padding: 8px 12px;
  text-align: left;
}
.mi-prose th {
  background: var(--mi-bg-alt);
  font-weight: 700;
}
.mi-prose a {
  color: var(--mi-accent);
  font-weight: 600;
}
.mi-docs-toc-mobile {
  display: none;
}
@media (max-width: 860px) {
  .mi-docs {
    display: block;
  }
  .mi-docs-toc {
    display: none;
  }
  .mi-docs-toc-mobile {
    display: block;
    margin-bottom: 32px;
    border: 1px solid var(--mi-border);
    border-radius: var(--mi-radius);
    padding: 12px 16px;
  }
  .mi-docs-toc-mobile summary {
    font-weight: 700;
    cursor: pointer;
  }
  .mi-docs-toc-mobile a {
    display: block;
    padding: 6px 0;
    color: var(--mi-text-dim);
  }
}
```

- [ ] **Step 5: app/globals.css 작성**

```css
@import '../styles/tokens.css';
@import '../styles/site.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 6: Commit**

```bash
git add lib/site-config.ts lib/icons.tsx styles/ app/globals.css
git commit -m "feat: add design tokens, site skin CSS, icons and site config"
```

---

### Task 3: i18n dict (en / ko)

**Files:**
- Create: `lib/i18n/en.ts`, `lib/i18n/ko.ts`, `lib/i18n/types.ts`

`en.ts`가 Dict 타입의 원본이고, `ko.ts`는 `Dict` 타입을 강제로 만족해야 한다 (markora 패턴). 한쪽만 키를 바꾸면 `npm run check`에서 에러.

- [ ] **Step 1: lib/i18n/en.ts 작성**

```ts
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
```

- [ ] **Step 2: lib/i18n/ko.ts 작성**

```ts
import type { Dict } from './en';

export const ko: Dict = {
  nav: { features: '기능', docs: '문서', install: '설치', faq: 'FAQ' },
  hero: {
    badge: '오픈소스 · macOS & Windows',
    title1: '당신의 MQTT 트래픽을,',
    title2: '한눈에 보이게',
    lead: 'mqtt-insight는 IoT·임베디드 디버깅을 위한 오픈소스 MQTT 데스크톱 클라이언트입니다 — 실시간 토픽 트리, 라이브 차트, MQTT 5.0, 녹화까지 macOS와 Windows에서.',
    download: '다운로드',
    github: 'GitHub',
    pills: ['토픽 트리', '실시간 차트', 'MQTT 5.0', '녹화', 'TLS / WebSocket', '다크 테마'],
    mockTitle: 'mqtt-insight — broker.local:1883',
  },
  features: {
    eyebrow: '기능',
    title: 'MQTT 디버깅에 필요한 모든 것',
    lead: '브로커에 연결하고, 디바이스가 실제로 무엇을 말하는지 확인하세요.',
    more: '자세히 보기',
    items: [
      {
        icon: 'tree',
        title: '자동 집계 토픽 트리',
        desc: '# 또는 + 와일드카드로 구독하면 트리가 자동으로 만들어지고, 모든 노드에 최신 값이 표시됩니다.',
        slug: 'topic-tree',
      },
      {
        icon: 'chart',
        title: '실시간 차트',
        desc: '숫자 payload를 키별 소형 차트로 — now / min / max / avg 통계와 함께 실시간으로 그려집니다.',
        slug: 'charts',
      },
      {
        icon: 'diff',
        title: '포맷 & diff 하이라이트',
        desc: 'payload를 Plain, JSON, Hex, Base64로 자유롭게 보고, 바뀐 값은 도착 즉시 하이라이트됩니다.',
        slug: 'messages',
      },
      {
        icon: 'send',
        title: 'Publish 패널',
        desc: 'QoS, retained 플래그, user properties와 content type 등 MQTT 5.0 properties까지 지원합니다.',
        slug: 'publish',
      },
      {
        icon: 'record',
        title: '토픽별 녹화',
        desc: '원하는 토픽만 골라 로컬 SQLite 파일로 녹화하고, 나중에 히스토리를 살펴볼 수 있습니다.',
        slug: 'recording',
      },
      {
        icon: 'shield',
        title: '연결 프로필',
        desc: 'MQTT 3.1.1/5.0, TCP·TLS·WebSocket 연결을 프로필로 저장해 원클릭으로 접속합니다.',
        slug: 'connection-profiles',
      },
    ],
  },
  install: {
    eyebrow: '설치',
    title: '1분이면 시작할 수 있어요',
    macTitle: 'macOS',
    macBody: 'Apple Silicon & Intel 겸용 Universal 빌드. 압축을 풀고 mqtt-insight.app을 Applications로 옮기세요.',
    macNote: '아직 코드 서명이 되어 있지 않아요 — 첫 실행은 우클릭 → 열기, 또는 아래 명령을 실행하세요:',
    macCmd: 'xattr -cr /Applications/mqtt-insight.app',
    winTitle: 'Windows',
    winBody: 'installer를 실행하거나, 설치가 싫다면 portable zip을 사용하세요.',
    winNote: 'SmartScreen 경고가 뜨면 "추가 정보" → "실행"을 선택하세요.',
    button: 'GitHub Releases에서 다운로드',
  },
  faq: { eyebrow: 'FAQ', title: '자주 묻는 질문' },
  cta: {
    title: '디바이스가 실제로 무엇을 말하는지 확인하세요',
    lead: 'mqtt-insight를 받아서 1분 안에 브로커에 연결해보세요.',
    button: '다운로드',
  },
  footer: { docs: '문서', github: 'GitHub', issues: '이슈', license: 'MIT 라이선스' },
  docs: { title: '문서', toc: '목차' },
};
```

- [ ] **Step 3: lib/i18n/types.ts 작성**

```ts
export type { Dict } from './en';
```

- [ ] **Step 4: 타입 체크**

```bash
npm run check
```

Expected: 에러 없음 (아직 사용처가 없어도 dict 자체의 타입 일치 검증됨)

- [ ] **Step 5: Commit**

```bash
git add lib/i18n/
git commit -m "feat: add en/ko i18n dictionaries with enforced Dict type"
```

---

### Task 4: 루트 레이아웃 + SEO 기반 + 임시 페이지

**Files:**
- Create: `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/page.tsx`(임시), `public/favicon.svg`

- [ ] **Step 1: app/layout.tsx 작성**

```tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/lib/site-config';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

const titleEn = `${siteConfig.name} — MQTT desktop client for IoT debugging`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titleEn,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: titleEn,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: titleEn,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ko: '/ko/',
      'x-default': '/',
    },
  },
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: ['en', 'ko'],
};

const jsonLdSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteConfig.name,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows',
  url: siteConfig.url,
  description: siteConfig.description,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pretendard.variable} suppressHydrationWarning>
      <head>
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <Script
          id="ld-software"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        {siteConfig.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${siteConfig.gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: app/robots.ts 작성**

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: app/sitemap.ts 작성 (4개 라우트 전부)**

```ts
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
```

- [ ] **Step 4: public/favicon.svg 작성**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f8cff"/>
      <stop offset="1" stop-color="#9f6bff"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <path d="M14 42 26 26l8 10 8-16 8 22" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- [ ] **Step 5: 임시 app/page.tsx 작성 (빌드 확인용, Task 10에서 교체)**

```tsx
export default function Page() {
  return <main className="mi-container">mqtt-insight landing — under construction</main>;
}
```

- [ ] **Step 6: 빌드 검증**

```bash
npm run build
```

Expected: 성공, `out/index.html`, `out/sitemap.xml`, `out/robots.txt` 생성. 첫 빌드로 `next-env.d.ts`도 생성됨.

- [ ] **Step 7: Commit**

```bash
git add app/ public/favicon.svg next-env.d.ts
git commit -m "feat: add root layout with SEO metadata, robots, sitemap"
```

---

### Task 5: Nav + 테마/언어 토글 + 자동 언어 감지

**Files:**
- Create: `components/nav.tsx`, `components/theme-toggle.tsx`, `components/lang-toggle.tsx`, `components/auto-lang-redirect.tsx`, `components/set-html-lang.tsx`

- [ ] **Step 1: components/theme-toggle.tsx 작성**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Icon } from '@/lib/icons';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <button className="mi-icon-btn" aria-label="theme" />;
  }

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      className="mi-icon-btn"
      title="theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={15} />
    </button>
  );
}
```

- [ ] **Step 2: components/lang-toggle.tsx 작성 (docs 경로 유지)**

```tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LangToggle() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const isKo = pathname.startsWith('/ko');

  function go(to: 'en' | 'ko') {
    const rest = isKo ? pathname.replace(/^\/ko/, '') || '/' : pathname;
    const path = to === 'ko' ? `/ko${rest === '/' ? '/' : rest}` : rest;
    if (typeof window !== 'undefined') {
      localStorage.setItem('mi-lang', to);
    }
    router.push(path);
  }

  return (
    <div className="mi-pill-toggle">
      <button className={!isKo ? 'active' : ''} onClick={() => go('en')}>
        EN
      </button>
      <button className={isKo ? 'active' : ''} onClick={() => go('ko')}>
        KO
      </button>
    </div>
  );
}
```

- [ ] **Step 3: components/auto-lang-redirect.tsx 작성**

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AutoLangRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('mi-lang')) return;
    if (navigator.language.toLowerCase().startsWith('ko')) {
      router.replace('/ko/');
    }
  }, [router]);
  return null;
}
```

- [ ] **Step 4: components/set-html-lang.tsx 작성 (ko 서버 페이지용)**

```tsx
'use client';

import { useEffect } from 'react';

export function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = 'en';
    };
  }, [lang]);
  return null;
}
```

- [ ] **Step 5: components/nav.tsx 작성**

```tsx
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { LangToggle } from './lang-toggle';
import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function Nav({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const home = lang === 'ko' ? '/ko/' : '/';
  const docs = lang === 'ko' ? '/ko/docs/' : '/docs/';
  return (
    <header className="mi-nav">
      <div className="mi-container mi-nav-inner">
        <Link href={home} className="mi-logo">
          <Icon name="logo" size={20} />
          mqtt-insight
        </Link>
        <nav className="mi-nav-links">
          <a href={`${home}#features`}>{t.nav.features}</a>
          <Link href={docs}>{t.nav.docs}</Link>
          <a href={`${home}#install`}>{t.nav.install}</a>
          <a href={`${home}#faq`}>{t.nav.faq}</a>
        </nav>
        <div className="mi-nav-actions">
          <a
            className="mi-icon-btn"
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Icon name="github" size={16} />
          </a>
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 6: 타입 체크**

```bash
npm run check
```

Expected: 에러 없음

- [ ] **Step 7: Commit**

```bash
git add components/
git commit -m "feat: add nav, theme/lang toggles and auto language redirect"
```

---

### Task 6: Hero + CSS 앱 목업

**Files:**
- Create: `components/hero.tsx`, `components/app-mock.tsx`

- [ ] **Step 1: components/app-mock.tsx 작성**

3-pane CSS 목업: 토픽 트리 | 라이브 메시지 | 미니 차트. 인라인 텍스트는 dict가 아닌 `lang` 분기 (markora ide-mock 패턴).

```tsx
export function AppMock({ lang, title }: { lang: 'en' | 'ko'; title: string }) {
  const label = {
    tree: lang === 'ko' ? '토픽 트리' : 'Topic tree',
    messages: lang === 'ko' ? '라이브 메시지' : 'Live messages',
    chart: lang === 'ko' ? '차트 · sensors/temp' : 'Chart · sensors/temp',
  };
  return (
    <div className="mi-mock">
      <div className="mi-mock-titlebar">
        <span className="mi-mock-dot" />
        <span className="mi-mock-dot" />
        <span className="mi-mock-dot" />
        <span className="mi-mock-title">{title}</span>
      </div>
      <div className="mi-mock-panes">
        <div className="mi-mock-pane">
          <div className="mi-mock-pane-label">{label.tree}</div>
          <div>▾ sensors</div>
          <div>&nbsp;&nbsp;temp <span className="mi-mock-value">23.5</span></div>
          <div>&nbsp;&nbsp;humidity <span className="mi-mock-value">41.2</span></div>
          <div>▾ devices</div>
          <div>&nbsp;&nbsp;▾ gw-01</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;status <span className="mi-mock-value">online</span></div>
          <div>&nbsp;&nbsp;▸ gw-02</div>
        </div>
        <div className="mi-mock-pane">
          <div className="mi-mock-pane-label">{label.messages}</div>
          <div><span className="mi-mock-topic">sensors/temp</span> {'{"temp": 23.5, "unit": "C"}'}</div>
          <div><span className="mi-mock-topic">sensors/humidity</span> {'{"rh": 41.2}'}</div>
          <div><span className="mi-mock-topic">devices/gw-01/status</span> online</div>
          <div><span className="mi-mock-topic">sensors/temp</span> {'{"temp": 23.4, "unit": "C"}'}</div>
          <div><span className="mi-mock-topic">sensors/temp</span> {'{"temp": 23.6, "unit": "C"}'}</div>
          <div><span className="mi-mock-topic">sensors/humidity</span> {'{"rh": 41.0}'}</div>
        </div>
        <div className="mi-mock-pane">
          <div className="mi-mock-pane-label">{label.chart}</div>
          <svg width="100%" height="110" viewBox="0 0 200 110" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mi-spark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4f8cff" />
                <stop offset="1" stopColor="#9f6bff" />
              </linearGradient>
            </defs>
            <polyline
              points="0,84 18,74 36,80 54,58 72,64 90,40 108,48 126,30 144,38 162,22 180,30 200,18"
              fill="none"
              stroke="url(#mi-spark)"
              strokeWidth="2.5"
            />
          </svg>
          <div className="mi-mock-stats">
            <span>now 23.5</span>
            <span>min 22.9</span>
            <span>max 24.1</span>
            <span>avg 23.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: components/hero.tsx 작성**

```tsx
import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import { AppMock } from './app-mock';
import type { Dict } from '@/lib/i18n/types';

export function Hero({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  return (
    <section className="mi-hero">
      <div className="mi-container">
        <div className="mi-hero-badge">{t.hero.badge}</div>
        <h1>
          {t.hero.title1}
          <br />
          <span className="mi-grad-text">{t.hero.title2}</span>
        </h1>
        <p className="mi-hero-lead">{t.hero.lead}</p>
        <div className="mi-hero-actions">
          <a className="mi-btn primary" href={siteConfig.releases} target="_blank" rel="noreferrer">
            <Icon name="download" size={16} />
            {t.hero.download}
          </a>
          <a className="mi-btn ghost" href={siteConfig.github} target="_blank" rel="noreferrer">
            <Icon name="github" size={16} />
            {t.hero.github}
          </a>
        </div>
        <div className="mi-pills">
          {t.hero.pills.map((p) => (
            <span key={p} className="mi-pill">
              {p}
            </span>
          ))}
        </div>
        <AppMock lang={lang} title={t.hero.mockTitle} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 타입 체크 + Commit**

```bash
npm run check
git add components/hero.tsx components/app-mock.tsx
git commit -m "feat: add hero section with CSS app mock"
```

---

### Task 7: Features 그리드

**Files:**
- Create: `components/features.tsx`

- [ ] **Step 1: components/features.tsx 작성**

`t.features.items[].icon`은 문자열이므로 `Icon`의 name 타입으로 캐스팅한다.

```tsx
import { Icon } from '@/lib/icons';
import type { Dict } from '@/lib/i18n/types';

type IconName = Parameters<typeof Icon>[0]['name'];

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
                <Icon name={item.icon as IconName} size={18} />
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
```

- [ ] **Step 2: 타입 체크 + Commit**

```bash
npm run check
git add components/features.tsx
git commit -m "feat: add features grid section"
```

---

### Task 8: Install 섹션

**Files:**
- Create: `components/install.tsx`

- [ ] **Step 1: components/install.tsx 작성**

```tsx
import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function Install({ t }: { t: Dict }) {
  return (
    <section className="mi-section" id="install">
      <div className="mi-container narrow">
        <div className="mi-section-head">
          <div className="mi-eyebrow">{t.install.eyebrow}</div>
          <h2 className="mi-h2">{t.install.title}</h2>
        </div>
        <div className="mi-install-grid">
          <div className="mi-install-card">
            <h3>{t.install.macTitle}</h3>
            <p>{t.install.macBody}</p>
            <p>{t.install.macNote}</p>
            <code className="mi-code">{t.install.macCmd}</code>
          </div>
          <div className="mi-install-card">
            <h3>{t.install.winTitle}</h3>
            <p>{t.install.winBody}</p>
            <p>{t.install.winNote}</p>
          </div>
        </div>
        <div className="mi-install-cta">
          <a className="mi-btn primary" href={siteConfig.releases} target="_blank" rel="noreferrer">
            <Icon name="download" size={16} />
            {t.install.button}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 타입 체크 + Commit**

```bash
npm run check
git add components/install.tsx
git commit -m "feat: add install section"
```

---

### Task 9: FAQ

**Files:**
- Create: `components/faq.tsx`

- [ ] **Step 1: components/faq.tsx 작성**

FAQ 본문은 JSX가 필요해 dict가 아닌 컴포넌트 내부 `lang` 분기로 관리 (markora 패턴).

```tsx
'use client';

import { useState, type ReactNode } from 'react';
import { Icon } from '@/lib/icons';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

type QA = { q: string; a: ReactNode };

function getFaqs(lang: 'en' | 'ko'): QA[] {
  if (lang === 'ko') {
    return [
      {
        q: '무료인가요? 오픈소스인가요?',
        a: (
          <>
            네, MIT 라이선스 오픈소스이며 완전히 무료입니다. 소스 코드는{' '}
            <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a>에 공개되어
            있습니다.
          </>
        ),
      },
      {
        q: '어떤 MQTT 버전과 연결 방식을 지원하나요?',
        a: 'MQTT 3.1.1과 5.0을 모두 지원하고, TCP · TLS · WebSocket으로 브로커에 연결할 수 있습니다. 연결 설정은 프로필로 저장됩니다.',
      },
      {
        q: '내 데이터는 어디에 저장되나요?',
        a: '모든 데이터는 로컬에만 저장됩니다. 연결 프로필과 설정은 OS별 설정 폴더의 JSON 파일에, 녹화 데이터는 로컬 SQLite 파일에 저장되며 외부로 전송되지 않습니다.',
      },
      {
        q: '설치할 때 보안 경고가 뜨는 이유는요?',
        a: (
          <>
            아직 코드 서명이 되어 있지 않아서예요. macOS는 우클릭 → 열기 또는{' '}
            <code>xattr -cr /Applications/mqtt-insight.app</code>, Windows는 SmartScreen에서
            &quot;추가 정보&quot; → &quot;실행&quot;을 선택하면 됩니다.
          </>
        ),
      },
      {
        q: '앞으로 어떤 기능이 추가되나요?',
        a: '중첩 JSON path 차트, 멀티 토픽 차트 비교, 차트/데이터 내보내기, mTLS를 계획하고 있습니다. 동시 다중 연결은 의도적으로 범위에서 제외했습니다.',
      },
      {
        q: '버그는 어떻게 신고하나요?',
        a: (
          <>
            <a href={siteConfig.issues} target="_blank" rel="noreferrer">GitHub Issues</a>에
            남겨주세요. 재현 방법과 함께 올려주시면 큰 도움이 됩니다.
          </>
        ),
      },
    ];
  }
  return [
    {
      q: 'Is it free? Open source?',
      a: (
        <>
          Yes — MIT licensed and completely free. The source code is on{' '}
          <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a>.
        </>
      ),
    },
    {
      q: 'Which MQTT versions and transports are supported?',
      a: 'Both MQTT 3.1.1 and 5.0, over TCP, TLS and WebSocket. Connection settings are saved as profiles.',
    },
    {
      q: 'Where is my data stored?',
      a: 'Everything stays local. Connection profiles and settings live in a JSON file in your OS config directory; recordings go to a local SQLite file. Nothing leaves your machine.',
    },
    {
      q: 'Why do I see a security warning on install?',
      a: (
        <>
          The app is not code-signed yet. On macOS use right-click → Open or run{' '}
          <code>xattr -cr /Applications/mqtt-insight.app</code>; on Windows choose &quot;More
          info&quot; → &quot;Run anyway&quot; in SmartScreen.
        </>
      ),
    },
    {
      q: "What's on the roadmap?",
      a: 'Nested JSON path charts, multi-topic chart comparison, chart/data export, and mTLS. Multiple simultaneous connections are intentionally out of scope.',
    },
    {
      q: 'How do I report a bug?',
      a: (
        <>
          Open an issue on{' '}
          <a href={siteConfig.issues} target="_blank" rel="noreferrer">GitHub Issues</a> — repro
          steps appreciated.
        </>
      ),
    },
  ];
}

export function FAQ({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const items = getFaqs(lang);
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="mi-section alt" id="faq">
      <div className="mi-container narrow">
        <div className="mi-section-head">
          <div className="mi-eyebrow">{t.faq.eyebrow}</div>
          <h2 className="mi-h2">{t.faq.title}</h2>
        </div>
        <div className="mi-faq">
          {items.map((item, i) => (
            <div key={i} className={'mi-faq-item' + (open === i ? ' open' : '')}>
              <button className="mi-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{item.q}</span>
                <span className="mi-faq-chev">
                  <Icon name="chev" size={16} />
                </span>
              </button>
              <div className="mi-faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 타입 체크 + Commit**

```bash
npm run check
git add components/faq.tsx
git commit -m "feat: add FAQ accordion section"
```

---

### Task 10: Final CTA + Footer + Landing 컴포지션 + 페이지 연결

**Files:**
- Create: `components/final-cta.tsx`, `components/footer.tsx`, `components/landing.tsx`, `app/ko/layout.tsx`, `app/ko/page.tsx`
- Modify: `app/page.tsx` (임시 → 실제)

- [ ] **Step 1: components/final-cta.tsx 작성**

```tsx
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
```

- [ ] **Step 2: components/footer.tsx 작성**

```tsx
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import type { Dict } from '@/lib/i18n/types';

export function Footer({ t, lang }: { t: Dict; lang: 'en' | 'ko' }) {
  const docs = lang === 'ko' ? '/ko/docs/' : '/docs/';
  return (
    <footer className="mi-footer">
      <div className="mi-container mi-footer-inner">
        <span>© {new Date().getFullYear()} advenoh · mqtt-insight</span>
        <nav className="mi-footer-links">
          <Link href={docs}>{t.footer.docs}</Link>
          <a href={siteConfig.github} target="_blank" rel="noreferrer">
            {t.footer.github}
          </a>
          <a href={siteConfig.issues} target="_blank" rel="noreferrer">
            {t.footer.issues}
          </a>
          <a href={siteConfig.license} target="_blank" rel="noreferrer">
            {t.footer.license}
          </a>
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: components/landing.tsx 작성**

```tsx
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
```

- [ ] **Step 4: app/page.tsx 교체 (실제 랜딩)**

```tsx
import type { Metadata } from 'next';
import { en } from '@/lib/i18n/en';
import { Landing } from '@/components/landing';
import { AutoLangRedirect } from '@/components/auto-lang-redirect';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} — MQTT desktop client for IoT debugging`,
  description: en.hero.lead,
  openGraph: {
    locale: 'en_US',
    title: `${siteConfig.name} — MQTT desktop client for IoT debugging`,
    description: en.hero.lead,
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
```

- [ ] **Step 5: app/ko/layout.tsx 작성**

```tsx
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
```

- [ ] **Step 6: app/ko/page.tsx 작성**

```tsx
import { ko } from '@/lib/i18n/ko';
import { Landing } from '@/components/landing';
import { SetHtmlLang } from '@/components/set-html-lang';

export default function Page() {
  return (
    <>
      <SetHtmlLang lang="ko" />
      <Landing t={ko} lang="ko" />
    </>
  );
}
```

- [ ] **Step 7: 빌드 및 육안 확인**

```bash
npm run check && npm run build
```

Expected: 성공, `out/index.html` + `out/ko/index.html` 생성

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`과 `http://localhost:3000/ko/` 확인:
- Hero 그라데이션 + 3-pane 목업 렌더
- EN/KO 토글, 라이트/다크 토글 동작
- Features 카드 6개, Install 2카드, FAQ 아코디언 열림/닫힘
- 확인 후 dev 서버 종료

- [ ] **Step 8: Commit**

```bash
git add components/ app/
git commit -m "feat: complete landing page with en/ko routes"
```

---

### Task 11: 스크린샷 + OG 이미지

**Files:**
- Create: `public/screenshots/connection-home.png`, `public/screenshots/chart-view.png`, `public/og.png`

- [ ] **Step 1: 본체 저장소의 기존 스크린샷 복사**

```bash
mkdir -p public/screenshots
cp ../mqtt-insight/docs/screenshots/connection-home.png public/screenshots/
cp ../mqtt-insight/docs/screenshots/chart-view.png public/screenshots/
```

- [ ] **Step 2: OG 이미지 임시 지정 (차트 뷰 캡처 재사용)**

```bash
cp ../mqtt-insight/docs/screenshots/chart-view.png public/og.png
```

참고: 정식 OG 이미지(1200×630 브랜드 카드)는 사이트 오픈 전 별도 제작 대상. 지금은 실제 앱 화면으로 대체한다.

- [ ] **Step 3: Commit**

```bash
git add public/screenshots/ public/og.png
git commit -m "feat: add app screenshots and interim og image"
```

---

### Task 12: 매뉴얼 md 콘텐츠 (en)

**Files:**
- Create: `content/docs/en/01-getting-started.md` ~ `08-settings.md` (8개)

frontmatter는 `title`(TOC 표기)과 `slug`(앵커 id) 두 개 필수. 파일명 숫자 prefix가 TOC 순서를 결정한다. 아직 캡처하지 못한 스크린샷 자리는 HTML 주석(`<!-- screenshot: xxx.png -->`)으로 표시한다 — remark 변환 시 출력 HTML에서 제거되므로 렌더에 영향 없고, Task 17에서 실제 이미지로 교체한다.

- [ ] **Step 1: content/docs/en/01-getting-started.md 작성**

````markdown
---
title: Getting started
slug: getting-started
---

mqtt-insight is a desktop MQTT client for IoT and embedded debugging. Download the latest
build from [GitHub Releases](https://github.com/kenshin579/mqtt-insight/releases).

### Install on macOS

The macOS build is universal (Apple Silicon & Intel).

1. Unzip the download and move `mqtt-insight.app` to Applications.
2. The app is not code-signed yet — on first launch use right-click → Open, or run:

```bash
xattr -cr /Applications/mqtt-insight.app
```

### Install on Windows

Run the installer (`…-installer.exe`), or use the portable zip.
If SmartScreen warns, choose "More info" → "Run anyway".

### First connection

![Connection launcher with saved profiles](/screenshots/connection-home.png)

1. Click **New connection** and enter your broker host and port (e.g. `localhost:1883`).
2. Pick the MQTT version (3.1.1 or 5.0) and transport (TCP / TLS / WebSocket).
3. Click **Connect** — the profile is saved automatically, so next time it's one click
   (or a double-click on the profile card).
````

- [ ] **Step 2: content/docs/en/02-connection-profiles.md 작성**

```markdown
---
title: Connection profiles
slug: connection-profiles
---

Every connection you set up is saved as a profile on the launcher screen, so reconnecting
is a single click.

A profile stores:

- **Host / port** and an optional display name
- **MQTT version** — 3.1.1 or 5.0
- **Transport** — plain TCP, TLS, or WebSocket
- **Credentials** — username / password if your broker requires them
- **Default subscriptions** to apply on connect

Profiles live in a local JSON file in your OS config directory — nothing is stored in the
cloud. Edit or delete profiles from the context menu on each profile card.

<!-- screenshot: connection-edit.png -->
```

- [ ] **Step 3: content/docs/en/03-topic-tree.md 작성**

```markdown
---
title: Topic tree
slug: topic-tree
---

Subscribe with wildcards (`#`, `+`) and mqtt-insight builds a topic tree for you as
messages arrive. There is no need to know the topic layout up front — the tree **is** the
discovery tool.

- Every node shows its **latest value** inline, updated live.
- Parent nodes aggregate message counts from their children.
- Click a node to filter the message list to that subtopic.
- Collapsed branches keep aggregating in the background.

<!-- screenshot: topic-tree.png -->

The tree pairs well with [real-time charts](#charts): select a numeric leaf and open the
chart panel to plot it.
```

- [ ] **Step 4: content/docs/en/04-messages.md 작성**

```markdown
---
title: Messages & formats
slug: messages
---

The message panel shows the live stream for the selected topic (or the whole
subscription), with history kept per topic in a configurable ring buffer.

### Payload formats

Switch any payload between **Plain / JSON / Hex / Base64** views. JSON is pretty-printed;
binary payloads are readable in Hex or Base64.

### Diff highlighting

When consecutive messages on a topic are JSON, changed values are **highlighted** as they
arrive — ideal for spotting which sensor field actually moved in a noisy stream.

<!-- screenshot: messages.png -->
```

- [ ] **Step 5: content/docs/en/05-charts.md 작성**

```markdown
---
title: Real-time charts
slug: charts
---

Numeric payloads turn into live charts. If the payload is JSON, each numeric key becomes
its own chart — small multiples, one per key — with **now / min / max / avg** stats.

![Main view: topic tree, live messages and real-time charts](/screenshots/chart-view.png)

- Charts stream in real time as messages arrive.
- Stats are computed over the visible window.
- Works for plain numeric payloads as well as JSON keys.

Planned next: nested JSON path charts, multi-topic comparison, and chart/data export.
```

- [ ] **Step 6: content/docs/en/06-publish.md 작성**

```markdown
---
title: Publish
slug: publish
---

The publish panel sends messages without leaving the app.

- **QoS** 0 / 1 / 2 and the **retained** flag
- Payload editor with the same Plain / JSON / Hex / Base64 formats
- **MQTT 5.0 properties**: user properties, content type, message expiry,
  response topic and correlation data

Published messages appear in your own subscriptions immediately, so round-trip testing —
publish, watch the tree update, check the chart — happens in one window.

<!-- screenshot: publish.png -->
```

- [ ] **Step 7: content/docs/en/07-recording.md 작성**

```markdown
---
title: Recording
slug: recording
---

Turn on recording for the topics you care about and mqtt-insight writes every message to
a local **SQLite** file.

- Recording is **opt-in per topic** — record the interesting traffic, skip the noise.
- The database is a plain SQLite file, so you can query it later with any SQLite tool.
- Recording state is visible in the UI while active.

<!-- screenshot: recording.png -->
```

- [ ] **Step 8: content/docs/en/08-settings.md 작성**

```markdown
---
title: Settings
slug: settings
---

- **Theme** — dark, light, or follow the system.
- **Ring buffer size** — how many messages to keep per topic in memory.
- **Default payload format** — which view (Plain / JSON / Hex / Base64) new topics open
  with.

Settings are stored locally in your OS config directory, next to connection profiles.

<!-- screenshot: settings.png -->
```

- [ ] **Step 9: Commit**

```bash
git add content/docs/en/
git commit -m "docs: add English manual content"
```

---

### Task 13: 매뉴얼 md 콘텐츠 (ko)

**Files:**
- Create: `content/docs/ko/01-getting-started.md` ~ `08-settings.md` (en과 같은 파일명 8개)

- [ ] **Step 1: content/docs/ko/01-getting-started.md 작성**

````markdown
---
title: 시작하기
slug: getting-started
---

mqtt-insight는 IoT·임베디드 디버깅용 데스크톱 MQTT 클라이언트입니다. 최신 빌드는
[GitHub Releases](https://github.com/kenshin579/mqtt-insight/releases)에서 받을 수 있습니다.

### macOS 설치

macOS 빌드는 Apple Silicon & Intel 겸용(Universal)입니다.

1. 압축을 풀고 `mqtt-insight.app`을 Applications로 옮깁니다.
2. 아직 코드 서명이 되어 있지 않아요 — 첫 실행은 우클릭 → 열기, 또는 아래 명령을 실행하세요:

```bash
xattr -cr /Applications/mqtt-insight.app
```

### Windows 설치

installer(`…-installer.exe`)를 실행하거나 portable zip을 사용하세요.
SmartScreen 경고가 뜨면 "추가 정보" → "실행"을 선택하면 됩니다.

### 첫 연결

![저장된 프로필이 있는 연결 런처](/screenshots/connection-home.png)

1. **New connection**을 눌러 브로커 호스트와 포트를 입력합니다 (예: `localhost:1883`).
2. MQTT 버전(3.1.1 / 5.0)과 연결 방식(TCP / TLS / WebSocket)을 고릅니다.
3. **Connect**를 누르면 프로필이 자동 저장되어, 다음부터는 카드 클릭(또는 더블클릭)
   한 번으로 접속됩니다.
````

- [ ] **Step 2: content/docs/ko/02-connection-profiles.md 작성**

```markdown
---
title: 연결 프로필
slug: connection-profiles
---

한 번 설정한 연결은 런처 화면에 프로필로 저장되어, 다음 접속은 클릭 한 번이면 됩니다.

프로필에 저장되는 것:

- **호스트 / 포트**와 표시 이름(선택)
- **MQTT 버전** — 3.1.1 또는 5.0
- **연결 방식** — TCP, TLS, WebSocket
- **인증 정보** — 브로커가 요구하면 username / password
- 접속 시 자동 적용할 **기본 구독** 목록

프로필은 OS별 설정 폴더의 로컬 JSON 파일에 저장되며, 클라우드에는 아무것도 올라가지
않습니다. 각 프로필 카드의 컨텍스트 메뉴에서 수정·삭제할 수 있습니다.

<!-- screenshot: connection-edit.png -->
```

- [ ] **Step 3: content/docs/ko/03-topic-tree.md 작성**

```markdown
---
title: 토픽 트리
slug: topic-tree
---

와일드카드(`#`, `+`)로 구독하면 메시지가 도착하는 대로 mqtt-insight가 토픽 트리를
자동으로 만들어줍니다. 토픽 구조를 미리 알 필요가 없어요 — 트리 자체가 **탐색 도구**입니다.

- 모든 노드에 **최신 값**이 인라인으로 표시되고 실시간 갱신됩니다.
- 부모 노드는 자식들의 메시지 수를 집계해 보여줍니다.
- 노드를 클릭하면 메시지 목록이 해당 하위 토픽으로 필터링됩니다.
- 접힌 브랜치도 백그라운드에서 계속 집계됩니다.

<!-- screenshot: topic-tree.png -->

토픽 트리는 [실시간 차트](#charts)와 함께 쓰면 좋습니다. 숫자 값 리프를 선택하고 차트
패널을 열면 바로 그래프가 그려집니다.
```

- [ ] **Step 4: content/docs/ko/04-messages.md 작성**

```markdown
---
title: 메시지 & 포맷
slug: messages
---

메시지 패널은 선택한 토픽(또는 구독 전체)의 라이브 스트림을 보여주며, 토픽별 히스토리는
설정 가능한 링 버퍼에 유지됩니다.

### payload 포맷

payload를 **Plain / JSON / Hex / Base64** 뷰로 자유롭게 전환할 수 있습니다. JSON은
보기 좋게 정렬되고, 바이너리 payload도 Hex나 Base64로 읽을 수 있어요.

### diff 하이라이트

같은 토픽의 연속된 메시지가 JSON이면, 바뀐 값이 도착 즉시 **하이라이트**됩니다 —
시끄러운 스트림에서 실제로 움직인 센서 필드를 찾아낼 때 특히 유용합니다.

<!-- screenshot: messages.png -->
```

- [ ] **Step 5: content/docs/ko/05-charts.md 작성**

```markdown
---
title: 실시간 차트
slug: charts
---

숫자 payload는 라이브 차트가 됩니다. payload가 JSON이면 숫자 키마다 차트가 하나씩 —
키별 소형 차트(small multiples)로 그려지고 **now / min / max / avg** 통계가 붙습니다.

![메인 화면: 토픽 트리, 라이브 메시지, 실시간 차트](/screenshots/chart-view.png)

- 메시지가 도착하는 대로 차트가 실시간으로 흐릅니다.
- 통계는 보이는 구간을 기준으로 계산됩니다.
- 순수 숫자 payload와 JSON 키 모두 지원합니다.

다음 계획: 중첩 JSON path 차트, 멀티 토픽 비교, 차트/데이터 내보내기.
```

- [ ] **Step 6: content/docs/ko/06-publish.md 작성**

```markdown
---
title: Publish
slug: publish
---

Publish 패널에서 앱을 벗어나지 않고 메시지를 보낼 수 있습니다.

- **QoS** 0 / 1 / 2와 **retained** 플래그
- Plain / JSON / Hex / Base64 포맷을 지원하는 payload 에디터
- **MQTT 5.0 properties**: user properties, content type, message expiry,
  response topic, correlation data

발행한 메시지는 내 구독에 즉시 나타나므로, 발행 → 트리 갱신 확인 → 차트 확인까지
왕복 테스트가 창 하나에서 끝납니다.

<!-- screenshot: publish.png -->
```

- [ ] **Step 7: content/docs/ko/07-recording.md 작성**

```markdown
---
title: 녹화
slug: recording
---

관심 있는 토픽에 녹화를 켜면 mqtt-insight가 모든 메시지를 로컬 **SQLite** 파일에
기록합니다.

- 녹화는 **토픽별 opt-in** — 필요한 트래픽만 기록하고 소음은 건너뜁니다.
- 데이터베이스는 평범한 SQLite 파일이라, 나중에 어떤 SQLite 도구로든 조회할 수 있습니다.
- 녹화 중에는 UI에 녹화 상태가 표시됩니다.

<!-- screenshot: recording.png -->
```

- [ ] **Step 8: content/docs/ko/08-settings.md 작성**

```markdown
---
title: 설정
slug: settings
---

- **테마** — 다크, 라이트, 시스템 따르기.
- **링 버퍼 크기** — 토픽별로 메모리에 유지할 메시지 개수.
- **기본 payload 포맷** — 새 토픽을 열 때 사용할 뷰(Plain / JSON / Hex / Base64).

설정은 연결 프로필과 같은 OS별 설정 폴더에 로컬로 저장됩니다.

<!-- screenshot: settings.png -->
```

- [ ] **Step 9: 인코딩 확인 + Commit**

```bash
file -I content/docs/ko/*.md
```

Expected: 모두 `charset=utf-8`

```bash
git add content/docs/ko/
git commit -m "docs: add Korean manual content"
```

---

### Task 14: md 파이프라인 (`lib/docs.ts`) — TDD

**Files:**
- Create: `lib/docs.ts`, `lib/docs.test.ts`, `vitest.config.ts`

- [ ] **Step 1: vitest.config.ts 작성**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/**/*.test.ts'],
  },
});
```

- [ ] **Step 2: 실패하는 테스트 작성 — lib/docs.test.ts**

실제 `content/docs/` 콘텐츠(Task 12·13에서 작성됨)를 픽스처로 사용한다.

```ts
import { describe, it, expect } from 'vitest';
import { listDocFiles, assertLangParity, loadDocs } from './docs';

describe('listDocFiles', () => {
  it('returns md files sorted by filename for both langs', () => {
    const en = listDocFiles('en');
    const ko = listDocFiles('ko');
    expect(en).toHaveLength(8);
    expect(en[0]).toBe('01-getting-started.md');
    expect(en).toEqual([...en].sort());
    expect(ko).toEqual(en);
  });
});

describe('assertLangParity', () => {
  it('passes when en and ko file sets match', () => {
    expect(() => assertLangParity()).not.toThrow();
  });
});

describe('loadDocs', () => {
  it('parses frontmatter and renders markdown to html', async () => {
    const sections = await loadDocs('en');
    expect(sections).toHaveLength(8);

    const gettingStarted = sections[0];
    expect(gettingStarted.slug).toBe('getting-started');
    expect(gettingStarted.title).toBe('Getting started');
    expect(gettingStarted.html).toContain('<h3>');
    expect(gettingStarted.html).toContain('/screenshots/connection-home.png');
  });

  it('strips html comments (pending screenshot markers) from output', async () => {
    const sections = await loadDocs('en');
    const topicTree = sections.find((s) => s.slug === 'topic-tree');
    expect(topicTree).toBeDefined();
    expect(topicTree!.html).not.toContain('screenshot: topic-tree.png');
  });

  it('every section has non-empty slug, title and html', async () => {
    for (const lang of ['en', 'ko'] as const) {
      const sections = await loadDocs(lang);
      for (const s of sections) {
        expect(s.slug).toBeTruthy();
        expect(s.title).toBeTruthy();
        expect(s.html.length).toBeGreaterThan(50);
      }
    }
  });
});
```

- [ ] **Step 3: 테스트 실패 확인**

```bash
npm test
```

Expected: FAIL — `Cannot find module './docs'` 계열 에러

- [ ] **Step 4: lib/docs.ts 구현**

```ts
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export type DocLang = 'en' | 'ko';

export type DocSection = {
  slug: string;
  title: string;
  html: string;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'docs');

export function listDocFiles(lang: DocLang): string[] {
  return fs
    .readdirSync(path.join(CONTENT_ROOT, lang))
    .filter((f) => f.endsWith('.md'))
    .sort();
}

/** en/ko 파일 세트가 다르면 빌드를 실패시킨다 (번역 누락 방지). */
export function assertLangParity(): void {
  const en = listDocFiles('en');
  const ko = listDocFiles('ko');
  if (en.join(',') !== ko.join(',')) {
    throw new Error(
      `docs content mismatch between en and ko:\n  en: [${en.join(', ')}]\n  ko: [${ko.join(', ')}]`,
    );
  }
}

export async function loadDocs(lang: DocLang): Promise<DocSection[]> {
  assertLangParity();
  const sections: DocSection[] = [];
  for (const file of listDocFiles(lang)) {
    const raw = fs.readFileSync(path.join(CONTENT_ROOT, lang, file), 'utf8');
    const { data, content } = matter(raw);
    if (!data.title || !data.slug) {
      throw new Error(`${lang}/${file}: frontmatter must include title and slug`);
    }
    const html = String(
      await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content),
    );
    sections.push({ slug: String(data.slug), title: String(data.title), html });
  }
  return sections;
}
```

- [ ] **Step 5: 테스트 통과 확인**

```bash
npm test
```

Expected: PASS (5 tests)

- [ ] **Step 6: Commit**

```bash
git add lib/docs.ts lib/docs.test.ts vitest.config.ts
git commit -m "feat: add markdown docs pipeline with en/ko parity check"
```

---

### Task 15: Docs 레이아웃 + 매뉴얼 페이지 (en/ko)

**Files:**
- Create: `components/docs/docs-layout.tsx`, `app/docs/page.tsx`, `app/ko/docs/page.tsx`

- [ ] **Step 1: components/docs/docs-layout.tsx 작성**

```tsx
import type { DocSection } from '@/lib/docs';

export function DocsLayout({
  sections,
  title,
  tocTitle,
}: {
  sections: DocSection[];
  title: string;
  tocTitle: string;
}) {
  const toc = (
    <ul>
      {sections.map((s) => (
        <li key={s.slug}>
          <a href={`#${s.slug}`}>{s.title}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mi-container mi-docs">
      <aside className="mi-docs-toc">
        <div className="mi-docs-toc-title">{tocTitle}</div>
        <nav>{toc}</nav>
      </aside>
      <main className="mi-docs-body">
        <h1>{title}</h1>
        <details className="mi-docs-toc-mobile">
          <summary>{tocTitle}</summary>
          <nav>{toc}</nav>
        </details>
        {sections.map((s) => (
          <section key={s.slug} id={s.slug} className="mi-doc-section">
            <h2>{s.title}</h2>
            <div className="mi-prose" dangerouslySetInnerHTML={{ __html: s.html }} />
          </section>
        ))}
      </main>
    </div>
  );
}
```

- [ ] **Step 2: app/docs/page.tsx 작성**

```tsx
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
```

- [ ] **Step 3: app/ko/docs/page.tsx 작성**

```tsx
import type { Metadata } from 'next';
import { loadDocs } from '@/lib/docs';
import { ko } from '@/lib/i18n/ko';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { DocsLayout } from '@/components/docs/docs-layout';
import { SetHtmlLang } from '@/components/set-html-lang';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '문서',
  description: `${siteConfig.name} 사용법: 연결 프로필, 토픽 트리, 차트, Publish, 녹화, 설정.`,
  alternates: {
    canonical: '/ko/docs/',
    languages: {
      en: '/docs/',
      ko: '/ko/docs/',
      'x-default': '/docs/',
    },
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
```

- [ ] **Step 4: 빌드 및 육안 확인**

```bash
npm run check && npm test && npm run build
```

Expected: 전부 성공, `out/docs/index.html` + `out/ko/docs/index.html` 생성

```bash
npm run dev
```

브라우저에서 확인 후 dev 서버 종료:
- `http://localhost:3000/docs/` — 사이드바 TOC 8개 항목, 앵커 클릭 시 해당 섹션으로 스크롤
- `http://localhost:3000/ko/docs/` — 한국어 콘텐츠
- 창 폭을 좁혀 모바일 접이식 TOC(details) 동작 확인
- 랜딩 Features 카드의 "Learn more" → docs 앵커로 이동 확인
- EN/KO 토글이 `/docs/` ↔ `/ko/docs/`를 유지하는지 확인

- [ ] **Step 5: Commit**

```bash
git add components/docs/ app/docs/ app/ko/docs/
git commit -m "feat: add manual docs pages with sidebar TOC"
```

---

### Task 16: en/ko 파일 세트 검증 확인 + CLAUDE.md 갱신 + 최종 검증

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: en/ko 불일치가 실제로 빌드를 깨는지 확인 (일시적 실험)**

```bash
mv content/docs/ko/08-settings.md /tmp/08-settings.md.bak
npm run build; echo "exit: $?"
mv /tmp/08-settings.md.bak content/docs/ko/08-settings.md
```

Expected: 빌드 실패 (`docs content mismatch between en and ko` 에러 메시지), 파일 복원 후 정상

- [ ] **Step 2: CLAUDE.md 교체**

````markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

mqtt-insight 데스크톱 앱(`../mqtt-insight/`) 홍보용 정적 사이트. Next.js static export.

- **도메인:** https://mqtt-insight.advenoh.pe.kr
- **스펙:** `docs/superpowers/specs/2026-07-04-landing-site-design.md`
- **참고 구현:** `../markora.advenoh.pe.kr/` — 같은 구조의 랜딩 (이 사이트의 원본 패턴)

## 빌드 / 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # next build → out/
npm run check    # tsc --noEmit
npm test         # vitest (lib/docs.ts md 파이프라인)
```

`output: 'export'` + `trailingSlash: true` — 정적 파일 4개 라우트가 생성된다:
`out/index.html`(en 랜딩), `out/ko/index.html`, `out/docs/index.html`(매뉴얼), `out/ko/docs/index.html`.

## 라우트 / 다국어

- `/` → 영어 (기본). `<AutoLangRedirect />`가 한국어 OS면 `/ko/`로 자동 redirect
- 사용자가 EN/KO 토글로 명시 선택하면 `localStorage['mi-lang']`에 저장되어 자동 redirect 비활성
- 랜딩 UI 카피: `lib/i18n/en.ts`가 Dict 타입 원본, `ko.ts`는 같은 모양 강제 (한쪽만 키 변경 시 빌드 에러)

## 매뉴얼 (docs) 콘텐츠

`/docs/` 본문은 `content/docs/{en,ko}/NN-slug.md`에서 빌드 타임에 생성된다 (`lib/docs.ts`):

- frontmatter `title`(TOC 표기) + `slug`(앵커 id) 필수
- 파일명 숫자 prefix = TOC 순서
- **en/ko 파일명 세트가 다르면 빌드 에러** — 문서 추가/삭제는 반드시 양쪽 동시에
- 스크린샷은 `public/screenshots/`에 두고 md에서 `![...](/screenshots/xxx.png)`로 참조
- 아직 없는 스크린샷 자리는 `<!-- screenshot: xxx.png -->` 주석으로 표시되어 있음

## 디자인

- `styles/tokens.css`(CSS 변수) + `styles/site.css`(컴포넌트 스타일, `mi-` prefix)
- accent: 앱과 동일한 blue `#4f8cff` + violet `#9f6bff` 그라데이션
- Hero/CTA/Footer는 테마와 무관하게 다크, 본문 섹션만 라이트/다크 전환
- shadcn/ui 미사용, FAQ 아코디언은 자체 useState

## Git

- 커밋 메시지: 영어, conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- 브랜치 정책: 글로벌 정책 따름 (main 직접 commit 금지, feature 브랜치 + PR)
````

- [ ] **Step 3: 최종 검증**

```bash
npm run check && npm test && npm run build
ls out/index.html out/ko/index.html out/docs/index.html out/ko/docs/index.html out/sitemap.xml out/robots.txt
grep -c "mi-card" out/index.html
grep -o "getting-started" out/docs/index.html | head -1
file -I CLAUDE.md
```

Expected: 모두 성공. `grep -c "mi-card"` ≥ 6, `getting-started` 검색됨, CLAUDE.md는 `charset=utf-8`

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with build and content guide"
```

---

### Task 17: 추가 스크린샷 캡처 및 md 반영 (사용자 협업)

**Files:**
- Create: `public/screenshots/connection-edit.png`, `topic-tree.png`, `messages.png`, `publish.png`, `recording.png`, `settings.png`
- Modify: `content/docs/{en,ko}/02,03,04,06,07,08-*.md` (주석 → 이미지 교체)

이 태스크는 앱 UI 캡처가 필요해 **사용자 협업**으로 진행한다. 실행 시점에 사용자에게 아래 캡처를 요청한다.

- [ ] **Step 1: 사용자에게 캡처 요청**

본체 저장소에서 테스트 환경을 띄우고 (`cd ../mqtt-insight && make run` — mosquitto + 시드 데이터 + 라이브 피드), **다크 테마**로 아래 6장면을 캡처해 `public/screenshots/`에 저장하도록 안내:

| 파일명 | 장면 |
|---|---|
| `connection-edit.png` | 연결 프로필 편집 다이얼로그 (TLS/WS 옵션 보이게) |
| `topic-tree.png` | 와일드카드 구독으로 채워진 토픽 트리 (값 표시) |
| `messages.png` | 메시지 목록 — JSON 포맷 + diff 하이라이트 보이는 순간 |
| `publish.png` | Publish 패널 — MQTT 5.0 properties 펼친 상태 |
| `recording.png` | 녹화 활성 상태 UI |
| `settings.png` | 설정 화면 |

- [ ] **Step 2: md의 주석 마커를 이미지로 교체**

각 md 파일에서 `<!-- screenshot: xxx.png -->` 줄을 이미지 참조로 교체한다. 대상과 교체 내용:

- `content/docs/en/02-connection-profiles.md`: `<!-- screenshot: connection-edit.png -->` → `![Connection profile editor](/screenshots/connection-edit.png)`
- `content/docs/ko/02-connection-profiles.md`: 같은 줄 → `![연결 프로필 편집](/screenshots/connection-edit.png)`
- `content/docs/en/03-topic-tree.md`: → `![Topic tree built from a wildcard subscription](/screenshots/topic-tree.png)`
- `content/docs/ko/03-topic-tree.md`: → `![와일드카드 구독으로 만들어진 토픽 트리](/screenshots/topic-tree.png)`
- `content/docs/en/04-messages.md`: → `![Message list with JSON diff highlighting](/screenshots/messages.png)`
- `content/docs/ko/04-messages.md`: → `![JSON diff 하이라이트가 표시된 메시지 목록](/screenshots/messages.png)`
- `content/docs/en/06-publish.md`: → `![Publish panel with MQTT 5.0 properties](/screenshots/publish.png)`
- `content/docs/ko/06-publish.md`: → `![MQTT 5.0 properties를 펼친 Publish 패널](/screenshots/publish.png)`
- `content/docs/en/07-recording.md`: → `![Recording in progress](/screenshots/recording.png)`
- `content/docs/ko/07-recording.md`: → `![녹화 진행 중](/screenshots/recording.png)`
- `content/docs/en/08-settings.md`: → `![Settings](/screenshots/settings.png)`
- `content/docs/ko/08-settings.md`: → `![설정 화면](/screenshots/settings.png)`

- [ ] **Step 3: 빌드 확인 + Commit**

```bash
npm run build
git add public/screenshots/ content/docs/
git commit -m "docs: add remaining manual screenshots"
```

캡처를 당장 받을 수 없으면 이 태스크는 보류하고 넘어간다 — 주석 마커는 렌더에 나타나지 않으므로 사이트는 그대로 배포 가능하다.

---

## 완료 후

1. `superpowers:verification-before-completion` — 최종 `npm run check && npm test && npm run build` + `npm run start`로 4개 라우트 육안 확인
2. `superpowers:finishing-a-development-branch` — PR 생성 (`gh pr create` + HEREDOC, 리뷰어 지정 금지)
3. Netlify 사이트 연결/배포는 저장소 push 후 사용자가 Netlify 대시보드에서 진행 (markora와 동일 패턴)
