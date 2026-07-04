---
title: Getting started
slug: getting-started
---

mqtt-insight is a desktop MQTT client for IoT and embedded debugging. Download the latest
build from [GitHub Releases](https://github.com/kenshin579/mqtt-insight/releases).

### Install on macOS

The macOS build is universal (Apple Silicon & Intel).

1. Unzip the download and move `mqtt-insight.app` to Applications.
2. The app is not code-signed yet — on first launch use right-click → Open, or run:

```bash
xattr -cr /Applications/mqtt-insight.app
```

### Install on Windows

Run the installer (`…-installer.exe`), or use the portable zip.
If SmartScreen warns, choose "More info" → "Run anyway".

### First connection

![Connection launcher with saved profiles](/screenshots/connection-home.png)

1. Click **New connection** and enter your broker host and port (e.g. `localhost:1883`).
2. Pick the MQTT version (3.1.1 or 5.0) and transport (TCP / TLS / WebSocket).
3. Click **Connect** — the profile is saved automatically, so next time it's one click
   (or a double-click on the profile card).
