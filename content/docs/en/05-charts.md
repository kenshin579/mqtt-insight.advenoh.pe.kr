---
title: Real-time charts
slug: charts
---

Numeric payloads turn into live charts. If the payload is JSON, each numeric key becomes
its own chart — small multiples, one per key — with **now / min / max / avg** stats.

![Main view: topic tree, live messages and real-time charts](/screenshots/chart-view.png)

- Charts stream in real time as messages arrive.
- Stats are computed over the visible window.
- Works for plain numeric payloads as well as JSON keys.

Planned next: nested JSON path charts, multi-topic comparison, and chart/data export.
