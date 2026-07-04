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
