import fs from "node:fs";
import path from "node:path";
import { buildManifest, listPluginFiles, MANIFEST_FILE, readPluginMetadata } from "./plugin-utils.mjs";

const root = process.cwd();
const files = listPluginFiles(root);

if (!files.length) {
  console.error("No plugin HTML files found in plugins/.");
  process.exit(1);
}

const records = files.map((file) => readPluginMetadata(root, file));
const invalid = records.filter((record) => record.errors.length);

if (invalid.length) {
  for (const record of invalid) {
    console.error(`FAIL ${record.rel}`);
    for (const error of record.errors) console.error(`  - ${error}`);
  }
  process.exit(1);
}

fs.writeFileSync(path.join(root, MANIFEST_FILE), buildManifest(records));
console.log(`Wrote ${MANIFEST_FILE}`);

