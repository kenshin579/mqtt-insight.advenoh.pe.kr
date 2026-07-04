---
title: 메시지 & 포맷
slug: messages
---

메시지 패널은 선택한 토픽(또는 구독 전체)의 라이브 스트림을 보여주며, 토픽별 히스토리는
설정 가능한 링 버퍼에 유지돼요.

### payload 포맷

payload를 **Plain / JSON / Hex / Base64** 뷰로 자유롭게 전환할 수 있어요. JSON은
보기 좋게 정렬되고, 바이너리 payload도 Hex나 Base64로 읽을 수 있어요.

### diff 하이라이트

같은 토픽의 연속된 메시지가 JSON이면, 바뀐 값이 도착 즉시 **하이라이트**돼요 —
시끄러운 스트림에서 실제로 움직인 센서 필드를 찾아낼 때 특히 유용해요.

<!-- screenshot: messages.png -->
