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
        a: '모든 데이터는 로컬에만 저장됩니다. 연결 프로필과 설정은 OS별 설정 폴더의 JSON 파일에, 기록 데이터는 로컬 SQLite 파일에 저장되며 외부로 전송되지 않습니다.',
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
              <button
                className="mi-faq-q"
                aria-expanded={open === i}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="mi-faq-chev">
                  <Icon name="chev" size={16} />
                </span>
              </button>
              <div className="mi-faq-a" id={`faq-a-${i}`}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
