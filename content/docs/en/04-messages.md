---
title: Messages & formats
slug: messages
---

The message panel shows the live stream for the selected topic (or the whole
subscription), with history kept per topic in a configurable ring buffer.

### Payload formats

Switch any payload between **Plain / JSON / Hex / Base64** views. JSON is pretty-printed;
binary payloads are readable in Hex or Base64.

### Diff highlighting

When consecutive messages on a topic are JSON, changed values are **highlighted** as they
arrive — ideal for spotting which sensor field actually moved in a noisy stream.

<!-- screenshot: messages.png -->
