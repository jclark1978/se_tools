import fs from "node:fs";
import path from "node:path";

export const MANIFEST_FILE = "PLUGIN_MANIFEST.md";

export function listPluginFiles(root) {
  const pluginDir = path.join(root, "plugins");
  return fs.readdirSync(pluginDir)
    .filter((file) => file.endsWith(".html"))
    .sort((left, right) => left.localeCompare(right))
    .map((file) => path.join(pluginDir, file));
}

export function readPluginMetadata(root, file) {
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  const html = fs.readFileSync(file, "utf8");
  const metaMatch = html.match(/<script\s+type=["']application\/json["']\s+id=["']fabricbom-plugin-meta["']\s*>([\s\S]*?)<\/script>/i);
  const errors = [];
  let meta = null;

  if (!metaMatch) {
    errors.push("missing fabricbom-plugin-meta JSON block");
  } else {
    try {
      meta = JSON.parse(metaMatch[1]);
      if (meta.fabricbomPlugin !== true) errors.push("fabricbomPlugin must be true");
      if (!meta.category) errors.push("metadata category is required");
      if (!meta.name) errors.push("metadata name is required");
      if (!meta.description) errors.push("metadata description is required");
      if (!meta.version) errors.push("metadata version is required");
    } catch (error) {
      errors.push(`metadata JSON does not parse: ${error.message}`);
    }
  }

  if (/<link\b/i.test(html)) errors.push("contains <link> tag");
  if (/<script[^>]+src=/i.test(html)) errors.push("contains external script src");
  if (/<script[^>]+type=["']module["']/i.test(html)) errors.push("contains module script");
  if (/(?:href|src)=["']\.\.?\//i.test(html)) errors.push("contains relative href/src path");

  return { file, rel, html, meta, errors };
}

export function buildManifest(records) {
  const rows = records
    .filter((record) => record.meta)
    .map((record) => [
      escapeMarkdownCell(record.meta.category),
      escapeMarkdownCell(record.meta.name),
      escapeMarkdownCell(record.meta.description),
      `\`${record.rel}\``
    ]);

  return [
    "# Plugin Manifest",
    "",
    "| Category | Plugin Name | Plugin Description | Plugin Filename |",
    "| --- | --- | --- | --- |",
    ...rows.map((row) => `| ${row.join(" | ")} |`),
    ""
  ].join("\n");
}

function escapeMarkdownCell(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("|", "\\|")
    .replace(/\r?\n/g, " ");
}

