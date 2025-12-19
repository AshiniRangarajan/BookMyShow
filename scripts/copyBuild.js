const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

(async function () {
  try {
    const repoRoot = path.join(__dirname, '..');
    const src = path.join(repoRoot, 'frontend', 'build');
    const dest = path.join(repoRoot, 'build');

    // Remove previous build folder if present
    await fs.promises.rm(dest, { recursive: true, force: true });

    // Ensure source exists
    await fs.promises.access(src, fs.constants.R_OK);

    // Copy
    await copyDir(src, dest);
    console.log('Frontend build copied to repository root: build/');
  } catch (err) {
    console.error('Failed to copy frontend build to root build/:', err);
    process.exit(1);
  }
})();
