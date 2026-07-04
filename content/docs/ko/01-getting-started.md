---
title: 시작하기
slug: getting-started
---

mqtt-insight는 IoT·임베디드 디버깅용 데스크톱 MQTT 클라이언트입니다. 최신 빌드는
[GitHub Releases](https://github.com/kenshin579/mqtt-insight/releases)에서 받을 수 있습니다.

### macOS 설치

macOS 빌드는 Apple Silicon & Intel 겸용(Universal)입니다.

1. 압축을 풀고 `mqtt-insight.app`을 Applications로 옮깁니다.
2. 아직 코드 서명이 되어 있지 않아요 — 첫 실행은 우클릭 → 열기, 또는 아래 명령을 실행하세요:

```bash
xattr -cr /Applications/mqtt-insight.app
```

### Windows 설치

installer(`…-installer.exe`)를 실행하거나 portable zip을 사용하세요.
SmartScreen 경고가 뜨면 "추가 정보" → "실행"을 선택하면 됩니다.

### 첫 연결

![저장된 프로필이 있는 연결 런처](/screenshots/connection-home.png)

1. **New connection**을 눌러 브로커 호스트와 포트를 입력합니다 (예: `localhost:1883`).
2. MQTT 버전(3.1.1 / 5.0)과 연결 방식(TCP / TLS / WebSocket)을 고릅니다.
3. **Connect**를 누르면 프로필이 자동 저장되어, 다음부터는 카드 클릭(또는 더블클릭)
   한 번으로 접속됩니다.
