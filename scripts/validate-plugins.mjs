import fs from "node:fs";
import path from "node:path";
import { buildManifest, listPluginFiles, MANIFEST_FILE, readPluginMetadata } from "./plugin-utils.mjs";

const root = process.cwd();
const files = listPluginFiles(root);

if (!files.length) {
  console.error("No plugin HTML files found in plugins/.");
  process.exit(1);
}

let failed = false;
const records = files.map((file) => readPluginMetadata(root, file));

for (const record of records) {
  if (record.errors.length) {
    failed = true;
    console.error(`FAIL ${record.rel}`);
    for (const error of record.errors) console.error(`  - ${error}`);
  } else {
    console.log(`OK   ${record.rel}`);
  }
}

if (!failed) {
  const manifestPath = path.join(root, MANIFEST_FILE);
  const expected = buildManifest(records);

  if (!fs.existsSync(manifestPath)) {
    failed = true;
    console.error(`FAIL ${MANIFEST_FILE}`);
    console.error("  - manifest is missing; run npm run manifest");
  } else {
    const actual = fs.readFileSync(manifestPath, "utf8");
    if (actual !== expected) {
      failed = true;
      console.error(`FAIL ${MANIFEST_FILE}`);
      console.error("  - manifest is stale or does not match plugin metadata; run npm run manifest");
    } else {
      console.log(`OK   ${MANIFEST_FILE}`);
    }
  }
}

if (failed) process.exit(1);
