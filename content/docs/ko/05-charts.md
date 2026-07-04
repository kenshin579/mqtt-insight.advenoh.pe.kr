---
title: 실시간 차트
slug: charts
---

숫자 payload는 라이브 차트가 돼요. payload가 JSON이면 숫자 키마다 차트가 하나씩 —
키별 소형 차트(small multiples)로 그려지고 **now / min / max / avg** 통계가 붙어요.

![메인 화면: 토픽 트리, 라이브 메시지, 실시간 차트](/screenshots/chart-view.png)

- 메시지가 도착하는 대로 차트가 실시간으로 흘러요.
- 통계는 유지 중인 메시지 히스토리를 기준으로 계산돼요.
- 순수 숫자 payload와 JSON 키 모두 지원해요.

![키별 소형 차트와 now / min / max / avg 통계](/screenshots/charts-detail.png)

다음 계획: 중첩 JSON path 차트, 멀티 토픽 비교, 차트/데이터 내보내기.
