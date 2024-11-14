import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual do arquivo em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Caminho para a pasta de templates
const srcDir = path.join(__dirname, 'src', 'mail', 'templates');
const destDir = path.join(__dirname, 'dist', 'mail', 'templates');

try {
  copyDirectory(srcDir, destDir);
  console.log('Templates copied successfully.');
  console.log('srcDir: ' + srcDir);
  console.log('destDir: ' + destDir);
} catch (error) {
  console.error('Error copying templates:', error);
}
