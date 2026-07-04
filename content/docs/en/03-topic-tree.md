---
title: Topic tree
slug: topic-tree
---

Subscribe with wildcards (`#`, `+`) and mqtt-insight builds a topic tree for you as
messages arrive. There is no need to know the topic layout up front — the tree **is** the
discovery tool.

- Every node shows its **latest value** inline, updated live.
- Parent nodes aggregate message counts from their children.
- Click a node to filter the message list to that subtopic.
- Collapsed branches keep aggregating in the background.

<!-- screenshot: topic-tree.png -->

The tree pairs well with [real-time charts](#charts): select a numeric leaf and open the
chart panel to plot it.
