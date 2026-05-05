import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pluginDir = path.join(root, "plugins");
const files = fs.readdirSync(pluginDir)
  .filter((file) => file.endsWith(".html"))
  .map((file) => path.join(pluginDir, file));

if (!files.length) {
  console.error("No plugin HTML files found in plugins/.");
  process.exit(1);
}

let failed = false;

for (const file of files) {
  const rel = path.relative(root, file);
  const html = fs.readFileSync(file, "utf8");
  const errors = [];
  const metaMatch = html.match(/<script\s+type=["']application\/json["']\s+id=["']fabricbom-plugin-meta["']\s*>([\s\S]*?)<\/script>/i);

  if (!metaMatch) {
    errors.push("missing fabricbom-plugin-meta JSON block");
  } else {
    try {
      const meta = JSON.parse(metaMatch[1]);
      if (meta.fabricbomPlugin !== true) errors.push("fabricbomPlugin must be true");
      if (!meta.name) errors.push("metadata name is required");
      if (!meta.version) errors.push("metadata version is required");
    } catch (error) {
      errors.push(`metadata JSON does not parse: ${error.message}`);
    }
  }

  if (/<link\b/i.test(html)) errors.push("contains <link> tag");
  if (/<script[^>]+src=/i.test(html)) errors.push("contains external script src");
  if (/<script[^>]+type=["']module["']/i.test(html)) errors.push("contains module script");
  if (/(?:href|src)=["']\.\.?\//i.test(html)) errors.push("contains relative href/src path");

  if (errors.length) {
    failed = true;
    console.error(`FAIL ${rel}`);
    for (const error of errors) console.error(`  - ${error}`);
  } else {
    console.log(`OK   ${rel}`);
  }
}

if (failed) process.exit(1);

