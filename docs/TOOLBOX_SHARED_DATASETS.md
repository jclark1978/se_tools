# Shared Dataset Specs

## Purpose

Some plugins need to exchange data using a stable normalized record shape. This document captures the shared dataset contracts used by SE Tools.

## Hardware LifeCycle

Dataset key:

```text
hardware_lifecycle
```

Record shape:

```js
{
  key: "hardware_lifecycle",
  version: 1,
  source: {
    app: "FortiSKU",
    format: "rss",
    label: "Fortinet Product Lifecycle RSS",
    importedAt: "2026-05-05T00:00:00.000Z",
    effectiveDate: "Tue, 05 May 2026 00:00:00 GMT"
  },
  data: {
    rows: [
      {
        product: "FortiGate 100F",
        release: "",
        milestone: "End of Order",
        date: "2026-06-30",
        details: "FortiGate",
        sourceUrl: ""
      }
    ]
  },
  meta: {
    rowCount: 1,
    schema: "toolbox_shared.hardware_lifecycle.v1"
  }
}
```

Rules:

- `source.format` must be `rss`.
- `version` must be `1`.
- `data.rows` stores milestone rows, not product summary rows.
- Hardware `release` is always an empty string.
- Valid milestones are `End of Order`, `Last Service Extension`, `End of Support`, or an empty string for placeholder rows.
- Freshness-sensitive tools should reject or warn on lifecycle data older than 30 days.

## Plugin Storage

When a plugin runs standalone and cannot access shared IndexedDB, it may store the same normalized record in `localStorage` under a plugin-specific key, for example:

```text
fabricbom_asset_report_lifecycle
```

The stored value should still preserve the normalized record shape so other tools can import/export it safely.

