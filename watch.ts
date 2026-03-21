// @ts-nocheck
import { watch } from 'node:fs/promises';
import path from 'node:path';
import { runBuild } from './build.ts';

export {};

const repoDir = process.cwd();
const watchedFiles = new Set([
  'index.js',
  'prompts.js',
  'style.css',
]);

let buildInFlight = false;
let buildQueued = false;
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

async function triggerBuild(reason: string) {
  if (buildInFlight) {
    buildQueued = true;
    return;
  }

  buildInFlight = true;
  try {
    console.log(`[watch] Rebuilding after ${reason}`);
    await runBuild();
  } catch (error) {
    console.error(`[watch] Build failed after ${reason}`);
    console.error(error instanceof Error ? error.stack || error.message : String(error));
  } finally {
    buildInFlight = false;
    if (buildQueued) {
      buildQueued = false;
      queueMicrotask(() => triggerBuild('queued changes'));
    }
  }
}

function scheduleBuild(reason: string) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = undefined;
    void triggerBuild(reason);
  }, 120);
}

console.log('[watch] Watching Pawtrait sources for changes...');
await triggerBuild('startup');

for await (const event of watch(repoDir)) {
  const fileName = typeof event.filename === 'string' ? path.basename(event.filename) : '';
  if (!watchedFiles.has(fileName)) continue;
  scheduleBuild(fileName);
}
