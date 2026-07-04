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
- md 안의 raw HTML은 변환 시 조용히 제거됨 (remark-rehype 기본, allowDangerousHtml 미사용) — 문서에 인라인 HTML 사용 금지

## 디자인

- `styles/tokens.css`(CSS 변수) + `styles/site.css`(컴포넌트 스타일, `mi-` prefix)
- accent: 앱과 동일한 blue `#4f8cff` + violet `#9f6bff` 그라데이션
- Hero/CTA/Footer는 테마와 무관하게 다크, 본문 섹션만 라이트/다크 전환
- shadcn/ui 미사용, FAQ 아코디언은 자체 useState

## Git

- 커밋 메시지: 영어, conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- 브랜치 정책: 글로벌 정책 따름 (main 직접 commit 금지, feature 브랜치 + PR)
