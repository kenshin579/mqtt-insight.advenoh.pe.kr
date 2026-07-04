import type { Dict } from './en';

export const ko: Dict = {
  nav: { features: '기능', docs: '가이드', install: '설치', faq: 'FAQ' },
  hero: {
    badge: '오픈소스 · macOS & Windows',
    title1: '당신의 MQTT 트래픽을,',
    title2: '한눈에 보이게',
    lead: 'mqtt-insight는 IoT·임베디드 디버깅을 위한 오픈소스 MQTT 데스크톱 클라이언트입니다 — 실시간 토픽 트리, 라이브 차트, MQTT 5.0, 기록까지 macOS와 Windows에서.',
    download: '다운로드',
    github: 'GitHub',
    pills: ['토픽 트리', '실시간 차트', 'MQTT 5.0', '기록', 'TLS / WebSocket', '다크 테마'],
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
        desc: '# 또는 + 와일드카드로 구독하면 트리가 자동으로 만들어지고, 모든 노드에 최신 값이 표시돼요.',
        slug: 'topic-tree',
      },
      {
        icon: 'chart',
        title: '실시간 차트',
        desc: '숫자 payload를 키별 소형 차트로 — now / min / max / avg 통계와 함께 실시간으로 그려져요.',
        slug: 'charts',
      },
      {
        icon: 'diff',
        title: '포맷 & diff 하이라이트',
        desc: 'payload를 Plain, JSON, Hex, Base64로 자유롭게 보고, 바뀐 값은 도착 즉시 하이라이트돼요.',
        slug: 'messages',
      },
      {
        icon: 'send',
        title: '발행 패널',
        desc: 'QoS, retained 플래그, user properties와 content type 등 MQTT 5.0 properties까지 지원해요.',
        slug: 'publish',
      },
      {
        icon: 'record',
        title: '토픽별 기록',
        desc: '원하는 토픽만 골라 로컬 SQLite 파일로 기록하고, 나중에 히스토리를 살펴볼 수 있어요.',
        slug: 'recording',
      },
      {
        icon: 'shield',
        title: '연결 프로필',
        desc: 'MQTT 3.1.1/5.0, TCP·TLS·WebSocket 연결을 프로필로 저장해 원클릭으로 접속해요.',
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
  footer: { docs: '가이드', github: 'GitHub', issues: '이슈', license: 'MIT 라이선스' },
  docs: { title: '사용 가이드', toc: '목차' },
};
