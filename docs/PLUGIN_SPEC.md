# Single-File Plugin Spec

## Purpose

This spec defines the format for SE Tools plugins intended to be installed into FabricBOM or another browser-based host that accepts self-contained HTML tools.

## Required File Shape

Each plugin must be one complete HTML document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tool Name</title>

  <script type="application/json" id="fabricbom-plugin-meta">
  {
    "fabricbomPlugin": true,
    "name": "Tool Name",
    "category": "Reports",
    "icon": "report",
    "version": "1.0",
    "description": "One-line description"
  }
  </script>

  <style>
    /* All CSS inline */
  </style>
</head>
<body>
  <!-- Plugin UI -->
  <script>
    'use strict';
    /* All JavaScript inline */
  </script>
</body>
</html>
```

## Metadata

Required fields:

- `fabricbomPlugin`: must be `true`.
- `name`: display name.
- `category`: sidebar group such as `Reports`, `Tools`, or `Data`.
- `version`: plugin version.
- `description`: short user-facing summary.

Recommended fields:

- `icon`: FabricBOM-supported icon name such as `report`, `database`, `chart`, `tracker`, or `gear`. FabricBOM will use a default icon if omitted.

## Dependency Rules

- Do not use `<link rel="stylesheet">`.
- Do not use `<script src="...">`.
- Do not use `type="module"`.
- Do not reference relative paths such as `../src/...`.
- Do not depend on a backend service for core functionality.

If a dependency is required, inline the browser-compatible build into the plugin artifact.

## Storage Rules

- Plugin-owned data must use `localStorage` keys prefixed with `fabricbom_`.
- Large or shared datasets should use documented normalized shapes in `docs/TOOLBOX_SHARED_DATASETS.md`.
- Never write to unrelated keys or clear broad browser storage.

## Accessibility and UX

- Buttons must be real `<button>` elements.
- Import controls must show status messages for success, warning, and error states.
- Modals must close with Escape and backdrop click.
- Long content must scroll inside the plugin frame without hiding primary actions.

