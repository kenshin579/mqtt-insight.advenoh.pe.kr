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
