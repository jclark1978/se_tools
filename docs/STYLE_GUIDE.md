# Plugin Style Guide

## Design Direction

SE Tools plugins should feel like first-class FabricBOM tools: compact, practical, and easy to use inside an iframe.

## Base Layout

Use a fixed-height toolbar and a scrollable content area:

```css
html, body { height: 100%; }
body {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.plugin-bar {
  height: 44px;
  flex-shrink: 0;
}
.plugin-scroll {
  flex: 1;
  overflow-y: auto;
}
```

Keep primary actions in the toolbar when a plugin can render long result tables.

## Recommended Tokens

```css
:root {
  --forti-red: #EE3124;
  --forti-content-bg: #F2F4F7;
  --c-white: #fff;
  --c-border: #DDE1E9;
  --c-text: #2A2F3A;
  --c-text2: #6B7589;
  --c-sh: #F7F9FC;
  --c-ib: #C8CDD9;
  --c-th: #EEF1F6;
}
```

## Components

- Use `.lc`, `.lch`, and `.lcb` for cards.
- Use `.btn`, `.bp`, `.bs`, and `.bd` for actions.
- Use `.bt` tables for structured data.
- Use `.sbadge` for compact status labels.
- Use modals for destructive confirmation and complex imports.

## Copy

- Use verbs that match the actual action: `Export` for downloading generated files, `Import` for loading files/data, and `Refresh` for RSS/feed updates.
- Status messages should explain what happened and what the user can do next.

