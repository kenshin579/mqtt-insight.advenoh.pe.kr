---
title: 발행
slug: publish
---

Publish 패널에서 앱을 벗어나지 않고 메시지를 보낼 수 있습니다.

- **QoS** 0 / 1 / 2와 **retained** 플래그
- Plain / JSON / Hex / Base64 포맷을 지원하는 payload 에디터
- **MQTT 5.0 properties**: user properties, content type, message expiry,
  response topic, correlation data

발행한 메시지는 내 구독에 즉시 나타나므로, 발행 → 트리 갱신 확인 → 차트 확인까지
왕복 테스트가 창 하나에서 끝납니다.

<!-- screenshot: publish.png -->
