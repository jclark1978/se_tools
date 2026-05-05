# Release Checklist

Use this before publishing or installing a plugin.

## Static Checks

- The file is a single `.html` document.
- It contains `id="fabricbom-plugin-meta"`.
- Metadata JSON parses.
- There are no `<link>` tags.
- There are no `<script src="...">` tags.
- There are no `type="module"` scripts.
- There are no relative source references such as `../src/...`.
- Plugin-owned storage uses `fabricbom_*` keys.

## Browser Checks

- Plugin installs into FabricBOM.
- Plugin opens from the sidebar.
- Toolbar remains usable after long tables or summaries render.
- Import flows show success, warning, and error states.
- Primary export/download action works.
- Reset/clear actions work without clearing unrelated data.

## Data Checks

- Imported data validates before replacing existing stored data.
- Invalid imports do not overwrite existing usable data.
- Shared datasets follow `docs/TOOLBOX_SHARED_DATASETS.md`.
- Freshness checks are enforced for time-sensitive datasets.

## Packaging Checks

- Version number updated if behavior changed.
- README entry added or updated.
- Manual smoke test completed in a browser.

