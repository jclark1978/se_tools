# SE Tools

A collection of portable SE tools packaged as self-contained single-file HTML plugins for offline-friendly use in FabricBOM and similar browser-based workflows.

## Repository Layout

```text
plugins/       Installable single-file HTML plugins
docs/          Plugin, data, and UI specifications
checklists/    Release and validation checklists
```

## Current Plugins

| Plugin | Description |
| --- | --- |
| `plugins/asset-report-plugin.html` | Cleans customer asset workbooks and exports an Excel asset report with Hardware LifeCycle milestones. |

## Plugin Rules

Every plugin in this repo should be a complete `.html` document with:

- A `fabricbom-plugin-meta` JSON metadata block.
- Inline CSS and JavaScript only.
- No relative paths, external scripts, external stylesheets, or module imports.
- Plugin-owned data stored under `fabricbom_*` keys.
- Clear import/export paths for any data that must move between tools.

See `docs/PLUGIN_SPEC.md` and `checklists/RELEASE_CHECKLIST.md` before publishing a plugin.

