import { promises as fs } from "node:fs";
import path from "node:path";

const DIST = path.resolve("_dist");

async function ensureDir(p) {
    await fs.mkdir(p, { recursive: true });
}

async function copyFile(src, dst) {
    await ensureDir(path.dirname(dst));
    await fs.copyFile(src, dst);
}

async function exists(p) {
    try {
        await fs.access(p);
        return true;
    } catch {
        return false;
    }
}

async function main() {
    const srcIndex = path.resolve("src/index.html");
    const srcCss = path.resolve("src/site.css");
    const srcJs = path.resolve("src/site.js");
    const siteConfig = path.resolve("site-config.js");
    const trackersDir = path.resolve("trackers");

    if (!(await exists(srcIndex))) throw new Error("Missing src/index.html");
    if (!(await exists(trackersDir))) throw new Error("Missing trackers/");

    // Clean dist
    await fs.rm(DIST, { recursive: true, force: true });
    await ensureDir(DIST);

    // Copy shared assets to site root (adjust if your HTML expects different paths)
    if (await exists(srcCss)) await copyFile(srcCss, path.join(DIST, "site.css"));
    if (await exists(srcJs)) await copyFile(srcJs, path.join(DIST, "site.js"));
    if (await exists(siteConfig)) await copyFile(siteConfig, path.join(DIST, "site-config.js"));

    // Optional: also publish a root index.html (handy for /interim-maps/)
    await copyFile(srcIndex, path.join(DIST, "index.html"));

    // For each trackers/<name>/config.js, create trackers/<name>/index.html and copy config.js
    const trackerNames = await fs.readdir(trackersDir, { withFileTypes: true });

    for (const entry of trackerNames) {
        if (!entry.isDirectory()) continue;

        const name = entry.name;
        const configPath = path.join(trackersDir, name, "config.js");
        if (!(await exists(configPath))) continue; // skip folders without config.js

        const outTrackerDir = path.join(DIST, "trackers", name);
        await ensureDir(outTrackerDir);

        await copyFile(srcIndex, path.join(outTrackerDir, "index.html"));
        await copyFile(configPath, path.join(outTrackerDir, "config.js"));
    }

    console.log("Built Pages output in", DIST);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
