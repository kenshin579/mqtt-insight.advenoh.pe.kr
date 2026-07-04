# mqtt-insight Landing Site — Design Spec

- **Date:** 2026-07-04
- **Repo:** `mqtt-insight.advenoh.pe.kr`
- **Domain:** `https://mqtt-insight.advenoh.pe.kr`
- **목적:** mqtt-insight 데스크톱 앱 홍보용 랜딩 사이트 + 기능 매뉴얼 페이지 구축

---

## 1. 개요

### 1.1 배경

`../mqtt-insight/`는 Wails v2 + Go + React 기반 오픈소스 MQTT 데스크톱 클라이언트(IoT/임베디드 디버깅용)로, GitHub Releases에서 macOS/Windows 빌드를 배포 중이다. 다운로드 유입과 GitHub Star 확보를 위한 랜딩 사이트가 필요하다.

같은 워크스페이스의 `../markora.advenoh.pe.kr/`(Markora JetBrains 플러그인 랜딩)가 검증된 참고 구현이다. 본 사이트는 markora의 **구조·스택·컨벤션을 재사용**하되, 시각 레이어와 콘텐츠는 mqtt-insight에 맞게 새로 작성한다.

### 1.2 범위

**포함:**
- 메인 랜딩 페이지 (간결 구성: Nav, Hero, 핵심 기능 그리드, Install, FAQ, Final CTA, Footer)
- 기능 매뉴얼 페이지 (`/docs/`) — 사이드바 TOC + 단일 문서, 본문은 markdown 파일로 관리
- 영어/한국어 라우트 분리 (`/`, `/ko/`, `/docs/`, `/ko/docs/`) 및 자동 언어 감지
- 라이트/다크 테마 (다크 무드 중심 디자인)
- Hero용 CSS 앱 목업, 매뉴얼용 실제 스크린샷 캡처
- Netlify 정적 export 배포

**제외:**
- 블로그 / changelog 페이지 (GitHub Releases로 위임)
- AdSense
- 앱 다운로드 OS 자동 감지 (Releases 페이지 링크로 단순화)
- 단위/E2E 테스트 전반 (`tsc` + `next build`로 충분; `lib/docs.ts` 파싱 로직에 한해 vitest 1~2개 선택 가능)

### 1.3 비목표 / 의도적 결정

- 심화 기능 설명을 메인 페이지에 두지 않는다 — 메인은 핵심 기능 소개로 간결하게, 상세는 `/docs/` 매뉴얼로 분리 (사용자 결정)
- 기능별 개별 페이지(`/features/xxx/`)를 만들지 않는다 — 단일 문서 + 앵커로 유지보수 최소화
- rabbit-tokens.css를 재사용하지 않는다 — C안(다크 그라데이션) 무드는 신규 스킨 CSS가 필요

---

## 2. 결정 요약

| 항목 | 결정 |
|---|---|
| 페이지 구성 | 랜딩(`/`) + 매뉴얼(`/docs/`), 각각 ko 쌍 |
| 랜딩 성격 | 핵심 기능 위주 간결 소개, 상세 설명은 매뉴얼로 분리 |
| 매뉴얼 형태 | 사이드바 TOC + 단일 문서 페이지 (기능별 앵커) |
| 매뉴얼 본문 | markdown 파일 (`content/docs/{en,ko}/NN-slug.md`), 빌드 타임 변환 |
| 비주얼 | 진한 네이비 그라데이션 Hero + 블루-바이올렛 accent (앱 블루 `#4f8cff` 계열 유지) |
| Hero 비주얼 | CSS/HTML 앱 목업 (토픽 트리 \| 메시지 스트림 \| 미니 차트 3-pane) |
| 매뉴얼 비주얼 | 실제 앱 스크린샷 (다크 테마 통일 촬영) |
| 메인 CTA | "Download" → GitHub Releases 페이지 링크 |
| 기본 언어 | en (`/`), 한국어 OS면 `/ko/` 1회성 자동 redirect |
| 테마 | next-themes, `attribute="data-theme"`, 라이트/다크 토글 |
| 배포 | Netlify static export (markora 패턴) |
| 분석 | GA placeholder (`NEXT_PUBLIC_GA_ID`), AdSense 없음 |
| 스택 | Next.js (App Router) + TypeScript + `output: 'export'` + `trailingSlash: true` |
| 폰트 | Pretendard Variable, `next/font/local` self-host |
| UI 카피 i18n | `lib/i18n/en.ts` (Dict 원본) + `ko.ts` (같은 타입 강제) |

---

## 3. 사이트맵 / 콘텐츠

### 3.1 라우트

| 경로 | 내용 | 출력 |
|---|---|---|
| `/` | en 랜딩 | `out/index.html` |
| `/ko/` | ko 랜딩 | `out/ko/index.html` |
| `/docs/` | en 매뉴얼 | `out/docs/index.html` |
| `/ko/docs/` | ko 매뉴얼 | `out/ko/docs/index.html` |

### 3.2 메인 랜딩 섹션

1. **Nav** — 로고(텍스트 "mqtt-insight"), Features(앵커)·Docs·Install·FAQ 링크, GitHub 링크, EN/KO 토글, 테마 토글
2. **Hero** — 다크 그라데이션 배경, 헤드라인 + 서브카피, 기능 pill (토픽 트리 · 실시간 차트 · MQTT 5.0 · 녹화 · TLS/WS · 다크 테마), CTA 버튼 2개([Download ↓ → GitHub Releases] [GitHub]), 하단에 CSS 앱 목업
3. **핵심 기능 그리드** — 6카드, 각 카드에 "자세히 →" 링크(`/docs/#앵커`):
   - 토픽 트리 (wildcard `#`/`+` 자동 집계)
   - 실시간 차트 (per-key small multiples, now/min/max/avg)
   - 메시지 포맷 & diff (Plain/JSON/Hex/Base64, 값 변경 하이라이트)
   - Publish 패널 (QoS·retained·MQTT 5.0 properties)
   - 토픽별 녹화 (SQLite)
   - 연결 프로필 (TCP/TLS/WebSocket, MQTT 3.1.1/5.0)
4. **Install** — macOS(Universal zip → Applications, 미서명 안내 `xattr -cr`) / Windows(installer·portable zip, SmartScreen 안내) 2카드 + Download 버튼
5. **FAQ** — 아코디언 (자체 useState, shadcn 미사용): 무료/오픈소스? · 지원 MQTT 버전·전송 방식? · 데이터 저장 위치? · 서명 경고 이유? · 로드맵? · 버그 신고 방법?
6. **Final CTA** — 다운로드 유도 문구 + Download 버튼
7. **Footer** — GitHub · Issues · License(MIT) · © advenoh

### 3.3 매뉴얼 페이지 (`/docs/`)

사이드바 TOC(데스크톱 고정, 모바일 상단 접이식) + 본문. 섹션 8개, 파일명 순서 = TOC 순서:

| # | slug | 내용 |
|---|---|---|
| 01 | getting-started | 설치(macOS/Windows) + 첫 브로커 연결 |
| 02 | connection-profiles | 프로필 저장·관리, TCP/TLS/WebSocket, MQTT 3.1.1/5.0 |
| 03 | topic-tree | wildcard 구독 → 트리 자동 집계, 노드별 최신 값 |
| 04 | messages | 메시지 히스토리, Plain/JSON/Hex/Base64 포맷, 값 변경 diff 하이라이트 |
| 05 | charts | 숫자 payload 실시간 차트, small multiples, now/min/max/avg 통계 |
| 06 | publish | QoS, retained, MQTT 5.0 properties (user properties, content type 등) |
| 07 | recording | 토픽별 SQLite 녹화 |
| 08 | settings | 테마, 링 버퍼 크기, 기본 payload 포맷 |

### 3.4 스크린샷 계획

- 섹션마다 실제 캡처 1장 이상, `public/screenshots/`에 저장
- 보유: `connection-home.png`, `chart-view.png` (본체 저장소 `docs/screenshots/`)
- 추가 캡처 필요: 토픽 트리, 메시지 뷰(diff), Publish 패널, 녹화, 설정 — 본체의 `make run` 환경(mosquitto + 시드 + 라이브 피드) 활용
- **다크 테마로 통일 촬영** (사이트 무드와 일치)

### 3.5 카피 톤

- 영어 기본, 개발자 대상 간결체. 한국어는 직역이 아닌 자연스러운 현지화
- 헤드라인 방향: "Your MQTT traffic, beautifully visible" 계열 (구현 시 확정)

---

## 4. 비주얼 디자인

- **Hero**: 진한 네이비 그라데이션 (`#0e1524` → `#182338` 계열), 헤드라인 키워드에 블루→바이올렛 그라데이션 텍스트, CTA 버튼도 동일 그라데이션
- **Accent**: 앱과 동일한 블루 `#4f8cff` 기준 + 바이올렛 보조 (`#9f6bff` 계열)
- **본문 섹션**: 라이트 배경 교차(화이트/연회색), Final CTA·Footer는 다시 다크
- **다크 모드**: 전체 다크 팔레트 (Hero는 라이트/다크 무관하게 다크 유지)
- **CSS 앱 목업**: 반투명 유리 카드 안에 토픽 트리 / 메시지 스트림 / 미니 SVG 차트 3-pane. 텍스트는 컴포넌트 내부에서 `lang` 분기 (markora ide-mock 패턴)
- **토큰**: `styles/tokens.css` (색·간격·타이포 변수) + `styles/site.css` (컴포넌트 스타일), Tailwind는 유틸리티 최소 사용

---

## 5. 아키텍처

### 5.1 디렉토리 구조

```
mqtt-insight.advenoh.pe.kr/
├── app/
│   ├── layout.tsx              # <html lang="en">, ThemeProvider, Pretendard, GA placeholder, JSON-LD
│   ├── page.tsx                # en 랜딩
│   ├── docs/page.tsx           # en 매뉴얼
│   ├── ko/page.tsx             # ko 랜딩
│   ├── ko/docs/page.tsx        # ko 매뉴얼
│   ├── globals.css             # tokens.css + site.css import
│   ├── robots.ts
│   └── sitemap.ts              # 4개 라우트 전부
├── content/docs/
│   ├── en/01-getting-started.md … 08-settings.md
│   └── ko/01-getting-started.md … 08-settings.md   # en과 같은 파일명 세트 강제
├── components/
│   ├── landing.tsx             # 랜딩 섹션 컴포지션 (서버 컴포넌트)
│   ├── nav.tsx                 # 'use client' (토글 호스트)
│   ├── hero.tsx / app-mock.tsx # CSS 앱 목업
│   ├── features.tsx / install.tsx / faq.tsx / final-cta.tsx / footer.tsx
│   ├── docs/docs-layout.tsx    # 사이드바 TOC + 본문 렌더
│   ├── theme-toggle.tsx / lang-toggle.tsx / auto-lang-redirect.tsx
├── lib/
│   ├── i18n/en.ts, ko.ts, types.ts   # 랜딩 UI 카피 (Dict 타입 강제)
│   ├── docs.ts                 # md 로드·파싱·검증 (빌드 타임)
│   └── site-config.ts          # github/releases/issues URL, GA env, ogImage
├── public/
│   ├── screenshots/            # 매뉴얼용 다크 테마 캡처
│   ├── fonts/PretendardVariable.woff2
│   ├── og.png / favicon.svg
├── styles/tokens.css, site.css
├── next.config.js              # output: 'export', trailingSlash: true
├── netlify.toml                # markora 패턴
├── tailwind.config.ts / tsconfig.json / package.json
└── CLAUDE.md
```

### 5.2 매뉴얼 md 파이프라인

- `lib/docs.ts`가 빌드 타임(서버 컴포넌트)에 `content/docs/{lang}/*.md`를 파일명 순으로 읽음
- frontmatter: `title`(TOC 표기), `slug`(앵커 id). 본문은 remark/rehype로 HTML 변환 (이미지, 코드블록, 인라인 코드 지원)
- **en/ko 파일명 세트 불일치 시 빌드 에러** — 번역 누락을 CI에서 잡음 (i18n Dict 패턴의 md 버전)
- 스크린샷은 md에서 `![alt](/screenshots/xxx.png)`로 참조
- 클라이언트 JS 불필요 (정적 HTML로 렌더)

### 5.3 i18n / 테마

- markora 패턴 그대로:
  - `/` 진입 시 `navigator.language`가 `ko*`면 `/ko/` 1회성 redirect (`<AutoLangRedirect />`)
  - 수동 EN/KO 토글 시 localStorage 저장 → 자동 redirect 비활성
  - lang-toggle은 대응 경로 유지 (`/docs/` ↔ `/ko/docs/`)
  - ko 페이지는 `useEffect`로 `document.documentElement.lang = 'ko'`
- next-themes `attribute="data-theme"`, 기본 system

### 5.4 에러 처리 / 품질

- 404: Netlify `/* → /404.html` (markora netlify.toml 패턴)
- `npm run check`(tsc --noEmit) + `next build`가 타입·md 파싱·i18n 파일 세트 검증
- `lib/docs.ts` 파싱·검증 로직에 vitest 소규모 테스트 (선택)

---

## 6. 구현 순서 (개략)

1. 프로젝트 스캐폴딩 (Next.js, 설정 파일, netlify.toml, 폰트)
2. 디자인 토큰 + 스킨 CSS
3. 랜딩 섹션 컴포넌트 (Hero CSS 목업 포함) + i18n dict
4. md 파이프라인 (`lib/docs.ts`) + 매뉴얼 레이아웃
5. 매뉴얼 콘텐츠 작성 (en/ko 8섹션) — 스크린샷 캡처 병행
6. SEO (sitemap, robots, JSON-LD, og), GA placeholder
7. 빌드 검증 + Netlify 배포 설정

상세 구현 계획은 별도 plan 문서(`docs/superpowers/plans/`)로 작성한다.
