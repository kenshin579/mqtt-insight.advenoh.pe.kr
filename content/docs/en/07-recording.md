---
title: Recording
slug: recording
---

Turn on recording for the topics you care about and mqtt-insight writes every message to
a local **SQLite** file.

- Recording is **opt-in per topic** — record the interesting traffic, skip the noise.
- The database is a plain SQLite file, so you can query it later with any SQLite tool.
- Recording state is visible in the UI while active.

![Recording in progress](/screenshots/recording.png)
