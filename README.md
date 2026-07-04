# mqtt-insight.advenoh.pe.kr

Landing site and documentation for [mqtt-insight](https://github.com/kenshin579/mqtt-insight) — an open-source MQTT desktop client for IoT and embedded debugging.

**Live site:** https://mqtt-insight.advenoh.pe.kr

## Stack

- [Next.js](https://nextjs.org/) (App Router) with `output: 'export'` — fully static site
- TypeScript, Tailwind CSS (utilities only) + custom design tokens (`styles/`)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode
- Markdown-driven docs pipeline (gray-matter + remark/rehype), tested with vitest
- Deployed on [Netlify](https://www.netlify.com/)

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # next build → out/
npm run check    # tsc --noEmit
npm test         # vitest (markdown docs pipeline)
```

## Routes & i18n

| Route | Content |
|---|---|
| `/` | Landing page (English, default) |
| `/ko/` | Landing page (Korean) |
| `/docs/` | User manual (English) |
| `/ko/docs/` | User manual (Korean) |

- Visitors with a Korean OS locale are redirected to `/ko/` once; an explicit EN/KO toggle choice is remembered in `localStorage`.
- Landing UI copy lives in typed dictionaries (`lib/i18n/en.ts` is the source of truth; `lib/i18n/ko.ts` must match its shape — a mismatch is a compile error).

## Docs content

Manual pages are generated at build time from `content/docs/{en,ko}/NN-slug.md`:

- Frontmatter requires `title` (TOC label) and `slug` (anchor id, `[a-z0-9-]+`).
- The numeric filename prefix defines TOC order.
- The build **fails** if the en/ko file sets differ, if slugs are duplicated, or if frontmatter is incomplete — add/remove docs in both languages at once.
- Screenshots live in `public/screenshots/` and are referenced as `![...](/screenshots/xxx.png)`.
- Raw HTML in markdown is silently stripped during conversion — don't use it.

## Deployment

Netlify builds `main` with `npm run build` and publishes `out/` (see `netlify.toml`). Google Analytics is enabled by setting the `NEXT_PUBLIC_GA_ID` environment variable in the Netlify UI.

## Related

- App repository: [kenshin579/mqtt-insight](https://github.com/kenshin579/mqtt-insight)
- Design spec & implementation plan: `docs/superpowers/`

## License

[MIT](https://github.com/kenshin579/mqtt-insight/blob/main/LICENSE) — same as the mqtt-insight app.
