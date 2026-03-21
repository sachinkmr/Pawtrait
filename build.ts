import { access, copyFile } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import path from 'node:path';

export {};

const repoDir = import.meta.dir;
const mirrorDir = '/ssd/tools/docker/apps/chat.ai/sillytavern/extensions/Pawtrait';
const mirroredFiles = [
  'index.build.js',
  'index.build.js.map',
  'style.build.css',
  'style.build.css.map',
];

async function mirrorExtensionFiles() {
  try {
    await access(mirrorDir, fsConstants.F_OK | fsConstants.W_OK);
  } catch {
    console.warn(`Mirror skipped: ${mirrorDir} is not writable or does not exist`);
    return;
  }

  for (const fileName of mirroredFiles) {
    const sourcePath = path.join(repoDir, fileName);
    const targetPath = path.join(mirrorDir, fileName);

    try {
      await access(sourcePath, fsConstants.F_OK);
    } catch {
      continue;
    }

    try {
      await copyFile(sourcePath, targetPath);
    } catch (error) {
      console.warn(`Mirror failed for ${fileName}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log(`Mirrored build outputs to ${mirrorDir}`);
}

export async function runBuild() {
  const result = await Bun.build({
    entrypoints: ['./index.js', './style.css'],
    outdir: './',
    naming: '[dir]/[name].build.[ext]',
    minify: true,
    sourcemap: 'external',
    target: 'browser',
    format: 'esm',
    splitting: false,
    plugins: [
      {
        name: 'externalize-sillytavern-imports',
        setup(build) {
          build.onResolve({ filter: /^\.\.\/.*/ }, (args) => ({
            path: args.path,
            external: true,
          }));
        },
      },
    ],
  });

  if (!result.success) {
    console.error('Build failed:');
    for (const message of result.logs) {
      console.error(message);
    }
    throw new Error('Build failed');
  }

  await mirrorExtensionFiles();

  console.log('Built index.build.js and style.build.css');
  console.log('SillyTavern parent-directory imports remain external and resolve at runtime');
}

if (import.meta.main) {
  try {
    await runBuild();
  } catch {
    process.exit(1);
  }
}
