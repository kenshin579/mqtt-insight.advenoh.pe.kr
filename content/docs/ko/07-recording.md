---
title: 기록
slug: recording
---

관심 있는 토픽에 기록을 켜면 mqtt-insight가 모든 메시지를 로컬 **SQLite** 파일에
기록합니다.

- 기록은 **토픽별 opt-in** — 필요한 트래픽만 기록하고 소음은 건너뜁니다.
- 데이터베이스는 평범한 SQLite 파일이라, 나중에 어떤 SQLite 도구로든 조회할 수 있습니다.
- 기록 중에는 UI에 기록 상태가 표시돼요.

<!-- screenshot: recording.png -->
