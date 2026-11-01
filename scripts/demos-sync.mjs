// Copia las demos estáticas de las plantillas (compiladas en Pragmatis-Web-App) a public/demo/.
// Uso: npm run demos:sync   ·   Otra ruta de origen: DEMOS_DIR=/ruta/a/dist npm run demos:sync
import { cpSync, existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(process.env.DEMOS_DIR ?? "/home/sebasreino22/Pragmatis-Web-App/apps/demo-web/dist");
const dest = join(root, "public", "demo");

const fail = (msg) => {
  console.error(`demos:sync: ${msg}`);
  process.exit(1);
};

if (!existsSync(src) || !statSync(src).isDirectory()) {
  fail(`no existe la carpeta de origen ${src}. Compila las demos (npm run build:demo-web en Pragmatis-Web-App) o indica otra con DEMOS_DIR.`);
}

const folders = readdirSync(src, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
if (folders.length === 0) fail(`${src} no tiene ninguna carpeta de demo.`);

// Se valida todo antes de copiar, para no dejar public/demo a medias.
const broken = folders.filter((f) => !existsSync(join(src, f, "index.html")));
if (broken.length) fail(`estas carpetas no tienen index.html: ${broken.map((f) => join(src, f)).join(", ")}`);

const size = (dir) =>
  readdirSync(dir, { withFileTypes: true }).reduce((n, d) => n + (d.isDirectory() ? size(join(dir, d.name)) : statSync(join(dir, d.name)).size), 0);

for (const f of folders) {
  const to = join(dest, f);
  rmSync(to, { recursive: true, force: true });
  cpSync(join(src, f), to, { recursive: true });
  console.log(`✔ ${f} → public/demo/${f}/ (${(size(to) / 1024 / 1024).toFixed(1)} MB)`);
}
