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
